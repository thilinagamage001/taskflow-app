variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project identifier used in resource tags"
  type        = string
  default     = "taskflow"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "instance_type" {
  description = "EC2 Instance type (Free Tier: t2.micro or t3.micro depending on region)"
  type        = string
  default     = "t2.micro"
}

variable "key_pair_name" {
  description = "Name of existing AWS EC2 Key Pair to attach"
  type        = string
}

variable "private_key_file" {
  description = "Local path to the SSH private key (.pem) used by Ansible"
  type        = string
  default     = "~/.ssh/id_rsa"
}

variable "ssh_allowed_cidr" {
  description = "IP CIDR allowed to connect via SSH and K8s API (set to your IP, e.g. 203.0.113.50/32)"
  type        = string
  default     = "0.0.0.0/0"
}
