output "ec2_public_ip" {
  description = "Public IP of the deployed EC2 instance (Elastic IP)"
  value       = aws_eip.taskflow_eip.public_ip
}

output "ec2_instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.taskflow_node.id
}

output "ssh_connection_string" {
  description = "Command to SSH into the provisioned node"
  value       = "ssh -i ${var.private_key_file} ubuntu@${aws_eip.taskflow_eip.public_ip}"
}

output "application_url" {
  description = "URL to access the TaskFlow application once deployed"
  value       = "http://${aws_eip.taskflow_eip.public_ip}"
}
