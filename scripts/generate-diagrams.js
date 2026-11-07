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

function extract(comp) {
  const tree = comp({});
  let d = '';
  if (tree.props && tree.props.children) {
    const children = Array.isArray(tree.props.children) ? tree.props.children : [tree.props.children];
    for (const child of children) {
      if (child.props && child.props.d) d += ' ' + child.props.d;
    }
  }
  return {
    d: d.trim(),
    viewBox: tree.props?.attr?.viewBox || tree.props?.viewBox || '0 0 24 24'
  };
}

const ic = {
  github: extract(si.SiGithub),
  actions: extract(si.SiGithubactions),
  docker: extract(si.SiDocker),
  terraform: extract(si.SiTerraform),
  ansible: extract(si.SiAnsible),
  nginx: extract(si.SiNginx),
  node: extract(si.SiNodedotjs),
  react: extract(si.SiReact),
  vite: extract(si.SiVite),
  mongodb: extract(si.SiMongodb),
  prometheus: extract(si.SiPrometheus),
  grafana: extract(si.SiGrafana),
  linux: extract(si.SiLinux),
  ubuntu: extract(si.SiUbuntu),
  aws: extract(fa.FaAws),
  server: extract(fa.FaServer),
  database: extract(fa.FaDatabase),
  bell: extract(fa.FaBell),
  shield: extract(fa.FaShieldHalved),
  terminal: extract(fa.FaTerminal),
  memory: extract(fa.FaMemory),
  microchip: extract(fa.FaMicrochip),
  check: extract(fa.FaCheck)
};

function renderIcon(name, x, y, size, color) {
  const item = ic[name];
  if (!item) return '';
  return `
  <svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${item.viewBox}">
    <path d="${item.d}" fill="${color}"/>
  </svg>`;
}

