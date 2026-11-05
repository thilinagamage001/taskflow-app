import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const si = require('../client/node_modules/react-icons/si');
const fa = require('../client/node_modules/react-icons/fa6');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '../docs/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function extractPath(comp) {
  const tree = comp({});
  let d = '';
  if (tree.props && tree.props.children) {
    for (const child of tree.props.children) {
      if (child.props && child.props.d) d += ' ' + child.props.d;
    }
  }
  return d.trim();
}

// Extract official tech logos & icons
const icons = {
  github: extractPath(si.SiGithub),
  actions: extractPath(si.SiGithubactions),
  docker: extractPath(si.SiDocker),
  terraform: extractPath(si.SiTerraform),
  ansible: extractPath(si.SiAnsible),
  k8s: extractPath(si.SiKubernetes),
  traefik: extractPath(si.SiTraefikproxy),
  react: extractPath(si.SiReact),
  node: extractPath(si.SiNodedotjs),
  mongodb: extractPath(si.SiMongodb),
  ubuntu: extractPath(si.SiUbuntu),
  aws: extractPath(fa.FaAws),
};

// =============================================================================
// DIAGRAM 1: DevOps & Cloud Architecture (Icon-Centric, Low Text)
// =============================================================================
const architectureSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 780" width="100%" height="100%" style="background:#090d16; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1120"/>
      <stop offset="50%" stop-color="#090d16"/>
      <stop offset="100%" stop-color="#050811"/>
    </linearGradient>

    <!-- Zone Gradients -->
    <linearGradient id="gitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.8"/>
    </linearGradient>

    <linearGradient id="iacGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b0764" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.8"/>
    </linearGradient>

    <linearGradient id="awsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#451a03" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.8"/>
    </linearGradient>

    <linearGradient id="k8sGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.7"/>
    </linearGradient>

    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>

    <!-- Drop Shadows -->
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.5"/>
    </filter>

    <filter id="iconGlowBlue" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#38bdf8" flood-opacity="0.4"/>
    </filter>
    <filter id="iconGlowPurple" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#a855f7" flood-opacity="0.4"/>
    </filter>
    <filter id="iconGlowOrange" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ff9900" flood-opacity="0.4"/>
    </filter>
    <filter id="iconGlowGreen" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#10b981" flood-opacity="0.4"/>
    </filter>

    <!-- Arrow Markers -->
    <marker id="arrowCyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8"/>
    </marker>
    <marker id="arrowPurple" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#c084fc"/>
    </marker>
    <marker id="arrowGreen" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#34d399"/>
    </marker>
    <marker id="arrowOrange" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#fb923c"/>
    </marker>
  </defs>

  <!-- Background Base -->
  <rect width="1280" height="780" fill="url(#bgGrad)"/>

  <!-- Subtle Ambient Background Grid -->
  <g stroke="#334155" stroke-opacity="0.12" stroke-width="1">
    <line x1="0" y1="80" x2="1280" y2="80"/>
    <line x1="0" y1="240" x2="1280" y2="240"/>
    <line x1="0" y1="420" x2="1280" y2="420"/>
    <line x1="0" y1="600" x2="1280" y2="600"/>
    <line x1="280" y1="0" x2="280" y2="780"/>
    <line x1="560" y1="0" x2="560" y2="780"/>
    <line x1="920" y1="0" x2="920" y2="780"/>
  </g>

  <!-- ==================== HEADER ==================== -->
  <g transform="translate(40, 24)">
    <text x="0" y="24" fill="url(#titleGrad)" font-size="24" font-weight="800" letter-spacing="-0.5">TaskFlow DevOps Architecture</text>
    <text x="0" y="44" fill="#94a3b8" font-size="12" font-weight="500">AWS Free Tier ($0/mo) | Infrastructure as Code | K3s Lightweight Kubernetes | GitOps CI/CD</text>

    <!-- Top Status Badges -->
    <g transform="translate(860, 2)">
      <rect x="0" y="0" width="115" height="26" rx="13" fill="#1e293b" stroke="#ff9900" stroke-width="1.2"/>
      <text x="57" y="17" fill="#ff9900" font-size="10" font-weight="700" text-anchor="middle">AWS FREE TIER</text>

      <rect x="125" y="0" width="105" height="26" rx="13" fill="#1e293b" stroke="#326ce5" stroke-width="1.2"/>
      <text x="177" y="17" fill="#60a5fa" font-size="10" font-weight="700" text-anchor="middle">K3s CLUSTER</text>

      <rect x="240" y="0" width="140" height="26" rx="13" fill="#1e293b" stroke="#34d399" stroke-width="1.2"/>
      <text x="310" y="17" fill="#34d399" font-size="10" font-weight="700" text-anchor="middle">ZERO DOWNTIME</text>
    </g>
  </g>

  <!-- ==================== ZONE 1: CI/CD & REGISTRY (LEFT) ==================== -->
  <g transform="translate(40, 90)">
    <rect x="0" y="0" width="225" height="660" rx="16" fill="url(#gitGrad)" stroke="#6366f1" stroke-width="1.2" stroke-opacity="0.6" filter="url(#cardShadow)"/>
    
    <!-- Zone Label -->
    <g transform="translate(18, 20)">
      <text x="0" y="14" fill="#a5b4fc" font-size="13" font-weight="700" letter-spacing="0.5">CI/CD &amp; REGISTRY</text>
    </g>

    <!-- Card 1: GitHub -->
    <g transform="translate(16, 50)">
      <rect x="0" y="0" width="193" height="135" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.2"/>
      
      <!-- Icon Container -->
      <circle cx="96" cy="42" r="26" fill="#1e293b" stroke="#475569" stroke-width="1"/>
      <g transform="translate(82, 28) scale(1.15)">
        <path d="${icons.github}" fill="#ffffff"/>
      </g>

      <text x="96" y="88" fill="#f8fafc" font-size="13" font-weight="700" text-anchor="middle">GitHub</text>
      <text x="96" y="104" fill="#94a3b8" font-size="10" text-anchor="middle">Source Repository</text>

      <!-- Pill -->
      <rect x="52" y="112" width="88" height="16" rx="8" fill="#1e1b4b"/>
      <text x="96" y="123" fill="#818cf8" font-size="9" font-weight="600" text-anchor="middle">git push [main]</text>
    </g>

    <!-- Arrow down -->
    <path d="M 112 185 L 112 215" stroke="#6366f1" stroke-width="2" marker-end="url(#arrowPurple)"/>

    <!-- Card 2: GitHub Actions -->
    <g transform="translate(16, 220)">
      <rect x="0" y="0" width="193" height="155" rx="12" fill="#0f172a" stroke="#6366f1" stroke-width="1.2"/>
      
      <circle cx="96" cy="44" r="26" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.2" filter="url(#iconGlowBlue)"/>
      <g transform="translate(82, 30) scale(1.15)">
        <path d="${icons.actions}" fill="#2088ff"/>
      </g>

      <text x="96" y="92" fill="#f8fafc" font-size="13" font-weight="700" text-anchor="middle">GitHub Actions</text>
      <text x="96" y="108" fill="#94a3b8" font-size="10" text-anchor="middle">Automated CI/CD</text>

      <!-- Badges -->
      <rect x="25" y="118" width="65" height="18" rx="4" fill="#1e293b"/>
      <text x="57" y="130" fill="#38bdf8" font-size="9" font-weight="600" text-anchor="middle">Lint &amp; Test</text>
      <rect x="98" y="118" width="70" height="18" rx="4" fill="#1e293b"/>
      <text x="133" y="130" fill="#c084fc" font-size="9" font-weight="600" text-anchor="middle">Buildx Push</text>

      <rect x="42" y="140" width="110" height="18" rx="4" fill="#064e3b"/>
      <text x="97" y="152" fill="#34d399" font-size="9" font-weight="600" text-anchor="middle">SSH Rolling Deploy</text>
    </g>

    <!-- Arrow down -->
    <path d="M 112 375 L 112 405" stroke="#0ea5e9" stroke-width="2" marker-end="url(#arrowCyan)"/>

    <!-- Card 3: GHCR (Docker) -->
    <g transform="translate(16, 410)">
      <rect x="0" y="0" width="193" height="145" rx="12" fill="#0f172a" stroke="#0284c7" stroke-width="1.2"/>
      
      <circle cx="96" cy="42" r="26" fill="#0c4a6e" stroke="#0284c7" stroke-width="1.2" filter="url(#iconGlowBlue)"/>
      <g transform="translate(82, 28) scale(1.15)">
        <path d="${icons.docker}" fill="#0db7ed"/>
      </g>

      <text x="96" y="88" fill="#f8fafc" font-size="13" font-weight="700" text-anchor="middle">GHCR Registry</text>
      <text x="96" y="104" fill="#94a3b8" font-size="10" text-anchor="middle">Multi-Stage Images</text>

      <!-- Image Tags -->
      <rect x="18" y="114" width="75" height="18" rx="4" fill="#1e293b"/>
      <text x="55" y="126" fill="#7dd3fc" font-size="9" font-family="monospace" text-anchor="middle">api:latest</text>
      <rect x="100" y="114" width="75" height="18" rx="4" fill="#1e293b"/>
      <text x="137" y="126" fill="#7dd3fc" font-size="9" font-family="monospace" text-anchor="middle">web:latest</text>
    </g>
  </g>

  <!-- ==================== ZONE 2: INFRASTRUCTURE AS CODE (MIDDLE) ==================== -->
  <g transform="translate(290, 90)">
    <rect x="0" y="0" width="225" height="660" rx="16" fill="url(#iacGrad)" stroke="#a855f7" stroke-width="1.2" stroke-opacity="0.6" filter="url(#cardShadow)"/>
    
    <g transform="translate(18, 20)">
      <text x="0" y="14" fill="#d8b4fe" font-size="13" font-weight="700" letter-spacing="0.5">IaC &amp; PROVISIONING</text>
    </g>

    <!-- Card 1: Terraform -->
    <g transform="translate(16, 50)">
      <rect x="0" y="0" width="193" height="235" rx="12" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.2"/>
      
      <circle cx="96" cy="46" r="26" fill="#2e1065" stroke="#8b5cf6" stroke-width="1.2" filter="url(#iconGlowPurple)"/>
      <g transform="translate(82, 32) scale(1.15)">
        <path d="${icons.terraform}" fill="#a855f7"/>
      </g>

      <text x="96" y="94" fill="#f8fafc" font-size="14" font-weight="700" text-anchor="middle">Terraform</text>
      <text x="96" y="110" fill="#94a3b8" font-size="10" text-anchor="middle">AWS Cloud IaC</text>

      <!-- Provisioned Badges -->
      <g transform="translate(16, 122)">
        <rect x="0" y="0" width="160" height="20" rx="4" fill="#1e293b"/>
        <text x="80" y="14" fill="#cbd5e1" font-size="9" font-weight="600" text-anchor="middle">VPC &amp; Subnet (10.0.0.0/16)</text>

        <rect x="0" y="26" width="160" height="20" rx="4" fill="#1e293b"/>
        <text x="80" y="40" fill="#cbd5e1" font-size="9" font-weight="600" text-anchor="middle">Security Groups (22, 80)</text>

        <rect x="0" y="52" width="160" height="20" rx="4" fill="#1e293b"/>
        <text x="80" y="66" fill="#cbd5e1" font-size="9" font-weight="600" text-anchor="middle">EC2 t2.micro + 30GB gp3</text>

        <rect x="0" y="78" width="160" height="20" rx="4" fill="#065f46"/>
        <text x="80" y="92" fill="#6ee7b7" font-size="9" font-weight="700" text-anchor="middle">Elastic IP (Static IP)</text>
      </g>
    </g>

    <!-- Arrow from Terraform to Ansible -->
    <path d="M 112 285 L 112 325" stroke="#a855f7" stroke-width="2" marker-end="url(#arrowPurple)"/>
    <rect x="62" y="295" width="100" height="16" rx="4" fill="#1e1b4b"/>
    <text x="112" y="306" fill="#e9d5ff" font-size="8" font-family="monospace" text-anchor="middle">inventory.ini</text>

    <!-- Card 2: Ansible -->
    <g transform="translate(16, 330)">
      <rect x="0" y="0" width="193" height="225" rx="12" fill="#0f172a" stroke="#ef4444" stroke-width="1.2"/>
      
      <circle cx="96" cy="46" r="26" fill="#450a0a" stroke="#ef4444" stroke-width="1.2"/>
      <g transform="translate(82, 32) scale(1.15)">
        <path d="${icons.ansible}" fill="#ef4444"/>
      </g>

      <text x="96" y="94" fill="#f8fafc" font-size="14" font-weight="700" text-anchor="middle">Ansible</text>
      <text x="96" y="110" fill="#94a3b8" font-size="10" text-anchor="middle">Node Configuration</text>

      <!-- Key Ansible Roles -->
      <g transform="translate(16, 122)">
        <rect x="0" y="0" width="160" height="20" rx="4" fill="#450a0a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="80" y="14" fill="#fca5a5" font-size="9" font-weight="700" text-anchor="middle">2 GB Swap Space (No OOM)</text>

        <rect x="0" y="26" width="160" height="20" rx="4" fill="#1e293b"/>
        <text x="80" y="40" fill="#cbd5e1" font-size="9" font-weight="600" text-anchor="middle">sysctl vm.swappiness=10</text>

        <rect x="0" y="52" width="160" height="20" rx="4" fill="#1e293b"/>
        <text x="80" y="66" fill="#cbd5e1" font-size="9" font-weight="600" text-anchor="middle">IP Forwarding Enabled</text>

        <rect x="0" y="78" width="160" height="20" rx="4" fill="#1e293b"/>
        <text x="80" y="92" fill="#60a5fa" font-size="9" font-weight="700" text-anchor="middle">Install K3s &amp; Traefik</text>
      </g>
    </g>
  </g>

  <!-- ==================== ZONE 3: AWS CLOUD & KUBERNETES RUNTIME ==================== -->
  <g transform="translate(540, 90)">
    <!-- AWS Outer Box -->
    <rect x="0" y="0" width="700" height="660" rx="16" fill="url(#awsGrad)" stroke="#ff9900" stroke-width="1.8" filter="url(#cardShadow)"/>

    <!-- AWS Header with Icon -->
    <g transform="translate(24, 18)">
      <g transform="translate(0, 0) scale(0.065)">
        <path d="${icons.aws}" fill="#ff9900" filter="url(#iconGlowOrange)"/>
      </g>
      <text x="50" y="24" fill="#fb923c" font-size="15" font-weight="800">AWS Cloud (Free Tier)</text>
      
      <!-- Network Spec Badge -->
      <g transform="translate(370, 8)">
        <rect x="0" y="0" width="280" height="22" rx="6" fill="#1e293b" stroke="#475569" stroke-width="0.8"/>
        <text x="140" y="15" fill="#f8fafc" font-size="9" font-weight="600" text-anchor="middle">VPC: 10.0.0.0/16 | Elastic IP | Ports: 22, 80</text>
      </g>
    </g>

    <!-- EC2 Boundary Box -->
    <g transform="translate(20, 52)">
      <rect x="0" y="0" width="660" height="475" rx="14" fill="#0b1329" stroke="#38bdf8" stroke-width="1.2"/>
      
      <!-- EC2 Host Header with Ubuntu Icon -->
      <g transform="translate(18, 14)">
        <g transform="translate(0, 0) scale(0.8)">
          <path d="${icons.ubuntu}" fill="#e95420"/>
        </g>
        <text x="24" y="15" fill="#f8fafc" font-size="12" font-weight="700">EC2 Instance (Ubuntu 24.04 LTS)</text>

        <rect x="420" y="2" width="200" height="18" rx="4" fill="#1e293b"/>
        <text x="520" y="14" fill="#38bdf8" font-size="9" font-weight="600" text-anchor="middle">t2.micro | 1 GB RAM + 2 GB Swap</text>
      </g>

      <!-- K3s Cluster Box -->
      <g transform="translate(16, 42)">
        <rect x="0" y="0" width="628" height="415" rx="12" fill="url(#k8sGrad)" stroke="#326ce5" stroke-width="1.4"/>
        
        <!-- K3s Header with Helm Icon -->
        <g transform="translate(16, 12)">
          <g transform="translate(0, 0) scale(0.9)">
            <path d="${icons.k8s}" fill="#326ce5"/>
          </g>
          <text x="28" y="16" fill="#60a5fa" font-size="13" font-weight="800">K3s Kubernetes Cluster</text>
          
          <rect x="440" y="2" width="140" height="18" rx="4" fill="#1e293b"/>
          <text x="510" y="14" fill="#a5b4fc" font-size="9" font-weight="600" text-anchor="middle">Namespace: taskflow</text>
        </g>

        <!-- Traefik Ingress Card -->
        <g transform="translate(16, 42)">
          <rect x="0" y="0" width="596" height="60" rx="10" fill="#0f172a" stroke="#24a1c1" stroke-width="1.2"/>
          
          <!-- Traefik Icon -->
          <circle cx="36" cy="30" r="18" fill="#083344" stroke="#24a1c1" stroke-width="1"/>
          <g transform="translate(24, 18) scale(1)">
            <path d="${icons.traefik}" fill="#24a1c1"/>
          </g>

          <text x="66" y="26" fill="#38bdf8" font-size="13" font-weight="700">Traefik Ingress Controller</text>
          <text x="66" y="42" fill="#94a3b8" font-size="10">External HTTP/S Traffic (:80 / :443)</text>

          <!-- Routing Pills -->
          <g transform="translate(320, 18)">
            <rect x="0" y="0" width="125" height="24" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
            <text x="62" y="16" fill="#67e8f9" font-size="10" font-weight="700" text-anchor="middle">Path / $\to$ Frontend</text>

            <rect x="135" y="0" width="130" height="24" rx="6" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
            <text x="200" y="16" fill="#c084fc" font-size="10" font-weight="700" text-anchor="middle">Path /api $\to$ Backend</text>
          </g>
        </g>

        <!-- Dynamic Ingress Routes (Lines) -->
        <path d="M 160 102 L 160 135" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrowCyan)"/>
        <path d="M 460 102 L 460 135" stroke="#a78bfa" stroke-width="2" marker-end="url(#arrowPurple)"/>

        <!-- Frontend Pod (React) -->
        <g transform="translate(16, 140)">
          <rect x="0" y="0" width="288" height="185" rx="12" fill="#0f172a" stroke="#0284c7" stroke-width="1.2"/>
          
          <circle cx="40" cy="38" r="22" fill="#082f49" stroke="#0ea5e9" stroke-width="1" filter="url(#iconGlowBlue)"/>
          <g transform="translate(28, 26) scale(1)">
            <path d="${icons.react}" fill="#61dafb"/>
          </g>

          <text x="74" y="34" fill="#f8fafc" font-size="13" font-weight="700">Frontend Pod</text>
          <text x="74" y="50" fill="#38bdf8" font-size="11" font-weight="600">React 19 + Vite 8</text>

          <!-- Badges & Details -->
          <g transform="translate(16, 74)">
            <rect x="0" y="0" width="256" height="24" rx="6" fill="#1e293b"/>
            <text x="128" y="16" fill="#cbd5e1" font-size="9" font-weight="600" text-anchor="middle">Node.js Static &amp; Reverse Proxy</text>

            <rect x="0" y="30" width="256" height="24" rx="6" fill="#1e293b"/>
            <text x="128" y="46" fill="#34d399" font-size="9" font-weight="600" text-anchor="middle">Resources: 64Mi req / 128Mi limit</text>

            <rect x="0" y="60" width="256" height="24" rx="6" fill="#1e293b"/>
            <text x="128" y="76" fill="#facc15" font-size="9" font-weight="600" text-anchor="middle">TCP Socket Probes (:80)</text>

            <rect x="0" y="90" width="256" height="14" rx="4" fill="#0369a1"/>
            <text x="128" y="101" fill="#ffffff" font-size="8" font-weight="700" text-anchor="middle">Service: frontend-service:80</text>
          </g>
        </g>

        <!-- Backend Pod (Node / Express) -->
        <g transform="translate(324, 140)">
          <rect x="0" y="0" width="288" height="185" rx="12" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.2"/>
          
          <circle cx="40" cy="38" r="22" fill="#14532d" stroke="#22c55e" stroke-width="1" filter="url(#iconGlowGreen)"/>
          <g transform="translate(28, 26) scale(1)">
            <path d="${icons.node}" fill="#5fa04e"/>
          </g>

          <text x="74" y="34" fill="#f8fafc" font-size="13" font-weight="700">Backend API Pod</text>
          <text x="74" y="50" fill="#4ade80" font-size="11" font-weight="600">Node.js + Express REST</text>

          <!-- Badges & Details -->
          <g transform="translate(16, 74)">
            <rect x="0" y="0" width="256" height="24" rx="6" fill="#1e293b"/>
            <text x="128" y="16" fill="#cbd5e1" font-size="9" font-weight="600" text-anchor="middle">ConfigMap + Secret (JWT / URI)</text>

            <rect x="0" y="30" width="256" height="24" rx="6" fill="#1e293b"/>
            <text x="128" y="46" fill="#34d399" font-size="9" font-weight="600" text-anchor="middle">Resources: 128Mi req / 256Mi limit</text>

            <rect x="0" y="60" width="256" height="24" rx="6" fill="#1e293b"/>
            <text x="128" y="76" fill="#facc15" font-size="9" font-weight="600" text-anchor="middle">HTTP GET /api/health Probes</text>

            <rect x="0" y="90" width="256" height="14" rx="4" fill="#5b21b6"/>
            <text x="128" y="101" fill="#ffffff" font-size="8" font-weight="700" text-anchor="middle">Service: api-service:5000</text>
          </g>
        </g>

        <!-- Persistent Storage & Strategy Row -->
        <g transform="translate(16, 335)">
          <rect x="0" y="0" width="288" height="65" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
          
          <circle cx="28" cy="32" r="16" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
          <text x="28" y="37" fill="#34d399" font-size="14" text-anchor="middle">💾</text>

          <text x="56" y="26" fill="#34d399" font-size="11" font-weight="700">PVC: uploads-pvc (1 GB)</text>
          <text x="56" y="42" fill="#94a3b8" font-size="9">Local-path storage mounted at /app/uploads</text>
          <text x="56" y="55" fill="#6ee7b7" font-size="9" font-weight="600">Persistent user avatars storage</text>
        </g>

        <g transform="translate(324, 335)">
          <rect x="0" y="0" width="288" height="65" rx="8" fill="#0f172a" stroke="#6366f1" stroke-width="1"/>
          
          <circle cx="28" cy="32" r="16" fill="#312e81" stroke="#6366f1" stroke-width="1"/>
          <text x="28" y="37" fill="#818cf8" font-size="14" text-anchor="middle">🔄</text>

          <text x="56" y="26" fill="#a5b4fc" font-size="11" font-weight="700">Zero-Downtime Deployment</text>
          <text x="56" y="42" fill="#94a3b8" font-size="9">RollingUpdate (maxSurge: 1, maxUnavailable: 0)</text>
          <text x="56" y="55" fill="#818cf8" font-size="9" font-weight="600">Old pods terminate only when new pass probes</text>
        </g>
      </g>
    </g>

    <!-- Arrow from API Pod to MongoDB Atlas -->
    <path d="M 460 528 L 460 545" stroke="#34d399" stroke-width="2" marker-end="url(#arrowGreen)"/>

    <!-- MongoDB Atlas External Database Card -->
    <g transform="translate(20, 548)">
      <rect x="0" y="0" width="660" height="95" rx="14" fill="#0f172a" stroke="#10b981" stroke-width="1.5" filter="url(#cardShadow)"/>
      
      <!-- MongoDB Leaf Icon -->
      <circle cx="50" cy="48" r="28" fill="#064e3b" stroke="#10b981" stroke-width="1.2" filter="url(#iconGlowGreen)"/>
      <g transform="translate(36, 34) scale(1.15)">
        <path d="${icons.mongodb}" fill="#00ed64"/>
      </g>

      <text x="96" y="40" fill="#f8fafc" font-size="16" font-weight="800">MongoDB Atlas</text>
      <text x="96" y="58" fill="#34d399" font-size="12" font-weight="600">M0 Free Tier Managed Cluster</text>
      <text x="96" y="74" fill="#94a3b8" font-size="10">Cloud Database with Automated Failover &amp; TLS Encryption</text>

      <!-- Atlas Badges -->
      <g transform="translate(420, 24)">
        <rect x="0" y="0" width="220" height="22" rx="4" fill="#064e3b"/>
        <text x="110" y="15" fill="#a7f3d0" font-size="9" font-weight="700" text-anchor="middle">TLS Enforced (mongodb+srv://)</text>

        <rect x="0" y="28" width="105" height="20" rx="4" fill="#1e293b"/>
        <text x="52" y="42" fill="#6ee7b7" font-size="9" text-anchor="middle">512 MB Storage</text>

        <rect x="115" y="28" width="105" height="20" rx="4" fill="#1e293b"/>
        <text x="167" y="42" fill="#6ee7b7" font-size="9" text-anchor="middle">3-Node Replica</text>
      </g>
    </g>
  </g>

  <!-- ==================== CROSS-ZONE CONNECTORS ==================== -->
  <!-- GitHub Actions -> EC2 SSH Deploy -->
  <path d="M 241 310 C 390 310, 420 200, 560 200" fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#arrowPurple)"/>
  <rect x="365" y="240" width="115" height="20" rx="4" fill="#1e1b4b" stroke="#6366f1" stroke-width="0.8"/>
  <text x="422" y="253" fill="#c7d2fe" font-size="9" font-weight="700" text-anchor="middle">SSH Rolling Deploy</text>

  <!-- GHCR -> K3s Image Pull -->
  <path d="M 241 480 C 400 480, 440 370, 560 370" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#arrowCyan)"/>
  <rect x="375" y="420" width="95" height="20" rx="4" fill="#0c4a6e" stroke="#0284c7" stroke-width="0.8"/>
  <text x="422" y="433" fill="#bae6fd" font-size="9" font-weight="700" text-anchor="middle">Pull Images</text>

  <!-- Terraform -> AWS Provision -->
  <path d="M 515 160 L 540 160" stroke="#8b5cf6" stroke-width="2" marker-end="url(#arrowPurple)"/>

  <!-- Ansible -> EC2 Configure -->
  <path d="M 515 440 L 540 440" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowOrange)"/>

