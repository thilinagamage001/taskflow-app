variable "resource_group_name" {
  type        = string
  description = "Name of the Azure Resource Group"
  default     = "rg-taskflow-prod"
}

variable "location" {
  type        = string
  description = "Azure region where resources will be created"
  default     = "eastus"
}

variable "vm_name" {
  type        = string
  description = "Name of the virtual machine"
  default     = "vm-taskflow"
}

variable "vm_size" {
  type        = string
  description = "Azure VM Size (Standard_B1s is free tier eligible for 12 months)"
  default     = "Standard_B1s"
}

variable "admin_username" {
  type        = string
  description = "Administrator username for the VM"
  default     = "azureuser"
}

variable "ssh_public_key_path" {
  type        = string
  description = "Path to your local SSH public key used to access the VM"
  default     = "~/.ssh/id_rsa.pub"
}

variable "ssh_private_key_path" {
  type        = string
  description = "Path to your local SSH private key for Ansible to connect"
  default     = "~/.ssh/id_rsa"
}

variable "environment" {
  type        = string
  description = "Environment tag"
  default     = "production"
}
