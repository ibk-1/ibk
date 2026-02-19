'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SkillCategory {
    title: string
    icon: string
    color: string
    skills: string[]
}

const CATEGORIES: SkillCategory[] = [
    {
        title: 'Programming & Backend',
        icon: '⚙️',
        color: '#06D6A0',
        skills: ['Python', 'SQL', 'FastAPI', 'PySpark'],
    },
    {
        title: 'Web & Modern Dev',
        icon: '🌐',
        color: '#22D3EE',
        skills: ['JavaScript / TypeScript', 'React', 'Next.js', 'Cursor AI', 'v0'],
    },
    {
        title: 'Data & Cloud',
        icon: '☁️',
        color: '#34D399',
        skills: ['Azure', 'AWS', 'Databricks', 'Docker', 'Git', 'ETL / ELT Pipelines'],
    },
    {
        title: 'Analytics',
        icon: '📊',
        color: '#2DD4BF',
        skills: ['A/B Testing', 'Predictive Modeling', 'Power BI', 'Tableau', 'LightGBM'],
    },
    {
        title: 'Platform & Ops',
        icon: '🔧',
        color: '#6EE7B7',
        skills: ['Databricks Jobs', 'Azure Monitor', 'Datadog', 'Log Analytics', 'Azure Data Factory'],
    },
    {
        title: 'Collaboration',
        icon: '🤝',
        color: '#06D6A0',
        skills: ['Jira', 'Confluence', 'Microsoft 365', 'SharePoint', 'Power Automate'],
    },
]

function CategoryCard({ cat, index }: { cat: SkillCategory; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
            className="glass rounded-2xl p-5 flex flex-col gap-3 group hover:-translate-y-1 transition-all duration-300"
        >
            {/* Category header */}
            <div className="flex items-center gap-3">
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
                >
                    {cat.icon}
                </div>
                <h3 className="font-semibold text-sm text-gray-800">{cat.title}</h3>
            </div>

            {/* Bottom accent line */}
            <div
                className="h-0.5 w-8 rounded-full group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(to right, ${cat.color}, transparent)` }}
            />

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
                {cat.skills.map(skill => (
                    <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-full font-medium transition-all duration-200"
                        style={{
                            background: `${cat.color}10`,
                            color: cat.color,
                            border: `1px solid ${cat.color}20`,
                        }}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </motion.div>
    )
}

export default function SkillsSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })

    return (
        <section id="skills" className="section-full">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="tag mb-4 inline-block">Stack</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black text-gray-900">
                        Tools &amp; <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="mt-3 text-gray-500 max-w-lg mx-auto">
                        Six years of building across data engineering, AI systems, and modern web.
                    </p>
                </motion.div>

                {/* Category grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CATEGORIES.map((cat, i) => (
                        <CategoryCard key={cat.title} cat={cat} index={i} />
                    ))}
                </div>

                {/* Education callout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-8 glass rounded-2xl p-6 flex flex-col md:flex-row gap-5 items-center text-center md:text-left"
                >
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, rgba(6,214,160,0.12), rgba(34,211,238,0.12))',
                            border: '1px solid rgba(6,214,160,0.2)',
                        }}
                    >
                        🎓
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-lg text-gray-900">
                            MSc Data Science — Technical University of Hamburg
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                            2023 – Present · Specializing in neuro-symbolic AI and hybrid reasoning systems.
                            Previously: BE Computer Science, Anna University.
                        </p>
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                        {['English', 'German'].map(lang => (
                            <span
                                key={lang}
                                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                                style={{
                                    background: 'rgba(6,214,160,0.1)',
                                    color: '#059669',
                                    border: '1px solid rgba(6,214,160,0.2)',
                                }}
                            >
                                {lang}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