</svg>
`;

// =============================================================================
// DIAGRAM 2: CI/CD Pipeline
// =============================================================================
const cicdSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%" style="background:#090d16; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="cicdBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1120"/>
      <stop offset="50%" stop-color="#090d16"/>
      <stop offset="100%" stop-color="#050811"/>
    </linearGradient>

    <linearGradient id="stage1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.05"/>
    </linearGradient>

    <linearGradient id="stage2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.05"/>
    </linearGradient>

    <linearGradient id="stage3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#047857" stop-opacity="0.05"/>
    </linearGradient>

    <linearGradient id="titleGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>

    <filter id="glowShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <marker id="flowArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8"/>
    </marker>
    <marker id="flowArrowPurple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#a78bfa"/>
    </marker>
    <marker id="flowArrowGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#34d399"/>
    </marker>
  </defs>

  <rect width="1280" height="720" fill="url(#cicdBg)"/>

  <g stroke="#334155" stroke-opacity="0.12" stroke-width="1">
    <line x1="0" y1="80" x2="1280" y2="80"/>
    <line x1="0" y1="200" x2="1280" y2="200"/>
    <line x1="0" y1="360" x2="1280" y2="360"/>
    <line x1="0" y1="520" x2="1280" y2="520"/>
    <line x1="200" y1="0" x2="200" y2="720"/>
    <line x1="560" y1="0" x2="560" y2="720"/>
    <line x1="920" y1="0" x2="920" y2="720"/>
  </g>

  <g transform="translate(40, 28)">
    <text x="0" y="24" fill="url(#titleGrad2)" font-size="24" font-weight="800" letter-spacing="-0.5">TaskFlow Automated CI/CD Pipeline</text>
    <text x="0" y="46" fill="#94a3b8" font-size="13">GitHub Actions to Amazon EC2 (K3s) | Automated Lint, Multi-Stage Build &amp; Zero-Downtime Rollout</text>

    <g transform="translate(860, 2)">
      <rect x="0" y="0" width="380" height="34" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1"/>
      <circle cx="20" cy="17" r="5" fill="#22c55e"/>
      <text x="35" y="22" fill="#e2e8f0" font-size="11" font-weight="600">Triggers: push [main, develop] | PR [main] | dispatch</text>
    </g>
  </g>

  <!-- Stage 1 -->
  <g transform="translate(40, 100)">
    <rect x="0" y="0" width="360" height="580" rx="16" fill="url(#stage1Grad)" stroke="#0284c7" stroke-width="1.5" filter="url(#glowShadow)"/>
    
    <path d="M 0 16 C 0 7.163 7.163 0 16 0 L 344 0 C 352.837 0 360 7.163 360 16 L 360 56 L 0 56 Z" fill="#0c4a6e"/>
    <circle cx="28" cy="28" r="14" fill="#0284c7"/>
    <text x="28" y="33" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">1</text>
    <text x="52" y="27" fill="#f0f9ff" font-size="15" font-weight="700">Stage 1: test-and-verify</text>
    <text x="52" y="44" fill="#7dd3fc" font-size="11">Automated Quality Gates &amp; Build Validation</text>

    <g transform="translate(20, 75)">
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="320" height="75" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="24" fill="#38bdf8" font-size="12" font-weight="700">Step 1: Environment Setup</text>
        <text x="14" y="42" fill="#cbd5e1" font-size="11">• actions/checkout@v4 (Git Repo)</text>
        <text x="14" y="58" fill="#cbd5e1" font-size="11">• actions/setup-node@v4 (Node.js 22 LTS)</text>
      </g>

      <g transform="translate(0, 95)">
        <rect x="0" y="0" width="320" height="75" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="24" fill="#38bdf8" font-size="12" font-weight="700">Step 2: Dependency Caching</text>
        <text x="14" y="42" fill="#cbd5e1" font-size="11">• Hash: server/package-lock.json</text>
        <text x="14" y="58" fill="#cbd5e1" font-size="11">• Hash: client/package-lock.json (npm ci)</text>
      </g>

      <g transform="translate(0, 190)">
        <rect x="0" y="0" width="320" height="90" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="24" fill="#38bdf8" font-size="12" font-weight="700">Step 3: Backend API Validation</text>
        <text x="14" y="42" fill="#cbd5e1" font-size="11">• Clean install dependencies (npm ci)</text>
        <text x="14" y="58" fill="#cbd5e1" font-size="11">• Module resolution &amp; syntax check</text>
        <text x="14" y="74" fill="#94a3b8" font-size="10">Express 4, Mongoose 8, JWT auth layers</text>
      </g>

      <g transform="translate(0, 300)">
        <rect x="0" y="0" width="320" height="100" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="24" fill="#38bdf8" font-size="12" font-weight="700">Step 4: Frontend Lint &amp; Bundle</text>
        <text x="14" y="42" fill="#cbd5e1" font-size="11">• Fast lint check (oxlint)</text>
        <text x="14" y="58" fill="#cbd5e1" font-size="11">• Vite production build bundle (npm run build)</text>
        <text x="14" y="74" fill="#cbd5e1" font-size="11">• CSS &amp; Asset minification verified</text>
        <text x="14" y="90" fill="#94a3b8" font-size="10">Outputs optimized ./client/dist artifacts</text>
      </g>

      <g transform="translate(0, 420)">
        <rect x="0" y="0" width="320" height="40" rx="6" fill="#0369a1"/>
        <text x="160" y="25" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Gate Passed $\to$ Triggers Image Build</text>
      </g>
    </g>
  </g>

  <path d="M 400 390 L 440 390" stroke="#38bdf8" stroke-width="3" marker-end="url(#flowArrow)"/>

  <!-- Stage 2 -->
  <g transform="translate(460, 100)">
    <rect x="0" y="0" width="360" height="580" rx="16" fill="url(#stage2Grad)" stroke="#8b5cf6" stroke-width="1.5" filter="url(#glowShadow)"/>
    
    <path d="M 0 16 C 0 7.163 7.163 0 16 0 L 344 0 C 352.837 0 360 7.163 360 16 L 360 56 L 0 56 Z" fill="#4c1d95"/>
    <circle cx="28" cy="28" r="14" fill="#8b5cf6"/>
    <text x="28" y="33" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">2</text>
    <text x="52" y="27" fill="#f5f3ff" font-size="15" font-weight="700">Stage 2: build-and-push</text>
    <text x="52" y="44" fill="#c4b5fd" font-size="11">Docker Buildx &amp; GHCR Container Registry</text>

    <g transform="translate(20, 75)">
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="320" height="75" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="24" fill="#a78bfa" font-size="12" font-weight="700">Step 1: Docker Buildx &amp; Auth</text>
        <text x="14" y="42" fill="#cbd5e1" font-size="11">• Set up Docker Buildx engine</text>
        <text x="14" y="58" fill="#cbd5e1" font-size="11">• Authenticate to ghcr.io (GITHUB_TOKEN)</text>
      </g>

      <g transform="translate(0, 95)">
        <rect x="0" y="0" width="320" height="95" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="24" fill="#a78bfa" font-size="12" font-weight="700">Step 2: Build API Container Image</text>
        <text x="14" y="42" fill="#cbd5e1" font-size="11">• Multi-stage Dockerfile.prod</text>
        <text x="14" y="58" fill="#cbd5e1" font-size="11">• Node 22 Bookworm slim base</text>
        <text x="14" y="74" fill="#cbd5e1" font-size="11">• Prune devDependencies (npm ci --omit=dev)</text>
        <text x="14" y="88" fill="#94a3b8" font-size="9">GHA multi-layer cache (cache-to: mode=max)</text>
      </g>

      <g transform="translate(0, 210)">
        <rect x="0" y="0" width="320" height="95" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="24" fill="#a78bfa" font-size="12" font-weight="700">Step 3: Build Frontend Container</text>
        <text x="14" y="42" fill="#cbd5e1" font-size="11">• Multi-stage Dockerfile.prod</text>
        <text x="14" y="58" fill="#cbd5e1" font-size="11">• Node 22 Alpine lightweight base</text>
        <text x="14" y="74" fill="#cbd5e1" font-size="11">• Built-in static proxy server (server.js)</text>
        <text x="14" y="88" fill="#94a3b8" font-size="9">Zero-nginx overhead: pure Node.js proxy</text>
      </g>

      <g transform="translate(0, 325)">
        <rect x="0" y="0" width="320" height="75" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="22" fill="#a78bfa" font-size="12" font-weight="700">Step 4: Tag &amp; Publish to GHCR</text>
        <text x="14" y="40" fill="#38bdf8" font-size="10" font-family="monospace">ghcr.io/owner/taskflow-*:latest</text>
        <text x="14" y="56" fill="#c084fc" font-size="10" font-family="monospace">ghcr.io/owner/taskflow-*:&lt;git-sha&gt;</text>
      </g>

      <g transform="translate(0, 420)">
        <rect x="0" y="0" width="320" height="40" rx="6" fill="#6d28d9"/>
        <text x="160" y="25" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Images Published $\to$ Triggers CD</text>
      </g>
    </g>
  </g>

  <path d="M 820 390 L 860 390" stroke="#a78bfa" stroke-width="3" marker-end="url(#flowArrowPurple)"/>

  <!-- Stage 3 -->
  <g transform="translate(880, 100)">
    <rect x="0" y="0" width="360" height="580" rx="16" fill="url(#stage3Grad)" stroke="#10b981" stroke-width="1.5" filter="url(#glowShadow)"/>
    
    <path d="M 0 16 C 0 7.163 7.163 0 16 0 L 344 0 C 352.837 0 360 7.163 360 16 L 360 56 L 0 56 Z" fill="#064e3b"/>
    <circle cx="28" cy="28" r="14" fill="#10b981"/>
    <text x="28" y="33" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">3</text>
    <text x="52" y="27" fill="#ecfdf5" font-size="15" font-weight="700">Stage 3: deploy (Rolling Update)</text>
    <text x="52" y="44" fill="#a7f3d0" font-size="11">SSH to AWS EC2 &amp; Zero-Downtime Rollout</text>

    <g transform="translate(20, 75)">
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="320" height="75" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="24" fill="#34d399" font-size="12" font-weight="700">Step 1: Secure SSH Handshake</text>
        <text x="14" y="42" fill="#cbd5e1" font-size="11">• Load SSH_PRIVATE_KEY into runner</text>
        <text x="14" y="58" fill="#cbd5e1" font-size="11">• Connect to EC2_HOST (Elastic IP)</text>
      </g>

      <g transform="translate(0, 95)">
        <rect x="0" y="0" width="320" height="80" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="24" fill="#34d399" font-size="12" font-weight="700">Step 2: Sync Kubernetes Manifests</text>
        <text x="14" y="42" fill="#cbd5e1" font-size="11">• scp -r k8s/* $\to$ /home/ubuntu/k8s-deploy/</text>
        <text x="14" y="58" fill="#cbd5e1" font-size="11">• Apply ConfigMaps, PVC, &amp; Secrets</text>
        <text x="14" y="72" fill="#94a3b8" font-size="10">Dry-run secret creation if injecting env vars</text>
      </g>

      <g transform="translate(0, 195)">
        <rect x="0" y="0" width="320" height="100" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="24" fill="#34d399" font-size="12" font-weight="700">Step 3: Rolling Pod Replacement</text>
        <text x="14" y="42" fill="#cbd5e1" font-size="11">• kubectl set image deployment/api-deployment</text>
        <text x="14" y="58" fill="#cbd5e1" font-size="11">• kubectl set image deployment/frontend-deployment</text>
        <text x="14" y="74" fill="#cbd5e1" font-size="11">• Strategy: maxSurge: 1, maxUnavailable: 0</text>
        <text x="14" y="90" fill="#94a3b8" font-size="10">Zero downtime: Old pods terminate only when new pass probes</text>
      </g>

      <g transform="translate(0, 315)">
        <rect x="0" y="0" width="320" height="85" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
        <text x="14" y="24" fill="#34d399" font-size="12" font-weight="700">Step 4: Rollout Verification</text>
        <text x="14" y="42" fill="#cbd5e1" font-size="11">• kubectl rollout status (120s timeout)</text>
        <text x="14" y="58" fill="#cbd5e1" font-size="11">• Traefik updates dynamic ingress routes</text>
        <text x="14" y="74" fill="#cbd5e1" font-size="11">• Live at http://&lt;EC2_PUBLIC_IP&gt;</text>
      </g>

      <g transform="translate(0, 420)">
        <rect x="0" y="0" width="320" height="40" rx="6" fill="#047857"/>
        <text x="160" y="25" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">✓ Deployment Live &amp; Healthy</text>
      </g>
    </g>
  </g>
</svg>
`;

async function generate() {
  console.log('Generating updated diagrams...');
  
  const archSvgPath = path.join(outputDir, 'devops-architecture.svg');
  const cicdSvgPath = path.join(outputDir, 'cicd-pipeline.svg');

  fs.writeFileSync(archSvgPath, architectureSvg.trim());
  fs.writeFileSync(cicdSvgPath, cicdSvg.trim());
  console.log('Saved SVG files.');

  console.log('Rendering high-resolution PNG images (2560px) via sharp...');
  
  const archPngPath = path.join(outputDir, 'devops-architecture.png');
  const cicdPngPath = path.join(outputDir, 'cicd-pipeline.png');

  await sharp(Buffer.from(architectureSvg))
    .resize(2560)
    .png({ quality: 95 })
    .toFile(archPngPath);
  console.log('Generated PNG:', archPngPath);

  await sharp(Buffer.from(cicdSvg))
    .resize(2560)
    .png({ quality: 95 })
    .toFile(cicdPngPath);
  console.log('Generated PNG:', cicdPngPath);

  console.log('Done!');
}

generate().catch(err => {
  console.error('Error generating diagrams:', err);
  process.exit(1);
});
