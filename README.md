# <img src="public/favicon.ico" width="24" height="24" /> IBK Portfolio — AI-Native Builder

A premium, interactive personal portfolio built with **Next.js**, **Three.js**, and **Tailwind CSS**. Designed with an "AI-Native" aesthetic, featuring a smooth cyan-green palette, ambient particle systems, and a terminal-style identity.

## 🚀 Live Demo
**[https://ibk-1.github.io/ibk/](https://ibk-1.github.io/ibk/)**

---

## ✨ Features
- **Anti-Gravity Particle System**: Deep Three.js background with repellent force.
- **Wind-Flow Interactive Field**: A layered canvas system where particles flow based on mouse velocity and scroll progress.
- **Terminal Achievement Card**: A floating, mac-style status panel showcasing live roles and stats.
- **Full Dark Mode**: Persistent theme toggle with high-contrast emerald/teal palette.
- **Glassmorphism Design**: Modern, blurred surfaces with neon gradients and subtle micro-animations.

---

## 🛠️ Personalizing Your Portfolio

If you want to edit specific sections of your page, here is where to find them:

### Content & Sections
| To edit this... | Go to this file |
| :--- | :--- |
| **Hero Title / Stat Card** | [`components/HeroSection.tsx`](file:///Users/ibk/Workspace/Projects/portfolio/components/HeroSection.tsx) |
| **Project List & Links** | [`components/ProjectsSection.tsx`](file:///Users/ibk/Workspace/Projects/portfolio/components/ProjectsSection.tsx) |
| **Experience Timeline** | [`components/ExperienceSection.tsx`](file:///Users/ibk/Workspace/Projects/portfolio/components/ExperienceSection.tsx) |
| **Skills Categories** | [`components/SkillsSection.tsx`](file:///Users/ibk/Workspace/Projects/portfolio/components/SkillsSection.tsx) |
| **Social Links / Email** | [`components/ContactSection.tsx`](file:///Users/ibk/Workspace/Projects/portfolio/components/ContactSection.tsx) |
| **Navigation Menu** | [`components/Navbar.tsx`](file:///Users/ibk/Workspace/Projects/portfolio/components/Navbar.tsx) |

### Visuals & Particles
- **Theme Colors (Teal/Cyan)**: [`globals.css`](file:///Users/ibk/Workspace/Projects/portfolio/app/globals.css) (Update the CSS variables under `:root` and `[data-theme="dark"]`).
- **Main Particles**: [`components/AntiGravityBackground.tsx`](file:///Users/ibk/Workspace/Projects/portfolio/components/AntiGravityBackground.tsx).
- **Interactive Wind/Trail**: [`components/EnergyTrail.tsx`](file:///Users/ibk/Workspace/Projects/portfolio/components/EnergyTrail.tsx).

---

## 🏗️ Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the results.

### 3. Deploy Updates
The project is configured for **GitHub Actions**. Simply push your changes to the `main` branch, and the site will redeploy automatically.

```bash
git add .
git commit -m "Update my portfolio"
git push origin main
```

---

## 📄 License
MIT © [Ibrahim Kalil](https://github.com/ibk-1)
