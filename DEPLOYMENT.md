# TaskFlow — AWS Free Tier DevOps & Deployment Guide

This project includes a complete, enterprise-grade Infrastructure-as-Code (IaC), Configuration Management, Kubernetes orchestration, and automated CI/CD pipeline engineered specifically to operate **100% within the AWS Free Tier**.

---

## Architecture Overview

```
                      +------------------------------------------+
                      |         GitHub Actions (CI/CD)           |
                      |   1. Lint & Build Frontend / Backend     |
                      |   2. Push Docker images to GHCR          |
                      |   3. Deploy rolling update via SSH       |
                      +--------------------+---------------------+
                                           |
+--------------------------+               |
|      Terraform (IaC)     |               |
|  1. VPC & Public Subnet  |               |
|  2. Security Groups      |               |
|  3. EC2 t2.micro / gp3   |               |
|  4. Elastic IP (Static)  +---------------+
+------------+-------------+               |
             |                             |
             v                             v
+--------------------------+     +-------------------------------+
|     Ansible (Config)     |     |       Kubernetes (K3s)        |
|  1. 2GB Swap Memory      |     |  - Ingress: Traefik (HTTP :80)|
|  2. Kernel IP Forwarding +---->|  - Frontend Pod (Node Static) |
|  3. Install K3s & Traefik|     |  - Backend Pod (Express API)  |
|  4. Kubeconfig setup     |     |  - PVC: local-path (/uploads) |
+--------------------------+     +---------------+---------------+
                                                 |
                                                 v
                                 +-------------------------------+
                                 |  MongoDB Atlas (M0 - Free)    |
                                 +-------------------------------+
```

---

## Directory Structure

```
taskflow/
├── terraform/                   # Infrastructure as Code
│   ├── main.tf                 # VPC, Subnet, Security Group, EC2, Elastic IP
│   ├── variables.tf            # Input variables (region, instance type, keys)
│   ├── outputs.tf              # Public IP, SSH command, application URL
│   ├── terraform.tfvars.example# Example variable values
│   └── templates/
│       └── inventory.ini.tftpl # Auto-generates Ansible inventory from Terraform
├── ansible/                     # Configuration Management
│   ├── ansible.cfg             # Ansible defaults (no host key checking)
│   ├── inventory.ini.example   # Inventory template
│   └── playbook.yml            # Configures 2GB swap, installs K3s & Traefik
├── k8s/                         # Kubernetes Manifests
│   ├── 00-namespace.yaml       # Creates 'taskflow' namespace
│   ├── 01-configmap.yaml       # Environment configuration
│   ├── 02-secret.example.yaml  # MongoDB URI & JWT secret template
│   ├── 03-pvc.yaml             # Persistent volume claim for avatar uploads
│   ├── 04-backend.yaml         # API Deployment + ClusterIP Service
│   ├── 05-frontend.yaml        # Frontend Deployment + ClusterIP Service
│   ├── 06-ingress.yaml         # Traefik Ingress routing (/api, /uploads, /)
│   └── kustomization.yaml      # Kustomize manifest for easy apply
└── .github/workflows/
    └── ci-cd.yml               # Automated CI, Docker build & push, and CD
```

---

## Prerequisites

