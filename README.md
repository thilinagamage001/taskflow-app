# TaskFlow — DevOps & Cloud Infrastructure Guide

[![TaskFlow CI/CD Pipeline](https://github.com/thilinagamage001/taskflow-app/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/thilinagamage001/taskflow-app/actions/workflows/ci-cd.yml)
[![Docker](https://img.shields.io/badge/Containers-Docker_Multi--Stage-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Orchestration-Docker_Compose-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![Terraform](https://img.shields.io/badge/IaC-Terraform_1.5+-844FBA?logo=terraform&logoColor=white)](https://www.terraform.io/)
[![AWS](https://img.shields.io/badge/Cloud-AWS_Free_Tier-232F3E?logo=amazon-aws&logoColor=white)](https://aws.amazon.com/free/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-grade DevOps implementation for **TaskFlow**, a full-stack MERN application. This repository features end-to-end Infrastructure-as-Code (Terraform), Docker multi-stage containerization, Docker Compose orchestration, and an automated GitHub Actions CI/CD pipeline—specifically optimized to run **100% within the AWS Free Tier ($0/month)**.

---

## Table of Contents

- [DevOps Architecture](#devops-architecture)
- [DevOps Stack Highlights](#devops-stack-highlights)
- [Repository Structure](#repository-structure)
- [Local Development with Docker](#local-development-with-docker)
- [Infrastructure as Code (Terraform)](#infrastructure-as-code-terraform)
- [Continuous Integration & Continuous Deployment (CI/CD)](#continuous-integration--continuous-deployment-cicd)
- [Operational Runbook & Monitoring](#operational-runbook--monitoring)
- [Security & Cost Optimization](#security--cost-optimization)
- [License](#license)

---

## DevOps Architecture

```
                      ┌──────────────────────────────────────────┐
                      │         GitHub Actions (CI/CD)           │
                      │   1. Lint & Build Frontend / Backend     │
                      │   2. Build & Push Docker images to GHCR  │
                      │   3. Deploy via SSH + Docker Compose     │
                      └────────────────────┬─────────────────────┘
                                           │
┌──────────────────────────┐               │
│     Terraform (IaC)      │               │
│  1. VPC & Public Subnet  │               │
│  2. Security Groups (80) │               │
│  3. EC2 t3.micro (Free)  ├───────────────┤
│  4. Cloud-Init (Docker)  │               │
│  5. Elastic IP (Static)  │               │
└──────────────────────────┘               ▼
                               ┌─────────────────────────────────┐
                               │       AWS EC2 (t3.micro)        │
                               │  - 2 GB Swap Guard (No OOM)     │
                               │  - Docker Engine & Compose      │
                               │                                 │
                               │  [docker-compose.prod.yml]      │
                               │  ├── Frontend (:80 proxy)       │
                               │  ├── Backend API (:5000)        │
                               │  └── MongoDB (or Atlas Cloud)   │
                               │  └── Volume: uploads-data       │
                               └─────────────────────────────────┘
```

---

## DevOps Stack Highlights

| Domain | Technology | Implementation Details |
| :--- | :--- | :--- |
| **Cloud Provider** | AWS Free Tier | Single `t3.micro` instance (2 vCPUs, 1 GB RAM, 25 GB gp3 EBS, Elastic IP). |
| **IaC** | Terraform (>= 1.5) | Fully declarative VPC, public subnet, internet gateway, route table, security groups, EC2, and automated cloud-init bootstrap. |
| **Host Bootstrap** | Cloud-Init (`user_data`) | Automated OS configuration: 2 GB swapfile setup to guarantee memory stability on 1 GB RAM, Docker CE and Docker Compose installation, and group permissions. |
| **Orchestration** | Docker Compose | Multi-container production orchestration with custom network isolation, health probes, and persistent volumes for avatars (`uploads-data`). |
| **Containerization** | Docker | Multi-stage production builds with Node 22 (`server/Dockerfile.prod`) and Nginx Alpine (`client/Dockerfile.prod`), reducing image footprints and attack surface. |
| **CI/CD** | GitHub Actions | Automated build verification, Docker image caching and publishing to GitHub Container Registry (`ghcr.io`), and zero-downtime SSH deployment. |

---

## Repository Structure

```
taskflow/
├── docker-compose.prod.yml       # Production multi-container composition
├── docker-compose.dev.yml        # Local development orchestration
├── DEPLOYMENT.md                 # Detailed step-by-step deployment guide
├── terraform/                    # Infrastructure as Code
│   ├── main.tf                  # VPC, Subnet, Security Group, EC2 + Cloud-Init Docker, Elastic IP
│   ├── variables.tf             # Input variables (region, instance type, keys)
│   ├── outputs.tf               # Public IP, SSH command, application URL
│   ├── terraform.tfvars.example # Example variable values
│   └── terraform.tfvars         # Your local configuration (gitignored)
├── .github/workflows/
│   └── ci-cd.yml                # CI test, GHCR build/push, and EC2 Docker Compose deployment
├── server/
│   ├── Dockerfile.prod          # Multi-stage production backend container
│   ├── Dockerfile.dev           # Development container
│   └── src/                     # Express REST API
└── client/
    ├── Dockerfile.prod          # Multi-stage production frontend (React + Nginx) container
    ├── Dockerfile.dev           # Development container
    └── src/                     # React 19 + Redux Toolkit SPA
```

---

## Local Development with Docker

### 1. Start all services (MongoDB, Express API, Vite React Frontend)

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 2. Seed demo data into the database

```bash
docker compose -f docker-compose.dev.yml exec api npm run seed
```

### 3. Open in your browser
- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Demo Credentials:** `demo@taskflow.com` / `Demo1234`

---

## Infrastructure as Code (Terraform)

### 1. Configure variables

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars`:
```hcl
aws_region       = "us-east-1"
key_pair_name    = "my-aws-key"
private_key_file = "~/.ssh/my-aws-key.pem"
instance_type    = "t3.micro"  # AWS Free Tier eligible
```

### 2. Initialize and deploy

```bash
terraform init
terraform plan
terraform apply -auto-approve
```

Terraform automatically configures the server, installs Docker, creates a 2 GB swap space, and assigns an Elastic IP.

---

## Continuous Integration & Continuous Deployment (CI/CD)

The GitHub Actions workflow in [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) executes on every push to `main` or `develop`:

1. **Test & Verify**: Installs dependencies and runs linting and build checks for both client and server.
2. **Docker Build & Push**: Builds multi-stage production images with Docker Buildx and pushes them to **GitHub Container Registry (`ghcr.io`)**.
3. **Deploy via Docker Compose**: Connects to the AWS EC2 instance via SSH, updates `docker-compose.prod.yml`, pulls the latest images, and restarts containers with `docker compose up -d`.

### Setting Up GitHub Repository Secrets

Under your GitHub repository → **Settings** → **Secrets and variables** → **Actions**:

| Secret Name | Value |
| :--- | :--- |
| `EC2_HOST` | Output from `terraform output ec2_public_ip` (e.g. `3.211.185.56`) |
| `EC2_USER` | `ubuntu` |
| `SSH_PRIVATE_KEY` | Entire content of `~/.ssh/my-aws-key.pem` |
| `MONGODB_URI` *(Optional)* | Cloud MongoDB Atlas URI (or leave blank to use containerized MongoDB) |
| `JWT_SECRET` *(Optional)* | Production JWT signing secret |

---

## Operational Runbook & Monitoring

### 1. View Service Status & Logs on EC2

```bash
# Connect to EC2
ssh -i ~/.ssh/my-aws-key.pem ubuntu@<EC2_PUBLIC_IP>

# Check running containers
docker compose -f /home/ubuntu/taskflow-app/docker-compose.prod.yml ps

# View live container logs
docker compose -f /home/ubuntu/taskflow-app/docker-compose.prod.yml logs -f --tail=100
```

### 2. Seed Database on Production

```bash
docker compose -f /home/ubuntu/taskflow-app/docker-compose.prod.yml exec api npm run seed
```

### 3. Monitor Host Resources (RAM & Swap)

```bash
free -h
docker stats --no-stream
```

---

## Security & Cost Optimization

### Security Controls
- **Zero Exposed Database:** Port 27017 is strictly internal within Docker bridge network.
- **Minimal Public Attack Surface:** Security Group opens only port 22 (SSH) and port 80/443 (HTTP/HTTPS).
- **Non-Root Containers:** Multi-stage production Dockerfiles discard intermediate build toolchains.
- **Upload File Integrity:** Multer strictly validates image MIME types and limits size to 5 MB.

### AWS Free Tier Compliance Checklist
- [x] **EC2:** `t3.micro` instance (within 750 free hours/month limit).
- [x] **Storage:** 25 GB gp3 root volume (within 30 GB free monthly tier).
- [x] **Elastic IP:** 1 EIP attached to a running instance (incurs zero idle fee).
- [x] **Memory Stability:** 2 GB Swap file guarantees high stability on 1 GB RAM without paying for larger instances.

### Teardown (Clean Up AWS Resources)

```bash
cd terraform
terraform destroy -auto-approve
```

---

## License

This project is licensed under the [MIT License](LICENSE).
