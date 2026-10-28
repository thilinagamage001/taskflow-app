# Deploying TaskFlow on Azure Free Tier with Terraform & Ansible

This directory contains the automated infrastructure provisioning (Terraform) and configuration management (Ansible) scripts to deploy TaskFlow to an **Azure Free Tier (B1s)** virtual machine.

---

## Architecture Overview

```
                                      Azure Free Tier (Standard_B1s)
                                  +------------------------------------+
                                  | Linux Ubuntu 22.04 LTS (1GB RAM)   |
                                  | + 2GB Swap (configured by Ansible) |
                                  |                                    |
Internet (Port 80) -------------> | Docker Compose:                    |
                                  |   - Frontend (Port 80)             |
                                  |   - Backend API (Port 5000)        |
                                  |   - MongoDB 6.0 (Port 27017)       |
                                  +------------------------------------+
```

- **Terraform:** Creates the Azure Resource Group, Virtual Network, Subnet, Network Security Group (ports 22, 80, 443), Public IP, and the `Standard_B1s` VM. Terraform automatically creates `deploy/ansible/inventory.ini` with the VM's public IP address.
- **Ansible:** Configures 2GB swap space (preventing 1GB RAM out-of-memory errors), installs Docker & Docker Compose plugin, synchronizes the project code, sets up production `.env`, runs `docker compose up -d --build`, and seeds the initial demo data.

---

## Prerequisites

Before starting, ensure you have the following installed locally:

1. **Azure CLI** (`az`): [Install guide](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
2. **Terraform** (`>= 1.3`): [Install guide](https://developer.hashicorp.com/terraform/install)
3. **Ansible** (`>= 2.10`): [Install guide](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
4. **SSH Key**: Ensure you have an SSH key pair (`~/.ssh/id_rsa` or `~/.ssh/id_ed25519`). If not, generate one:
   ```bash
   ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
   ```

---

## Quickstart Deployment

### 1. Authenticate with Azure

```bash
az login
```
*(If you have multiple subscriptions, select your free tier subscription)*:
```bash
az account set --subscription "<YOUR_SUBSCRIPTION_NAME_OR_ID>"
```

---

### 2. Provision Infrastructure (Terraform)

Navigate to the `deploy/terraform` directory:

```bash
cd deploy/terraform
```

*(Optional)* Create `terraform.tfvars` if your SSH key is located elsewhere or you want to change the region:
```bash
cp terraform.tfvars.example terraform.tfvars
```

Initialize and apply the Terraform configuration:
```bash
terraform init
terraform apply
```

Type `yes` when prompted. 

When complete, Terraform will output:
- `vm_public_ip`
- `ssh_command`
- `application_url`

Terraform will also automatically generate `deploy/ansible/inventory.ini`.

---

### 3. Configure VM & Deploy App (Ansible)

Switch to the Ansible directory:

```bash
cd ../ansible
```

*(Optional)* Review and customize settings in `vars.yml` (e.g. `jwt_secret`, `seed_database`).

Run the playbook:

```bash
ansible-playbook playbook.yml
```

Ansible will:
1. Configure 2GB swap space on the VM.
2. Install Docker & Docker Compose.
3. Sync your TaskFlow application code to `/opt/taskflow`.
4. Build and start the production Docker containers.
5. Verify health check and seed initial demo data.

---

### 4. Access the Application

Once Ansible completes, open your browser and navigate to:
```
http://<VM_PUBLIC_IP>
```

**Demo Login:**
- **Email:** `demo@taskflow.com`
- **Password:** `Demo1234`

---

## Automated CI/CD with GitHub Actions

A full CI/CD pipeline is configured in [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).

Every time you push code to `main`:
1. **Lint & Test:** Builds the React client and verifies dependencies.
2. **Deploy:** GitHub Actions connects to your Azure VM via SSH and executes Ansible to deploy the updated containers with zero downtime.
3. **Verify:** Performs an automated health check against `http://<VM_PUBLIC_IP>/api/health`.

### Setting Up GitHub Repository Secrets

To enable CI/CD, add these secrets to your GitHub repository (**Settings > Secrets and variables > Actions > New repository secret**):

| Secret Name | Value | Required? |
| :--- | :--- | :--- |
| `VM_HOST` | The public IP of your Azure VM (from `terraform output vm_public_ip`) | **Yes** |
| `SSH_PRIVATE_KEY` | Your private SSH key (run `cat ~/.ssh/id_rsa`) | **Yes** |
| `VM_USER` | `azureuser` | Optional (defaults to `azureuser`) |
| `JWT_SECRET` | A secure random string for JWT auth | Optional |

---

## Day-2 Operations

### Updating the Application Code
- **With CI/CD:** Simply `git push origin main`. GitHub Actions deploys automatically.
- **Manually via Ansible:**
  ```bash
  cd deploy/ansible
  ansible-playbook playbook.yml
  ```

### SSH into the VM
Use the command from Terraform output:
```bash
ssh -i ~/.ssh/id_rsa azureuser@<VM_PUBLIC_IP>
```

### Viewing Container Logs on the VM
```bash
cd /opt/taskflow
docker compose -f docker-compose.prod.yml logs -f
```

### Teardown (Clean Up All Azure Resources)
To delete all resources and stop any future charges:
```bash
cd deploy/terraform
terraform destroy
```