1. **AWS Account**: An active AWS Free Tier account.
2. **Tools Installed Locally**:
   - [AWS CLI](https://aws.amazon.com/cli/) (`aws configure`)
   - [Terraform](https://developer.hashicorp.com/terraform/install) (>= 1.5)
   - [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
   - [kubectl](https://kubernetes.io/docs/tasks/tools/)
3. **MongoDB Atlas Account**: Free [M0 Cluster](https://www.mongodb.com/atlas) connection URI.
4. **AWS Key Pair**: An existing `.pem` key pair created in the AWS Console (e.g., `~/.ssh/my-aws-key.pem`).

---

## Step 1: Provision Infrastructure with Terraform

1. Move to the `terraform/` directory:
   ```bash
   cd terraform
   ```

2. Create your variable configuration:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```
   Edit `terraform.tfvars`:
   ```hcl
   aws_region       = "us-east-1"
   key_pair_name    = "my-aws-key"
   private_key_file = "~/.ssh/my-aws-key.pem"
   instance_type    = "t2.micro"  # Free Tier eligible
   ```

3. Initialize and apply:
   ```bash
   terraform init
   terraform plan
   terraform apply -auto-approve
   ```

4. Terraform will output:
   - `ec2_public_ip`: Your assigned Elastic IP
   - `ssh_connection_string`: SSH command
   - **It also automatically generates `ansible/inventory.ini`** with your EC2 IP and key path!

---

## Step 2: Configure EC2 & Install K3s with Ansible

1. Move to the `ansible/` directory:
   ```bash
   cd ../ansible
   ```

2. Test connectivity to the new EC2 instance:
   ```bash
   ansible -i inventory.ini k8s_nodes -m ping
   ```
   *(Wait ~60 seconds after Terraform finishes for SSH to accept connections)*

3. Run the playbook:
   ```bash
   ansible-playbook -i inventory.ini playbook.yml
   ```

### What this playbook does:
- Allocates and enables a **2 GB Swap file** (critical to prevent out-of-memory errors on 1 GB RAM `t2.micro`).
- Enables `net.ipv4.ip_forward=1` for Kubernetes pod networking.
- Installs **K3s** (lightweight certified Kubernetes with built-in Traefik ingress controller).
- Configures `kubectl` permissions for the `ubuntu` user.
- Downloads `k3s.yaml` to your local project root so you can run `kubectl --kubeconfig k3s.yaml get nodes` from your local machine.

---

## Step 3: Configure Kubernetes Secrets

1. Move to the `k8s/` directory:
   ```bash
   cd ../k8s
   ```

2. Create `02-secret.yaml` from the example:
   ```bash
   cp 02-secret.example.yaml 02-secret.yaml
   ```

3. Edit `02-secret.yaml` with your actual MongoDB Atlas connection string and secret key:
   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: taskflow-secrets
     namespace: taskflow
   type: Opaque
   stringData:
     MONGODB_URI: "mongodb+srv://<user>:<password>@cluster0.mongodb.net/taskflow?retryWrites=true&w=majority"
     JWT_SECRET: "your_random_production_secret_at_least_32_characters"
   ```

---

## Step 4: Deploy Kubernetes Workloads

1. SSH into the instance or use your local `kubectl`:
   ```bash
   # From your local machine (using the fetched kubeconfig):
   export KUBECONFIG=$(pwd)/../k3s.yaml
   ```

2. Apply all Kubernetes manifests:
   ```bash
   kubectl apply -f 00-namespace.yaml
   kubectl apply -f 01-configmap.yaml
   kubectl apply -f 02-secret.yaml
   kubectl apply -f 03-pvc.yaml
   kubectl apply -f 04-backend.yaml
   kubectl apply -f 05-frontend.yaml
   kubectl apply -f 06-ingress.yaml
   ```

3. Verify rollout:
   ```bash
   kubectl get pods -n taskflow
   kubectl get svc -n taskflow
   kubectl get ingress -n taskflow
   ```

4. Open `http://<EC2_PUBLIC_IP>` in your web browser. The app is live!

---

## Step 5: Automate CI/CD with GitHub Actions

The workflow in [`.github/workflows/ci-cd.yml`](file:///home/thilina/OpenCode/taskflow-app/.github/workflows/ci-cd.yml) automatically:
1. Verifies code dependencies and builds the React bundle.
2. Builds multi-stage production Docker images and publishes them to **GitHub Container Registry (`ghcr.io`)**.
3. Connects via SSH to your AWS EC2 instance and triggers a zero-downtime rolling update.

### Setting up GitHub Repository Secrets:
Go to your GitHub Repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret Name | Value |
| :--- | :--- |
| `EC2_HOST` | The Elastic IP of your EC2 instance (from `terraform output ec2_public_ip`) |
| `EC2_USER` | `ubuntu` |
| `SSH_PRIVATE_KEY` | Entire content of your `.pem` private key file (`cat ~/.ssh/my-aws-key.pem`) |

Whenever you push to the `main` branch, GitHub Actions will automatically test, build, push, and deploy your changes.

---

## Tear Down (Clean up AWS Resources)

To avoid any unexpected charges when you are done:
```bash
cd terraform
terraform destroy -auto-approve
```
