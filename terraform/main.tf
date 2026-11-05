terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# --- VPC & Networking (Free Tier) ---
resource "aws_vpc" "taskflow_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name        = "${var.project_name}-vpc"
    Environment = var.environment
  }
}

resource "aws_internet_gateway" "taskflow_igw" {
  vpc_id = aws_vpc.taskflow_vpc.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

resource "aws_subnet" "taskflow_public_subnet" {
  vpc_id                  = aws_vpc.taskflow_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "${var.aws_region}a"

  tags = {
    Name = "${var.project_name}-public-subnet"
  }
}

resource "aws_route_table" "taskflow_public_rt" {
  vpc_id = aws_vpc.taskflow_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.taskflow_igw.id
  }

  tags = {
    Name = "${var.project_name}-public-rt"
  }
}

resource "aws_route_table_association" "taskflow_public_rta" {
  subnet_id      = aws_subnet.taskflow_public_subnet.id
  route_table_id = aws_route_table.taskflow_public_rt.id
}

# --- Security Group (Ports 22, 80, 443) ---
resource "aws_security_group" "taskflow_sg" {
  name        = "${var.project_name}-sg"
  description = "Security group for TaskFlow Docker EC2 instance"
  vpc_id      = aws_vpc.taskflow_vpc.id

  # SSH
  ingress {
    description = "SSH access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_allowed_cidr]
  }

  # HTTP
  ingress {
    description = "HTTP web traffic"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    description = "HTTPS web traffic"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # All outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-sg"
  }
}

# --- Ubuntu 24.04 AMI Lookup ---
data "aws_ami" "ubuntu_latest" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# --- EC2 Instance (AWS Free Tier: t3.micro) ---
resource "aws_instance" "taskflow_node" {
  ami                    = data.aws_ami.ubuntu_latest.id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.taskflow_public_subnet.id
  vpc_security_group_ids = [aws_security_group.taskflow_sg.id]
  key_name               = var.key_pair_name

  # Free Tier includes up to 30 GB EBS
  root_block_device {
    volume_size           = 25
    volume_type           = "gp3"
    delete_on_termination = true
    encrypted             = true
    tags = {
      Name = "${var.project_name}-root-disk"
    }
  }

  # Cloud-Init User Data: Installs Docker & Docker Compose, configures 2GB Swap
  user_data = <<-EOF
              #!/bin/bash
              set -ex

              # 1. Configure 2GB Swap file (critical for 1GB RAM t3.micro)
              fallocate -l 2G /swapfile
              chmod 600 /swapfile
              mkswap /swapfile
              swapon /swapfile
              echo '/swapfile none swap sw 0 0' >> /etc/fstab
              sysctl vm.swappiness=10
              echo 'vm.swappiness=10' >> /etc/sysctl.conf

              # 2. Install Docker and Docker Compose
              apt-get update -y
              apt-get install -y ca-certificates curl gnupg git docker.io docker-compose-v2

              # 3. Enable and start Docker service
              systemctl enable docker
              systemctl start docker

              # 4. Add ubuntu user to docker group
              usermod -aG docker ubuntu

              # 5. Create deployment directory
              mkdir -p /home/ubuntu/taskflow-app
              chown -R ubuntu:ubuntu /home/ubuntu/taskflow-app

              echo "Initialization complete!" > /var/log/user-data-complete.log
              EOF

  tags = {
    Name        = "${var.project_name}-docker-node"
    Environment = var.environment
  }
}

# --- Elastic IP (Free Tier when attached to running instance) ---
resource "aws_eip" "taskflow_eip" {
  instance = aws_instance.taskflow_node.id
  domain   = "vpc"

  depends_on = [aws_internet_gateway.taskflow_igw]

  tags = {
    Name = "${var.project_name}-eip"
  }
}
