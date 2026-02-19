'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Project {
    id: string
    title: string
    subtitle: string
    description: string
    tags: string[]
    accentColor: string
    emoji: string
    href?: string
    span?: 'wide' | 'normal'
}

const PROJECTS: Project[] = [
    {
        id: 'neuro-symbolic',
        title: 'Neuro-Symbolic AI',
        subtitle: "Master's Thesis — TU Hamburg",
        description:
            'A hybrid framework combining fuzzy logic with deep learning for image classification — achieving a 98% reduction in logical violations vs. pure neural baselines.',
        tags: ['PyTorch', 'Fuzzy Logic', 'CNN', 'Python', 'Neuro-Symbolic'],
        accentColor: '#10B981',
        emoji: '🧠',
        span: 'wide',
    },
    {
        id: 'ai-companion',
        title: 'AI Companion',
        subtitle: 'Emotionally Adaptive Application',
        description:
            'A "best friend" AI application with emotional memory and adaptive personality. Built with Next.js, v0, and long-term memory via RAG pipelines.',
        tags: ['Next.js', 'v0', 'RAG', 'Supabase', 'LLM'],
        accentColor: '#06D6A0',
        emoji: '🤖',
        href: 'https://rightra-ai.vercel.app/',
        span: 'normal',
    },
    {
        id: 'mesh-it',
        title: 'Mesh It',
        subtitle: 'Cursor AI Hackathon',
        description:
            'Full-stack AI matchmaking platform that uses intelligent code analysis to pair developers with complementary skill sets. Built with AI-driven profiling and real-time matching.',
        tags: ['Next.js', 'OpenAI', 'Supabase', 'Vector Search'],
        accentColor: '#22D3EE',
        emoji: '🔗',
        href: 'https://mesh-it.vercel.app/',
        span: 'normal',
    },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    const Tag = project.href ? 'a' : 'div'
    const linkProps = project.href
        ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
        : {}

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
            className={project.span === 'wide' ? 'md:col-span-2' : ''}
        >
            {/* @ts-ignore */}
            <Tag
                {...linkProps}
                className={`glass rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-300 relative overflow-hidden block
          ${project.href ? 'cursor-pointer hover:shadow-xl' : 'cursor-default'}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                {/* Corner accent gradient */}
                <div
                    className="absolute top-0 right-0 w-44 h-44 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle, ${project.accentColor}, transparent)`,
                        transform: 'translate(30%, -30%)',
                    }}
                />

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                            style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}30` }}
                        >
                            {project.emoji}
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-xl text-gray-900">{project.title}</h3>
                            <p className="text-xs font-semibold mt-0.5" style={{ color: project.accentColor }}>
                                {project.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* External link arrow — only if href */}
                    {project.href && (
                        <div
                            className="mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0"
                            style={{ background: `${project.accentColor}20`, border: `1px solid ${project.accentColor}35` }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={project.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full font-semibold"
                            style={{
                                background: `${project.accentColor}12`,
                                color: project.accentColor,
                                border: `1px solid ${project.accentColor}25`,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Bottom glow line on hover */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}, transparent)` }}
                />
            </Tag>
        </motion.div>
    )
}

export default function ProjectsSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })

    return (
        <section id="projects" className="section-full">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="tag mb-4 inline-block">Selected Work</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black text-gray-900">
                        What I&apos;ve{' '}
                        <span className="gradient-text">Built</span>
                    </h2>
                    <p className="mt-3 text-gray-500 max-w-lg mx-auto">
                        From academic research to hackathon wins — click to explore the live apps.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