// =============================================================================
// DIAGRAM 1: DevOps & Cloud Architecture (Logo-Centric, Minimal Text)
// =============================================================================
const architectureSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 820" width="100%" height="100%" style="background:#070b14; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a101d"/>
      <stop offset="50%" stop-color="#070b14"/>
      <stop offset="100%" stop-color="#04070d"/>
    </linearGradient>

    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>

    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#38bdf8" flood-opacity="0.5"/>
    </filter>
    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#34d399" flood-opacity="0.5"/>
    </filter>
    <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#fb923c" flood-opacity="0.5"/>
    </filter>
    <filter id="glowPurple" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#c084fc" flood-opacity="0.5"/>
    </filter>

    <marker id="arrCyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8"/>
    </marker>
    <marker id="arrPurple" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#a855f7"/>
    </marker>
    <marker id="arrGreen" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#34d399"/>
    </marker>
    <marker id="arrOrange" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#fb923c"/>
    </marker>
  </defs>

  <!-- Background Base -->
  <rect width="1440" height="820" fill="url(#bgGrad)"/>

  <!-- Subtle Blueprint Grid -->
  <g stroke="#1e293b" stroke-opacity="0.3" stroke-width="1">
    <line x1="0" y1="80" x2="1440" y2="80"/>
    <line x1="260" y1="80" x2="260" y2="820"/>
    <line x1="520" y1="80" x2="520" y2="820"/>
  </g>

  <!-- ==================== HEADER ==================== -->
  <g transform="translate(45, 22)">
    <text x="0" y="24" fill="url(#titleGrad)" font-size="24" font-weight="800" letter-spacing="-0.5">TaskFlow DevOps Architecture</text>
    <text x="0" y="44" fill="#94a3b8" font-size="12" font-weight="600">AWS Free Tier • Infrastructure as Code • Docker Compose • Nginx • Observability Suite</text>

    <!-- Top Technology Badges -->
    <g transform="translate(730, 6)">
      <rect x="0" y="0" width="115" height="28" rx="14" fill="#1e293b" stroke="#ff9900" stroke-width="1.2"/>
      ${renderIcon('aws', 10, 6, 16, '#ff9900')}
      <text x="65" y="18" fill="#ff9900" font-size="10" font-weight="700" text-anchor="middle">AWS FREE</text>

      <rect x="125" y="0" width="125" height="28" rx="14" fill="#1e293b" stroke="#2496ed" stroke-width="1.2"/>
      ${renderIcon('docker', 135, 6, 16, '#2496ed')}
      <text x="195" y="18" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">COMPOSE v2</text>

      <rect x="260" y="0" width="110" height="28" rx="14" fill="#1e293b" stroke="#009639" stroke-width="1.2"/>
      ${renderIcon('nginx', 270, 6, 16, '#009639')}
      <text x="325" y="18" fill="#4ade80" font-size="10" font-weight="700" text-anchor="middle">NGINX :80</text>

      <rect x="380" y="0" width="155" height="28" rx="14" fill="#1e293b" stroke="#e6522c" stroke-width="1.2"/>
      ${renderIcon('prometheus', 390, 6, 16, '#e6522c')}
      <text x="465" y="18" fill="#fb7185" font-size="10" font-weight="700" text-anchor="middle">OBSERVABILITY</text>
    </g>
  </g>

  <!-- ==================== COLUMN 1: CI/CD & REGISTRY ==================== -->
  <g transform="translate(45, 90)">
    <rect x="0" y="0" width="195" height="695" rx="16" fill="#0d1424" stroke="#6366f1" stroke-width="1.2" stroke-opacity="0.6" filter="url(#shadow)"/>
    <text x="97" y="32" fill="#818cf8" font-size="12" font-weight="800" text-anchor="middle" letter-spacing="1">1. CI/CD &amp; OCI</text>

    <!-- Card: GitHub -->
    <g transform="translate(16, 50)">
      <rect x="0" y="0" width="163" height="150" rx="14" fill="#131b2e" stroke="#334155" stroke-width="1.2"/>
      <circle cx="81" cy="52" r="32" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
      ${renderIcon('github', 57, 28, 48, '#ffffff')}
      <text x="81" y="108" fill="#f8fafc" font-size="14" font-weight="700" text-anchor="middle">GitHub</text>
      <rect x="31" y="120" width="100" height="20" rx="10" fill="#1e1b4b"/>
      <text x="81" y="134" fill="#a5b4fc" font-size="10" font-weight="700" text-anchor="middle">main / develop</text>
    </g>

    <!-- Arrow down -->
    <path d="M 97 205 L 97 235" stroke="#6366f1" stroke-width="2.5" marker-end="url(#arrPurple)"/>

    <!-- Card: GitHub Actions -->
    <g transform="translate(16, 240)">
      <rect x="0" y="0" width="163" height="160" rx="14" fill="#131b2e" stroke="#2088ff" stroke-width="1.5" filter="url(#glowCyan)"/>
      <circle cx="81" cy="52" r="32" fill="#082f49" stroke="#2088ff" stroke-width="1.5"/>
      ${renderIcon('actions', 57, 28, 48, '#2088ff')}
      <text x="81" y="108" fill="#f8fafc" font-size="13" font-weight="700" text-anchor="middle">GitHub Actions</text>
      <rect x="26" y="124" width="110" height="20" rx="10" fill="#0c4a6e"/>
      <text x="81" y="138" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">Buildx &amp; Verify</text>
    </g>

    <!-- Arrow down -->
    <path d="M 97 405 L 97 435" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrCyan)"/>

    <!-- Card: GHCR -->
    <g transform="translate(16, 440)">
      <rect x="0" y="0" width="163" height="160" rx="14" fill="#131b2e" stroke="#0284c7" stroke-width="1.2"/>
      <circle cx="81" cy="52" r="32" fill="#0c4a6e" stroke="#0284c7" stroke-width="1.5"/>
      ${renderIcon('docker', 57, 28, 48, '#2496ed')}
      <text x="81" y="108" fill="#f8fafc" font-size="14" font-weight="700" text-anchor="middle">GHCR Registry</text>
      <rect x="26" y="124" width="110" height="20" rx="10" fill="#082f49"/>
      <text x="81" y="138" fill="#7dd3fc" font-size="10" font-family="monospace" text-anchor="middle">ghcr.io Images</text>
    </g>

    <!-- Arrow down to SSM dispatch -->
    <path d="M 97 605 L 97 625" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrGreen)"/>

    <!-- Mini Card: SSM Dispatch -->
    <g transform="translate(16, 630)">
      <rect x="0" y="0" width="163" height="48" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.2"/>
      ${renderIcon('terminal', 12, 12, 24, '#34d399')}
      <text x="44" y="24" fill="#34d399" font-size="11" font-weight="800">AWS SSM</text>
      <text x="44" y="38" fill="#a7f3d0" font-size="9" font-weight="600">Zero-Touch CD</text>
    </g>
  </g>

  <!-- ==================== COLUMN 2: IaC & CONFIGURATION ==================== -->
  <g transform="translate(265, 90)">
    <rect x="0" y="0" width="195" height="695" rx="16" fill="#0d1424" stroke="#a855f7" stroke-width="1.2" stroke-opacity="0.6" filter="url(#shadow)"/>
    <text x="97" y="32" fill="#c084fc" font-size="12" font-weight="800" text-anchor="middle" letter-spacing="1">2. IaC &amp; CONFIG</text>

    <!-- Card: Terraform -->
    <g transform="translate(16, 50)">
      <rect x="0" y="0" width="163" height="180" rx="14" fill="#131b2e" stroke="#844fba" stroke-width="1.5" filter="url(#glowPurple)"/>
      <circle cx="81" cy="55" r="34" fill="#2e1065" stroke="#844fba" stroke-width="1.5"/>
      ${renderIcon('terraform', 56, 30, 50, '#844fba')}
      <text x="81" y="115" fill="#f8fafc" font-size="14" font-weight="700" text-anchor="middle">Terraform</text>
      <rect x="21" y="130" width="120" height="20" rx="10" fill="#3b0764"/>
      <text x="81" y="144" fill="#d8b4fe" font-size="10" font-weight="700" text-anchor="middle">VPC &amp; Security Group</text>
      <rect x="31" y="152" width="100" height="16" rx="8" fill="#1e1b4b"/>
      <text x="81" y="164" fill="#a855f7" font-size="9" font-weight="700" text-anchor="middle">Elastic IP &amp; EC2</text>
    </g>

    <!-- Arrow down -->
    <path d="M 97 235 L 97 265" stroke="#a855f7" stroke-width="2.5" marker-end="url(#arrPurple)"/>

    <!-- Card: Ansible -->
    <g transform="translate(16, 270)">
      <rect x="0" y="0" width="163" height="180" rx="14" fill="#131b2e" stroke="#ee0000" stroke-width="1.2"/>
      <circle cx="81" cy="55" r="34" fill="#450a0a" stroke="#ee0000" stroke-width="1.5"/>
      ${renderIcon('ansible', 56, 30, 50, '#ee0000')}
      <text x="81" y="115" fill="#f8fafc" font-size="14" font-weight="700" text-anchor="middle">Ansible</text>
      <rect x="21" y="130" width="120" height="20" rx="10" fill="#450a0a"/>
      <text x="81" y="144" fill="#fca5a5" font-size="10" font-weight="700" text-anchor="middle">Roles: common / docker</text>
      <rect x="26" y="152" width="110" height="16" rx="8" fill="#1e1b4b"/>
      <text x="81" y="164" fill="#ef4444" font-size="9" font-weight="700" text-anchor="middle">Host Hardening</text>
    </g>

    <!-- Arrow down -->
    <path d="M 97 455 L 97 485" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrOrange)"/>

    <!-- Card: Cloud-Init & Memory Guard -->
    <g transform="translate(16, 490)">
      <rect x="0" y="0" width="163" height="190" rx="14" fill="#131b2e" stroke="#f59e0b" stroke-width="1.2"/>
      <circle cx="81" cy="55" r="34" fill="#451a03" stroke="#f59e0b" stroke-width="1.5"/>
      ${renderIcon('memory', 56, 30, 50, '#fbbf24')}
      <text x="81" y="115" fill="#f8fafc" font-size="14" font-weight="700" text-anchor="middle">Memory Guard</text>
      <rect x="21" y="130" width="120" height="22" rx="11" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
      <text x="81" y="145" fill="#34d399" font-size="10" font-weight="800" text-anchor="middle">2 GB SWAP FILE</text>
      <rect x="26" y="156" width="110" height="18" rx="9" fill="#1e293b"/>
      <text x="81" y="169" fill="#cbd5e1" font-size="9.5" font-weight="600" text-anchor="middle">vm.swappiness = 10</text>
    </g>
  </g>

  <!-- ==================== COLUMN 3: AWS CLOUD HOST (RIGHT) ==================== -->
  <g transform="translate(485, 90)">
    <!-- Cloud Outer Border -->
    <rect x="0" y="0" width="910" height="695" rx="18" fill="#0a0f1d" stroke="#ff9900" stroke-width="1.5" filter="url(#shadow)"/>

    <!-- Host Header Banner -->
    <g transform="translate(24, 18)">
      ${renderIcon('aws', 0, -2, 28, '#ff9900')}
      <text x="40" y="18" fill="#ff9900" font-size="15" font-weight="800">AWS CLOUD (us-east-1) • EC2 t3.micro</text>

      ${renderIcon('ubuntu', 350, 0, 20, '#e95420')}
      <text x="375" y="15" fill="#cbd5e1" font-size="12" font-weight="600">Ubuntu 24.04 LTS (1 GB RAM • 2 vCPUs • 25 GB gp3)</text>

      <rect x="730" y="-3" width="135" height="26" rx="13" fill="#1e293b" stroke="#34d399" stroke-width="1"/>
      <text x="797" y="14" fill="#34d399" font-size="10" font-weight="700" text-anchor="middle">STATIC ELASTIC IP</text>
    </g>

    <!-- Public Traffic Entrance & Nginx Box -->
    <g transform="translate(24, 55)">
      <!-- Nginx Card (Frontline Gateway) -->
      <rect x="0" y="0" width="862" height="110" rx="14" fill="#0d1929" stroke="#009639" stroke-width="1.5" filter="url(#glowGreen)"/>
      <circle cx="65" cy="55" r="36" fill="#064e3b" stroke="#009639" stroke-width="2"/>
      ${renderIcon('nginx', 39, 29, 52, '#009639')}

      <text x="120" y="45" fill="#f8fafc" font-size="18" font-weight="800">Nginx Reverse Proxy &amp; Web Server</text>
      <text x="120" y="68" fill="#4ade80" font-size="12" font-weight="600">Port :80 • Gzip Compression • Client Asset Cache • SPA HTML5 Fallback</text>

      <g transform="translate(640, 32)">
        <rect x="0" y="0" width="200" height="46" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2"/>
        <text x="100" y="20" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">Reverse Proxy Target:</text>
        <text x="100" y="36" fill="#ffffff" font-size="11" font-family="monospace" text-anchor="middle">/api/*  &amp;  /uploads/*</text>
      </g>
    </g>

    <!-- Downward Route Arrows from Nginx to App Containers -->
    <path d="M 230 165 L 230 200" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arrCyan)"/>
    <path d="M 455 165 L 455 200" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arrCyan)"/>

    <!-- ================= INNER DOCKER NETWORK: APP CONTAINERS ================= -->
    <g transform="translate(24, 205)">
      <rect x="0" y="0" width="862" height="215" rx="14" fill="#0f172a" stroke="#2563eb" stroke-width="1.2"/>
      <text x="20" y="24" fill="#60a5fa" font-size="11" font-weight="800" letter-spacing="1">APPLICATION STACK (Docker Bridge: taskflow-network)</text>

      <!-- Container: React Frontend -->
      <g transform="translate(20, 40)">
        <rect x="0" y="0" width="255" height="155" rx="12" fill="#131e36" stroke="#38bdf8" stroke-width="1.2"/>
        <circle cx="55" cy="50" r="30" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.5"/>
        ${renderIcon('react', 32, 27, 46, '#61dafb')}
        <text x="100" y="44" fill="#f8fafc" font-size="15" font-weight="700">Frontend</text>
        <text x="100" y="62" fill="#38bdf8" font-size="11" font-weight="600">React 19 SPA</text>
        <rect x="20" y="95" width="215" height="24" rx="6" fill="#0f172a"/>
        <text x="127" y="111" fill="#cbd5e1" font-size="10" font-weight="600" text-anchor="middle">Vite Production Bundle</text>
        <rect x="20" y="123" width="215" height="22" rx="6" fill="#064e3b"/>
        <text x="127" y="138" fill="#34d399" font-size="10" font-weight="700" text-anchor="middle">Served via Nginx Alpine</text>
      </g>

      <!-- Container: Node.js API -->
      <g transform="translate(300, 40)">
        <rect x="0" y="0" width="260" height="155" rx="12" fill="#131e36" stroke="#22c55e" stroke-width="1.5" filter="url(#glowGreen)"/>
        <circle cx="55" cy="50" r="30" fill="#064e3b" stroke="#22c55e" stroke-width="1.5"/>
        ${renderIcon('node', 32, 27, 46, '#22c55e')}
        <text x="100" y="44" fill="#f8fafc" font-size="15" font-weight="700">Backend API</text>
        <text x="100" y="62" fill="#4ade80" font-size="11" font-weight="600">Node 22 Express (:5000)</text>
        <rect x="20" y="95" width="220" height="24" rx="6" fill="#0f172a"/>
        <text x="130" y="111" fill="#38bdf8" font-size="10" font-family="monospace" text-anchor="middle">/metrics (prom-client)</text>
        <rect x="20" y="123" width="220" height="22" rx="6" fill="#1e293b"/>
        <text x="130" y="138" fill="#34d399" font-size="10" font-family="monospace" text-anchor="middle">/api/health (Probes)</text>
      </g>

      <!-- Arrow from API to DB -->
      <path d="M 565 115 L 590 115" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrGreen)"/>

      <!-- Container: MongoDB -->
      <g transform="translate(595, 40)">
        <rect x="0" y="0" width="245" height="155" rx="12" fill="#131e36" stroke="#10b981" stroke-width="1.2"/>
        <circle cx="55" cy="50" r="30" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
        ${renderIcon('mongodb', 32, 27, 46, '#10b981')}
        <text x="100" y="44" fill="#f8fafc" font-size="15" font-weight="700">MongoDB</text>
        <text x="100" y="62" fill="#34d399" font-size="11" font-weight="600">Engine 6.0 (:27017)</text>
        <rect x="20" y="95" width="205" height="24" rx="6" fill="#0f172a"/>
        <text x="122" y="111" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">Volume: mongo-data</text>
        <rect x="20" y="123" width="205" height="22" rx="6" fill="#1e293b"/>
        <text x="122" y="138" fill="#a7f3d0" font-size="10" font-weight="600" text-anchor="middle">Isolated Internal DB</text>
      </g>
    </g>

    <!-- ================= OBSERVABILITY CLUSTER (BOTTOM) ================= -->
    <g transform="translate(24, 440)">
      <rect x="0" y="0" width="862" height="230" rx="14" fill="#0f172a" stroke="#e11d48" stroke-width="1.2"/>
      <text x="20" y="24" fill="#fb7185" font-size="11" font-weight="800" letter-spacing="1">OBSERVABILITY SUITE (Prometheus • Grafana • Exporters)</text>

      <!-- Node Exporter -->
      <g transform="translate(20, 42)">
        <rect x="0" y="0" width="190" height="165" rx="12" fill="#141c2e" stroke="#3b82f6" stroke-width="1.2"/>
        <circle cx="45" cy="45" r="26" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5"/>
        ${renderIcon('linux', 26, 26, 38, '#60a5fa')}
        <text x="82" y="42" fill="#f8fafc" font-size="12" font-weight="700">Node Exporter</text>
        <text x="82" y="58" fill="#38bdf8" font-size="10" font-weight="600">Port :9100</text>
        <rect x="15" y="85" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="95" y="104" fill="#cbd5e1" font-size="10" font-weight="600" text-anchor="middle">Host CPU &amp; RAM</text>
        <rect x="15" y="122" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="95" y="141" fill="#a5b4fc" font-size="10" font-weight="600" text-anchor="middle">Disk &amp; Network I/O</text>
      </g>

      <!-- cAdvisor -->
      <g transform="translate(225, 42)">
        <rect x="0" y="0" width="190" height="165" rx="12" fill="#141c2e" stroke="#8b5cf6" stroke-width="1.2"/>
        <circle cx="45" cy="45" r="26" fill="#2e1065" stroke="#8b5cf6" stroke-width="1.5"/>
        ${renderIcon('docker', 26, 26, 38, '#c084fc')}
        <text x="82" y="42" fill="#f8fafc" font-size="13" font-weight="700">cAdvisor</text>
        <text x="82" y="58" fill="#c084fc" font-size="10" font-weight="600">Port :8080</text>
        <rect x="15" y="85" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="95" y="104" fill="#cbd5e1" font-size="10" font-weight="600" text-anchor="middle">Container CPU &amp; RAM</text>
        <rect x="15" y="122" width="160" height="30" rx="6" fill="#0f172a"/>
        <text x="95" y="141" fill="#d8b4fe" font-size="10" font-weight="600" text-anchor="middle">Docker Socket Read</text>
      </g>

      <!-- Arrow to Prometheus -->
      <path d="M 420 120 L 440 120" stroke="#e6522c" stroke-width="2.5" marker-end="url(#arrOrange)"/>

      <!-- Prometheus -->
      <g transform="translate(445, 42)">
        <rect x="0" y="0" width="200" height="165" rx="12" fill="#141c2e" stroke="#e6522c" stroke-width="1.5" filter="url(#glowOrange)"/>
        <circle cx="45" cy="45" r="26" fill="#431407" stroke="#e6522c" stroke-width="1.5"/>
        ${renderIcon('prometheus', 26, 26, 38, '#e6522c')}
        <text x="82" y="42" fill="#f8fafc" font-size="13" font-weight="700">Prometheus</text>
        <text x="82" y="58" fill="#ea580c" font-size="10" font-weight="600">TSDB (:9090)</text>
        <rect x="15" y="85" width="170" height="30" rx="6" fill="#0f172a"/>
        <text x="100" y="104" fill="#fed7aa" font-size="10" font-weight="600" text-anchor="middle">15s Scrape • 7d TSDB</text>
        <rect x="15" y="122" width="170" height="30" rx="6" fill="#450a0a" stroke="#dc2626" stroke-width="1"/>
        <text x="100" y="141" fill="#fca5a5" font-size="10" font-weight="700" text-anchor="middle">Active Alert Rules</text>
      </g>

      <!-- Arrow to Grafana -->
      <path d="M 650 120 L 670 120" stroke="#f46800" stroke-width="2.5" marker-end="url(#arrOrange)"/>

      <!-- Grafana -->
      <g transform="translate(675, 42)">
        <rect x="0" y="0" width="168" height="165" rx="12" fill="#141c2e" stroke="#f46800" stroke-width="1.5"/>
        <circle cx="45" cy="45" r="26" fill="#431407" stroke="#f46800" stroke-width="1.5"/>
        ${renderIcon('grafana', 26, 26, 38, '#f46800')}
        <text x="80" y="42" fill="#f8fafc" font-size="14" font-weight="700">Grafana</text>
        <text x="80" y="58" fill="#fb923c" font-size="10" font-weight="600">Port :3000</text>
        <rect x="12" y="85" width="144" height="30" rx="6" fill="#0f172a"/>
        <text x="84" y="104" fill="#fed7aa" font-size="10" font-weight="600" text-anchor="middle">Auto Dashboards</text>
        <rect x="12" y="122" width="144" height="30" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
        <text x="84" y="141" fill="#34d399" font-size="10" font-weight="700" text-anchor="middle">SSH Tunnel Only</text>
      </g>
    </g>
  </g>
</svg>
`;

// =============================================================================
// DIAGRAM 2: Continuous Integration & Deployment (CI/CD) - Logo-Centric
// =============================================================================
const cicdSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 780" width="100%" height="100%" style="background:#070b14; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a101d"/>
      <stop offset="50%" stop-color="#070b14"/>
      <stop offset="100%" stop-color="#04070d"/>
    </linearGradient>

    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>

    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#38bdf8" flood-opacity="0.5"/>
    </filter>
    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#34d399" flood-opacity="0.5"/>
    </filter>

    <marker id="arrCyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8"/>
    </marker>
    <marker id="arrGreen" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#34d399"/>
    </marker>
  </defs>

  <rect width="1440" height="780" fill="url(#bgGrad)"/>

  <!-- ==================== HEADER ==================== -->
  <g transform="translate(45, 24)">
    <text x="0" y="24" fill="url(#titleGrad)" font-size="25" font-weight="800" letter-spacing="-0.5">TaskFlow CI/CD Pipeline</text>
    <text x="0" y="46" fill="#94a3b8" font-size="13" font-weight="600">3-Stage Automated Workflow: Verification • Docker Buildx &amp; GHCR • Zero-Touch AWS SSM Rollout</text>

    <!-- Badges -->
    <g transform="translate(860, 4)">
      <rect x="0" y="0" width="130" height="28" rx="14" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2"/>
      ${renderIcon('actions', 10, 6, 16, '#38bdf8')}
      <text x="70" y="18" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">GITHUB ACTIONS</text>

      <rect x="140" y="0" width="120" height="28" rx="14" fill="#1e293b" stroke="#34d399" stroke-width="1.2"/>
      ${renderIcon('check', 150, 6, 16, '#34d399')}
      <text x="200" y="18" fill="#34d399" font-size="10" font-weight="700" text-anchor="middle">ZERO-TOUCH</text>
    </g>
  </g>

  <!-- ==================== STAGE 1: VERIFY & TEST ==================== -->
  <g transform="translate(45, 95)">
    <rect x="0" y="0" width="415" height="655" rx="16" fill="#0d1424" stroke="#6366f1" stroke-width="1.2" filter="url(#shadow)"/>
    
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="80" height="24" rx="12" fill="#4338ca"/>
      <text x="40" y="16" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">STAGE 1</text>
      <text x="95" y="17" fill="#f8fafc" font-size="16" font-weight="800">Verification &amp; Test</text>
    </g>

    <!-- Big Logo 1: GitHub -->
    <g transform="translate(25, 70)">
      <rect x="0" y="0" width="365" height="150" rx="14" fill="#131b2e" stroke="#334155" stroke-width="1.2"/>
      <circle cx="65" cy="75" r="42" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
      ${renderIcon('github', 35, 45, 60, '#ffffff')}
      <text x="135" y="65" fill="#f8fafc" font-size="18" font-weight="800">GitHub Event</text>
      <text x="135" y="88" fill="#818cf8" font-size="12" font-weight="600">push: [main, develop]</text>
      <rect x="135" y="100" width="115" height="22" rx="11" fill="#1e1b4b"/>
      <text x="192" y="115" fill="#a5b4fc" font-size="10" font-weight="700" text-anchor="middle">pull_request :main</text>
    </g>

    <path d="M 207 225 L 207 255" stroke="#6366f1" stroke-width="2.5" marker-end="url(#arrCyan)"/>

    <!-- Big Logo 2: Node.js Backend Verification -->
    <g transform="translate(25, 260)">
      <rect x="0" y="0" width="365" height="150" rx="14" fill="#131b2e" stroke="#22c55e" stroke-width="1.2"/>
      <circle cx="65" cy="75" r="42" fill="#064e3b" stroke="#22c55e" stroke-width="1.5"/>
      ${renderIcon('node', 35, 45, 60, '#22c55e')}
      <text x="135" y="62" fill="#f8fafc" font-size="17" font-weight="800">Backend Check</text>
      <text x="135" y="84" fill="#4ade80" font-size="12" font-weight="600">Node.js 22 LTS</text>
      <g transform="translate(135, 98)">
        <rect x="0" y="0" width="95" height="22" rx="6" fill="#0f172a"/>
        <text x="47" y="15" fill="#cbd5e1" font-size="10" font-weight="700" text-anchor="middle">npm ci cache</text>
        <rect x="105" y="0" width="110" height="22" rx="6" fill="#0f172a"/>
        <text x="160" y="15" fill="#34d399" font-size="10" font-weight="700" text-anchor="middle">Lock Integrity</text>
      </g>
    </g>

    <path d="M 207 415 L 207 445" stroke="#6366f1" stroke-width="2.5" marker-end="url(#arrCyan)"/>

    <!-- Big Logo 3: React & Vite Frontend Verification -->
    <g transform="translate(25, 450)">
      <rect x="0" y="0" width="365" height="175" rx="14" fill="#131b2e" stroke="#38bdf8" stroke-width="1.2"/>
      <circle cx="65" cy="85" r="42" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.5"/>
      ${renderIcon('react', 35, 55, 60, '#61dafb')}
      <text x="135" y="68" fill="#f8fafc" font-size="17" font-weight="800">Frontend Check</text>
      <text x="135" y="90" fill="#38bdf8" font-size="12" font-weight="600">React 19 &amp; Vite</text>
      <g transform="translate(135, 105)">
        <rect x="0" y="0" width="95" height="22" rx="6" fill="#0f172a"/>
        <text x="47" y="15" fill="#a5b4fc" font-size="10" font-weight="700" text-anchor="middle">npm run lint</text>
        <rect x="105" y="0" width="110" height="22" rx="6" fill="#064e3b"/>
        <text x="160" y="15" fill="#34d399" font-size="10" font-weight="700" text-anchor="middle">Vite Production</text>
      </g>
      <rect x="25" y="140" width="315" height="22" rx="11" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
      <text x="182" y="155" fill="#34d399" font-size="10" font-weight="800" text-anchor="middle">QUALITY GATE PASSED</text>
    </g>
  </g>

  <!-- Big Stage Flow Arrow 1 -> 2 -->
  <path d="M 465 422 L 500 422" stroke="#0ea5e9" stroke-width="3" marker-end="url(#arrCyan)"/>

  <!-- ==================== STAGE 2: BUILD & PUSH ==================== -->
  <g transform="translate(510, 95)">
    <rect x="0" y="0" width="415" height="655" rx="16" fill="#0d1424" stroke="#0284c7" stroke-width="1.2" filter="url(#shadow)"/>
    
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="80" height="24" rx="12" fill="#0369a1"/>
      <text x="40" y="16" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">STAGE 2</text>
      <text x="95" y="17" fill="#f8fafc" font-size="16" font-weight="800">Docker Buildx &amp; GHCR</text>
    </g>

    <!-- Big Logo: Docker Buildx -->
    <g transform="translate(25, 70)">
      <rect x="0" y="0" width="365" height="150" rx="14" fill="#131b2e" stroke="#0284c7" stroke-width="1.5" filter="url(#glowCyan)"/>
      <circle cx="65" cy="75" r="42" fill="#0c4a6e" stroke="#0284c7" stroke-width="1.5"/>
      ${renderIcon('docker', 35, 45, 60, '#2496ed')}
      <text x="135" y="65" fill="#f8fafc" font-size="18" font-weight="800">Docker Buildx</text>
      <text x="135" y="88" fill="#38bdf8" font-size="12" font-weight="600">Multi-Stage Compiles</text>
      <rect x="135" y="102" width="160" height="22" rx="11" fill="#082f49"/>
      <text x="215" y="117" fill="#7dd3fc" font-size="10" font-weight="700" text-anchor="middle">GHA Layer Caching (max)</text>
    </g>

    <path d="M 207 225 L 207 255" stroke="#0ea5e9" stroke-width="2.5" marker-end="url(#arrCyan)"/>

    <!-- 2 Parallel Target Images -->
    <g transform="translate(25, 260)">
      <rect x="0" y="0" width="365" height="185" rx="14" fill="#131b2e" stroke="#334155" stroke-width="1.2"/>
      
      <!-- Server Image -->
      <g transform="translate(15, 18)">
        <circle cx="30" cy="30" r="24" fill="#064e3b" stroke="#22c55e" stroke-width="1.5"/>
        ${renderIcon('node', 14, 14, 32, '#22c55e')}
        <text x="68" y="26" fill="#f8fafc" font-size="14" font-weight="700">taskflow-server</text>
        <text x="68" y="44" fill="#7dd3fc" font-size="11" font-family="monospace">:latest • :sha_short</text>
      </g>

      <line x1="15" y1="92" x2="350" y2="92" stroke="#334155" stroke-width="1"/>

      <!-- Client Image -->
      <g transform="translate(15, 108)">
        <circle cx="30" cy="30" r="24" fill="#064e3b" stroke="#009639" stroke-width="1.5"/>
        ${renderIcon('nginx', 14, 14, 32, '#009639')}
        <text x="68" y="26" fill="#f8fafc" font-size="14" font-weight="700">taskflow-client</text>
        <text x="68" y="44" fill="#7dd3fc" font-size="11" font-family="monospace">:latest • :sha_short</text>
      </g>
    </g>

    <path d="M 207 450 L 207 480" stroke="#0ea5e9" stroke-width="2.5" marker-end="url(#arrCyan)"/>

    <!-- GHCR Output Box -->
    <g transform="translate(25, 485)">
      <rect x="0" y="0" width="365" height="140" rx="14" fill="#131b2e" stroke="#10b981" stroke-width="1.2"/>
      <circle cx="65" cy="70" r="38" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
      ${renderIcon('docker', 37, 42, 56, '#34d399')}
      <text x="135" y="62" fill="#f8fafc" font-size="17" font-weight="800">GHCR Registry</text>
      <text x="135" y="84" fill="#34d399" font-size="11" font-family="monospace">ghcr.io/thilinagamage001</text>
      <rect x="135" y="96" width="130" height="22" rx="11" fill="#064e3b"/>
      <text x="200" y="111" fill="#a7f3d0" font-size="10" font-weight="800" text-anchor="middle">OCI IMAGES READY</text>
    </g>
  </g>

  <!-- Big Stage Flow Arrow 2 -> 3 -->
  <path d="M 930 422 L 965 422" stroke="#10b981" stroke-width="3" marker-end="url(#arrGreen)"/>

  <!-- ==================== STAGE 3: ZERO-TOUCH DEPLOYMENT ==================== -->
  <g transform="translate(980, 95)">
    <rect x="0" y="0" width="415" height="655" rx="16" fill="#0d1424" stroke="#10b981" stroke-width="1.2" filter="url(#shadow)"/>
    
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="80" height="24" rx="12" fill="#047857"/>
      <text x="40" y="16" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">STAGE 3</text>
      <text x="95" y="17" fill="#f8fafc" font-size="16" font-weight="800">Zero-Touch CD (AWS)</text>
    </g>

    <!-- Big Logo 1: AWS Systems Manager -->
    <g transform="translate(25, 70)">
      <rect x="0" y="0" width="365" height="150" rx="14" fill="#131b2e" stroke="#ff9900" stroke-width="1.5"/>
      <circle cx="65" cy="75" r="42" fill="#451a03" stroke="#ff9900" stroke-width="1.5"/>
      ${renderIcon('aws', 35, 45, 60, '#ff9900')}
      <text x="135" y="65" fill="#f8fafc" font-size="17" font-weight="800">AWS SSM</text>
      <text x="135" y="88" fill="#fbbf24" font-size="12" font-weight="600">RunShellScript Document</text>
      <rect x="135" y="102" width="180" height="22" rx="11" fill="#451a03"/>
      <text x="225" y="117" fill="#fde68a" font-size="10" font-weight="700" text-anchor="middle">Target: tag:Project=taskflow</text>
    </g>

    <path d="M 207 225 L 207 255" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrGreen)"/>

    <!-- Big Logo 2: Docker Compose Rollout -->
    <g transform="translate(25, 260)">
      <rect x="0" y="0" width="365" height="150" rx="14" fill="#131b2e" stroke="#2496ed" stroke-width="1.2"/>
      <circle cx="65" cy="75" r="42" fill="#0c4a6e" stroke="#2496ed" stroke-width="1.5"/>
      ${renderIcon('docker', 35, 45, 60, '#2496ed')}
      <text x="135" y="65" fill="#f8fafc" font-size="17" font-weight="800">Docker Compose</text>
      <text x="135" y="88" fill="#38bdf8" font-size="12" font-weight="600">Rolling Service Pull &amp; Up</text>
      <rect x="135" y="102" width="160" height="22" rx="11" fill="#082f49"/>
      <text x="215" y="117" fill="#7dd3fc" font-size="10" font-weight="700" text-anchor="middle">--remove-orphans &amp; prune</text>
    </g>

    <path d="M 207 415 L 207 445" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrGreen)"/>

    <!-- Big Logo 3: Health Probe Checkmark -->
    <g transform="translate(25, 450)">
      <rect x="0" y="0" width="365" height="175" rx="14" fill="#131b2e" stroke="#10b981" stroke-width="1.5" filter="url(#glowGreen)"/>
      <circle cx="65" cy="85" r="42" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
      ${renderIcon('check', 37, 57, 56, '#34d399')}
      <text x="135" y="68" fill="#f8fafc" font-size="18" font-weight="800">Health Probed</text>
      <text x="135" y="90" fill="#34d399" font-size="12" font-family="monospace">curl http://localhost/api/health</text>
      <rect x="135" y="102" width="170" height="22" rx="11" fill="#064e3b"/>
      <text x="220" y="117" fill="#a7f3d0" font-size="10" font-weight="800" text-anchor="middle">HTTP 200 OK VERIFIED</text>
      
      <rect x="25" y="140" width="315" height="22" rx="11" fill="#065f46"/>
      <text x="182" y="155" fill="#ffffff" font-size="10" font-weight="800" text-anchor="middle">✓ ZERO-DOWNTIME LIVE DEPLOYMENT</text>
    </g>
  </g>
</svg>
`;

// =============================================================================
// DIAGRAM 3: Full-Stack Observability & Monitoring - Logo-Centric
// =============================================================================
const observabilitySvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 780" width="100%" height="100%" style="background:#070b14; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a101d"/>
      <stop offset="50%" stop-color="#070b14"/>
      <stop offset="100%" stop-color="#04070d"/>
    </linearGradient>

    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fb7185"/>
      <stop offset="50%" stop-color="#f46800"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>

    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ea580c" flood-opacity="0.5"/>
    </filter>
    <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ef4444" flood-opacity="0.5"/>
    </filter>

    <marker id="arrRed" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444"/>
    </marker>
    <marker id="arrOrange" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f46800"/>
    </marker>
  </defs>

  <rect width="1440" height="780" fill="url(#bgGrad)"/>

  <!-- ==================== HEADER ==================== -->
  <g transform="translate(45, 24)">
    <text x="0" y="24" fill="url(#titleGrad)" font-size="25" font-weight="800" letter-spacing="-0.5">TaskFlow Observability &amp; Monitoring</text>
    <text x="0" y="46" fill="#94a3b8" font-size="13" font-weight="600">Telemetry Pipeline: Exporters • Prometheus TSDB &amp; Rules • Grafana Analytics &amp; SRE</text>

    <!-- Top Badges -->
    <g transform="translate(860, 4)">
      <rect x="0" y="0" width="135" height="28" rx="14" fill="#1e293b" stroke="#e6522c" stroke-width="1.2"/>
      ${renderIcon('prometheus', 10, 6, 16, '#e6522c')}
      <text x="75" y="18" fill="#ff7849" font-size="10" font-weight="700" text-anchor="middle">PROMETHEUS</text>

      <rect x="145" y="0" width="125" height="28" rx="14" fill="#1e293b" stroke="#f46800" stroke-width="1.2"/>
      ${renderIcon('grafana', 155, 6, 16, '#f46800')}
      <text x="210" y="18" fill="#fb923c" font-size="10" font-weight="700" text-anchor="middle">GRAFANA</text>
    </g>
  </g>

  <!-- ==================== COLUMN 1: EXPORTERS & SOURCES ==================== -->
  <g transform="translate(45, 95)">
    <rect x="0" y="0" width="415" height="655" rx="16" fill="#0d1424" stroke="#6366f1" stroke-width="1.2" filter="url(#shadow)"/>
    
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="85" height="24" rx="12" fill="#4338ca"/>
      <text x="42" y="16" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">SOURCES</text>
      <text x="100" y="17" fill="#f8fafc" font-size="16" font-weight="800">Metrics Exporters</text>
    </g>

    <!-- Source 1: Node Exporter -->
    <g transform="translate(25, 70)">
      <rect x="0" y="0" width="365" height="160" rx="14" fill="#131b2e" stroke="#3b82f6" stroke-width="1.2"/>
      <circle cx="65" cy="80" r="42" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5"/>
      ${renderIcon('linux', 35, 50, 60, '#60a5fa')}
      <text x="135" y="65" fill="#f8fafc" font-size="18" font-weight="800">Node Exporter</text>
      <text x="135" y="88" fill="#38bdf8" font-size="12" font-weight="600">Host OS &amp; Hardware (:9100)</text>
      <g transform="translate(135, 102)">
        <rect x="0" y="0" width="85" height="22" rx="6" fill="#0f172a"/>
        <text x="42" y="15" fill="#cbd5e1" font-size="10" font-weight="700" text-anchor="middle">CPU &amp; RAM</text>
        <rect x="95" y="0" width="100" height="22" rx="6" fill="#0f172a"/>
        <text x="145" y="15" fill="#cbd5e1" font-size="10" font-weight="700" text-anchor="middle">Disk &amp; Network</text>
      </g>
    </g>

    <!-- Source 2: cAdvisor -->
    <g transform="translate(25, 255)">
      <rect x="0" y="0" width="365" height="160" rx="14" fill="#131b2e" stroke="#8b5cf6" stroke-width="1.2"/>
      <circle cx="65" cy="80" r="42" fill="#2e1065" stroke="#8b5cf6" stroke-width="1.5"/>
      ${renderIcon('docker', 35, 50, 60, '#c084fc')}
      <text x="135" y="65" fill="#f8fafc" font-size="18" font-weight="800">cAdvisor</text>
      <text x="135" y="88" fill="#c084fc" font-size="12" font-weight="600">Container Telemetry (:8080)</text>
      <g transform="translate(135, 102)">
        <rect x="0" y="0" width="105" height="22" rx="6" fill="#0f172a"/>
        <text x="52" y="15" fill="#cbd5e1" font-size="10" font-weight="700" text-anchor="middle">Container CPU</text>
        <rect x="115" y="0" width="95" height="22" rx="6" fill="#0f172a"/>
        <text x="162" y="15" fill="#cbd5e1" font-size="10" font-weight="700" text-anchor="middle">Memory Limits</text>
      </g>
    </g>

    <!-- Source 3: Node.js Express App Metrics -->
    <g transform="translate(25, 440)">
      <rect x="0" y="0" width="365" height="185" rx="14" fill="#131b2e" stroke="#22c55e" stroke-width="1.2"/>
      <circle cx="65" cy="90" r="42" fill="#064e3b" stroke="#22c55e" stroke-width="1.5"/>
      ${renderIcon('node', 35, 60, 60, '#22c55e')}
      <text x="135" y="70" fill="#f8fafc" font-size="18" font-weight="800">Express API</text>
      <text x="135" y="92" fill="#4ade80" font-size="12" font-weight="600">prom-client (:5000/metrics)</text>
      <g transform="translate(135, 108)">
        <rect x="0" y="0" width="115" height="22" rx="6" fill="#0f172a"/>
        <text x="57" y="15" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">Request Duration</text>
        <rect x="125" y="0" width="85" height="22" rx="6" fill="#0f172a"/>
        <text x="167" y="15" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">Status Codes</text>
      </g>
      <rect x="25" y="148" width="315" height="22" rx="11" fill="#064e3b"/>
      <text x="182" y="163" fill="#34d399" font-size="10" font-weight="700" text-anchor="middle">HEALTH PROBE: /api/health</text>
    </g>
  </g>

  <!-- Big Flow Arrow 1 -> 2 -->
  <path d="M 465 422 L 500 422" stroke="#ea580c" stroke-width="3" marker-end="url(#arrOrange)"/>

  <!-- ==================== COLUMN 2: PROMETHEUS & ALERTS ==================== -->
  <g transform="translate(510, 95)">
    <rect x="0" y="0" width="415" height="655" rx="16" fill="#0d1424" stroke="#e6522c" stroke-width="1.2" filter="url(#shadow)"/>
    
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="75" height="24" rx="12" fill="#c2410c"/>
      <text x="37" y="16" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">ENGINE</text>
      <text x="90" y="17" fill="#f8fafc" font-size="16" font-weight="800">Prometheus TSDB</text>
    </g>

    <!-- Big Prometheus Engine Box -->
    <g transform="translate(25, 70)">
      <rect x="0" y="0" width="365" height="185" rx="14" fill="#131b2e" stroke="#e6522c" stroke-width="1.5" filter="url(#glowOrange)"/>
      <circle cx="65" cy="85" r="44" fill="#431407" stroke="#e6522c" stroke-width="2"/>
      ${renderIcon('prometheus', 33, 53, 64, '#e6522c')}
      <text x="135" y="70" fill="#f8fafc" font-size="20" font-weight="800">Prometheus</text>
      <text x="135" y="94" fill="#ea580c" font-size="12" font-weight="700">Time-Series DB (:9090)</text>
      
      <g transform="translate(135, 110)">
        <rect x="0" y="0" width="95" height="22" rx="6" fill="#0f172a"/>
        <text x="47" y="15" fill="#fed7aa" font-size="10" font-weight="700" text-anchor="middle">15s Scrape</text>
        <rect x="105" y="0" width="95" height="22" rx="6" fill="#0f172a"/>
        <text x="152" y="15" fill="#fed7aa" font-size="10" font-weight="700" text-anchor="middle">7d Retention</text>
      </g>
      <rect x="25" y="148" width="315" height="22" rx="11" fill="#431407"/>
      <text x="182" y="163" fill="#fb923c" font-size="10" font-weight="800" text-anchor="middle">STORAGE: prometheus-data</text>
    </g>

    <!-- Alert Rules Box -->
    <g transform="translate(25, 280)">
      <rect x="0" y="0" width="365" height="345" rx="14" fill="#131b2e" stroke="#dc2626" stroke-width="1.2"/>
      
      <g transform="translate(20, 20)">
        <circle cx="16" cy="16" r="16" fill="#450a0a" stroke="#ef4444" stroke-width="1.2"/>
        ${renderIcon('bell', 6, 6, 20, '#ef4444')}
        <text x="44" y="22" fill="#f8fafc" font-size="15" font-weight="800">Prometheus Alert Rules</text>
      </g>

      <!-- Alert 1 -->
      <g transform="translate(20, 60)">
        <rect x="0" y="0" width="325" height="56" rx="8" fill="#1c1917" stroke="#f59e0b" stroke-width="1"/>
        <rect x="12" y="14" width="55" height="28" rx="6" fill="#78350f"/>
        <text x="39" y="32" fill="#fde68a" font-size="9" font-weight="800" text-anchor="middle">WARN</text>
        <text x="78" y="26" fill="#f8fafc" font-size="12" font-weight="700">HighCPUUsage</text>
        <text x="78" y="42" fill="#fbbf24" font-size="10" font-weight="600">> 85% for 5 min</text>
      </g>

      <!-- Alert 2 -->
      <g transform="translate(20, 126)">
        <rect x="0" y="0" width="325" height="56" rx="8" fill="#1c1917" stroke="#ef4444" stroke-width="1"/>
        <rect x="12" y="14" width="55" height="28" rx="6" fill="#7f1d1d"/>
        <text x="39" y="32" fill="#fca5a5" font-size="9" font-weight="800" text-anchor="middle">CRIT</text>
        <text x="78" y="26" fill="#f8fafc" font-size="12" font-weight="700">HighMemoryUsage</text>
        <text x="78" y="42" fill="#f87171" font-size="10" font-weight="600">> 85% for 5 min</text>
      </g>

      <!-- Alert 3 -->
      <g transform="translate(20, 192)">
        <rect x="0" y="0" width="325" height="56" rx="8" fill="#1c1917" stroke="#ef4444" stroke-width="1"/>
        <rect x="12" y="14" width="55" height="28" rx="6" fill="#7f1d1d"/>
        <text x="39" y="32" fill="#fca5a5" font-size="9" font-weight="800" text-anchor="middle">CRIT</text>
        <text x="78" y="26" fill="#f8fafc" font-size="12" font-weight="700">APIUnavailable</text>
        <text x="78" y="42" fill="#f87171" font-size="10" font-family="monospace">up == 0 (1 min)</text>
      </g>

      <!-- Alert 4 -->
      <g transform="translate(20, 258)">
        <rect x="0" y="0" width="325" height="56" rx="8" fill="#1c1917" stroke="#f59e0b" stroke-width="1"/>
        <rect x="12" y="14" width="55" height="28" rx="6" fill="#78350f"/>
        <text x="39" y="32" fill="#fde68a" font-size="9" font-weight="800" text-anchor="middle">WARN</text>
        <text x="78" y="26" fill="#f8fafc" font-size="12" font-weight="700">HighAPIErrorRate</text>
        <text x="78" y="42" fill="#fbbf24" font-size="10" font-weight="600">5xx rate > 5%</text>
      </g>
    </g>
  </g>

  <!-- Big Flow Arrow 2 -> 3 -->
  <path d="M 930 422 L 965 422" stroke="#f46800" stroke-width="3" marker-end="url(#arrOrange)"/>

  <!-- ==================== COLUMN 3: VISUALIZATION & SRE ==================== -->
  <g transform="translate(980, 95)">
    <rect x="0" y="0" width="415" height="655" rx="16" fill="#0d1424" stroke="#f46800" stroke-width="1.2" filter="url(#shadow)"/>
    
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="95" height="24" rx="12" fill="#c2410c"/>
      <text x="47" y="16" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">ANALYTICS</text>
      <text x="108" y="17" fill="#f8fafc" font-size="16" font-weight="800">Grafana Dashboards</text>
    </g>

    <!-- Big Grafana Box -->
    <g transform="translate(25, 70)">
      <rect x="0" y="0" width="365" height="205" rx="14" fill="#131b2e" stroke="#f46800" stroke-width="1.5" filter="url(#glowOrange)"/>
      <circle cx="65" cy="85" r="44" fill="#431407" stroke="#f46800" stroke-width="2"/>
      ${renderIcon('grafana', 33, 53, 64, '#f46800')}
      <text x="135" y="70" fill="#f8fafc" font-size="20" font-weight="800">Grafana</text>
      <text x="135" y="94" fill="#fb923c" font-size="12" font-weight="700">Analytics Server (:3000)</text>

      <g transform="translate(135, 110)">
        <rect x="0" y="0" width="205" height="22" rx="6" fill="#0f172a"/>
        <text x="102" y="15" fill="#fed7aa" font-size="10" font-weight="700" text-anchor="middle">Auto-Provisioned Datasource</text>
      </g>
      <rect x="25" y="155" width="315" height="30" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
      <text x="182" y="174" fill="#34d399" font-size="11" font-weight="800" text-anchor="middle">BOUND TO 127.0.0.1:3000</text>
    </g>

    <path d="M 207 280 L 207 310" stroke="#f46800" stroke-width="2.5" marker-end="url(#arrOrange)"/>

    <!-- Dashboard Pre-built Views Card -->
    <g transform="translate(25, 315)">
      <rect x="0" y="0" width="365" height="175" rx="14" fill="#131b2e" stroke="#334155" stroke-width="1.2"/>
      <text x="20" y="30" fill="#f8fafc" font-size="14" font-weight="800">Pre-Configured Views</text>

      <g transform="translate(20, 45)">
        <rect x="0" y="0" width="325" height="34" rx="8" fill="#1e293b"/>
        <text x="15" y="22" fill="#38bdf8" font-size="12" font-weight="700">1. Host Overview (CPU, RAM, Swap, Disk)</text>
      </g>

      <g transform="translate(20, 85)">
        <rect x="0" y="0" width="325" height="34" rx="8" fill="#1e293b"/>
        <text x="15" y="22" fill="#c084fc" font-size="12" font-weight="700">2. Container Matrix (Memory RSS &amp; I/O)</text>
      </g>

      <g transform="translate(20, 125)">
        <rect x="0" y="0" width="325" height="34" rx="8" fill="#1e293b"/>
        <text x="15" y="22" fill="#34d399" font-size="12" font-weight="700">3. API Performance (RPS, Latency, Errors)</text>
      </g>
    </g>

    <path d="M 207 495 L 207 520" stroke="#f46800" stroke-width="2.5" marker-end="url(#arrOrange)"/>

    <!-- SRE Access -->
    <g transform="translate(25, 525)">
      <rect x="0" y="0" width="365" height="100" rx="14" fill="#131b2e" stroke="#38bdf8" stroke-width="1.2"/>
      <circle cx="45" cy="50" r="26" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.5"/>
      ${renderIcon('terminal', 27, 32, 36, '#38bdf8')}
      <text x="85" y="42" fill="#f8fafc" font-size="14" font-weight="800">SRE Tunnel Access</text>
      <text x="85" y="60" fill="#7dd3fc" font-size="10.5" font-family="monospace">ssh -L 3000:localhost:3000</text>
      <rect x="85" y="70" width="160" height="20" rx="10" fill="#064e3b"/>
      <text x="165" y="84" fill="#34d399" font-size="9.5" font-weight="800" text-anchor="middle">http://localhost:3000</text>
    </g>
  </g>
</svg>
`;

async function generate() {
  console.log('Generating updated logo-centric DevOps diagrams...');

  const archSvgPath = path.join(outputDir, 'devops-architecture.svg');
  const cicdSvgPath = path.join(outputDir, 'cicd-pipeline.svg');
  const obsSvgPath = path.join(outputDir, 'observability-monitoring.svg');

  fs.writeFileSync(archSvgPath, architectureSvg.trim());
  fs.writeFileSync(cicdSvgPath, cicdSvg.trim());
  fs.writeFileSync(obsSvgPath, observabilitySvg.trim());
  console.log('Saved SVG files.');

  console.log('Rendering high-resolution PNG images (2560px width) via sharp...');

  const archPngPath = path.join(outputDir, 'devops-architecture.png');
  const cicdPngPath = path.join(outputDir, 'cicd-pipeline.png');
  const obsPngPath = path.join(outputDir, 'observability-monitoring.png');

  await sharp(Buffer.from(architectureSvg))
    .resize(2560)
    .png({ quality: 95 })
    .toFile(archPngPath);
  console.log('Generated PNG: ' + archPngPath);

  await sharp(Buffer.from(cicdSvg))
    .resize(2560)
    .png({ quality: 95 })
    .toFile(cicdPngPath);
  console.log('Generated PNG: ' + cicdPngPath);

  await sharp(Buffer.from(observabilitySvg))
    .resize(2560)
    .png({ quality: 95 })
    .toFile(obsPngPath);
  console.log('Generated PNG: ' + obsPngPath);

  console.log('\nAll 3 diagram sets regenerated successfully with logo-first design!');
}

generate().catch(err => {
  console.error('Error generating diagrams:', err);
  process.exit(1);
});
