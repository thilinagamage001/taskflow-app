output "vm_public_ip" {
  description = "The public IP address of the TaskFlow virtual machine"
  value       = azurerm_public_ip.taskflow_pip.ip_address
}

output "ssh_command" {
  description = "SSH command to connect to the virtual machine"
  value       = "ssh -i ${var.ssh_private_key_path} ${var.admin_username}@${azurerm_public_ip.taskflow_pip.ip_address}"
}

output "application_url" {
  description = "Web address of the TaskFlow application"
  value       = "http://${azurerm_public_ip.taskflow_pip.ip_address}"
}
