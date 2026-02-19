'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import ExperienceSection from '@/components/ExperienceSection'
import SkillsSection from '@/components/SkillsSection'
import ContactSection from '@/components/ContactSection'

// Dynamically import client-only components with no SSR
const AntiGravityBackground = dynamic(
    () => import('@/components/AntiGravityBackground'),
    { ssr: false }
)

const EnergyTrail = dynamic(
    () => import('@/components/EnergyTrail'),
    { ssr: false }
)

export default function Home() {
    return (
        <>
            {/* Three.js particle background — fixed, z-index 0 */}
            <AntiGravityBackground />

            {/* Mouse energy trail — fixed, z-index 1 */}
            <EnergyTrail />

            {/* Navigation */}
            <Navbar />

            {/* Page content — z-index 2 */}
            <main>
                <HeroSection />
                <ProjectsSection />
                <ExperienceSection />
                <SkillsSection />
                <ContactSection />
            </main>
        </>
    )
}
