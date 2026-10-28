terraform {
  required_version = ">= 1.3.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.0.0, < 5.0.0"
    }
    local = {
      source  = "hashicorp/local"
      version = ">= 2.0.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# 1. Resource Group
resource "azurerm_resource_group" "taskflow_rg" {
  name     = var.resource_group_name
  location = var.location

  tags = {
    Environment = var.environment
    Project     = "TaskFlow"
  }
}

# 2. Virtual Network & Subnet
resource "azurerm_virtual_network" "taskflow_vnet" {
  name                = "vnet-taskflow"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.taskflow_rg.location
  resource_group_name = azurerm_resource_group.taskflow_rg.name

  tags = azurerm_resource_group.taskflow_rg.tags
}

resource "azurerm_subnet" "taskflow_subnet" {
  name                 = "snet-taskflow"
  resource_group_name  = azurerm_resource_group.taskflow_rg.name
  virtual_network_name = azurerm_virtual_network.taskflow_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# 3. Public IP (Standard SKU, Static)
resource "azurerm_public_ip" "taskflow_pip" {
  name                = "pip-taskflow"
  location            = azurerm_resource_group.taskflow_rg.location
  resource_group_name = azurerm_resource_group.taskflow_rg.name
  allocation_method   = "Static"
  sku                 = "Standard"

  tags = azurerm_resource_group.taskflow_rg.tags
}

# 4. Network Security Group (SSH, HTTP, HTTPS)
resource "azurerm_network_security_group" "taskflow_nsg" {
  name                = "nsg-taskflow"
  location            = azurerm_resource_group.taskflow_rg.location
  resource_group_name = azurerm_resource_group.taskflow_rg.name

  security_rule {
    name                       = "Allow-SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "Allow-HTTP"
    priority                   = 1002
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "Allow-HTTPS"
    priority                   = 1003
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  tags = azurerm_resource_group.taskflow_rg.tags
}

# 5. Network Interface
resource "azurerm_network_interface" "taskflow_nic" {
  name                = "nic-taskflow"
  location            = azurerm_resource_group.taskflow_rg.location
  resource_group_name = azurerm_resource_group.taskflow_rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.taskflow_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.taskflow_pip.id
  }

  tags = azurerm_resource_group.taskflow_rg.tags
}

# Attach NSG to Network Interface
resource "azurerm_network_interface_security_group_association" "taskflow_nic_nsg" {
  network_interface_id      = azurerm_network_interface.taskflow_nic.id
  network_security_group_id = azurerm_network_security_group.taskflow_nsg.id
}

# 6. Linux Virtual Machine (B1s Free Tier eligible)
resource "azurerm_linux_virtual_machine" "taskflow_vm" {
  name                  = var.vm_name
  location              = azurerm_resource_group.taskflow_rg.location
  resource_group_name   = azurerm_resource_group.taskflow_rg.name
  network_interface_ids = [azurerm_network_interface.taskflow_nic.id]
  size                  = var.vm_size
  admin_username        = var.admin_username

  admin_ssh_key {
    username   = var.admin_username
    public_key = file(pathexpand(var.ssh_public_key_path))
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
    disk_size_gb         = 30
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }

  tags = azurerm_resource_group.taskflow_rg.tags
}
