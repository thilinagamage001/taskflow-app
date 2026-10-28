# Automatically generate the Ansible inventory file when Terraform finishes provisioning
resource "local_file" "ansible_inventory" {
  content = templatefile("${path.module}/templates/inventory.ini.tpl", {
    vm_ip        = azurerm_public_ip.taskflow_pip.ip_address
    ssh_user     = var.admin_username
    ssh_key_path = var.ssh_private_key_path
  })
  filename = "${path.module}/../ansible/inventory.ini"
}
