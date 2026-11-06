#!/bin/bash

set -euo pipefail

EC2_IP=$(cd terraform && terraform output -raw ec2_public_ip)

cat > ansible/inventory/production.ini <<EOF
[taskflow]
taskflow-prod ansible_host=${EC2_IP}

[taskflow:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/my-aws-key.pem
ansible_python_interpreter=/usr/bin/python3
EOF

echo "Ansible inventory generated for ${EC2_IP}"