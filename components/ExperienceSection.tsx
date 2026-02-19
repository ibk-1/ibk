'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Experience {
    company: string
    role: string
    period: string
    location: string
    description: string
    tags: string[]
    accentColor: string
    logo: string
}

const EXPERIENCES: Experience[] = [
    {
        company: 'Visable GmbH',
        role: 'Working Student — Data Science',
        period: '2024 – Present',
        location: 'Hamburg, Germany',
        description:
            'AI Optimization & LLM monitoring at scale. Developing and monitoring large language model pipelines while optimizing AI-driven recommendation systems that serve thousands of B2B users.',
        tags: ['LLM Monitoring', 'AI Optimization', 'Python', 'Data Science'],
        accentColor: '#06D6A0',
        logo: 'V',
    },
    {
        company: 'Blue Ocean Strategic Partners',
        role: 'Software Developer',
        period: '2023 – 2024',
        location: 'Remote',
        description:
            'Led development of Azure Data Factory ETL pipelines for enterprise clients. Designed and maintained robust data workflows ensuring high availability and data integrity across distributed systems.',
        tags: ['Azure Data Factory', 'ETL', 'Cloud Architecture', 'SQL'],
        accentColor: '#22D3EE',
        logo: 'B',
    },
    {
        company: 'Tiger Analytics',
        role: 'Data Engineer',
        period: '2021 – 2023',
        location: 'India',
        description:
            'Delivered impactful data engineering solutions while mentoring a team of 30+ junior developers. Built scalable data platforms and established best practices for the engineering organization.',
        tags: ['Data Engineering', 'Mentorship', 'Python', 'Spark'],
        accentColor: '#10B981',
        logo: 'T',
    },
]

export default function ExperienceSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })

    return (
        <section id="experience" className="section-full">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="tag mb-4 inline-block">Career</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black text-gray-900">
                        Where I've{' '}
                        <span className="gradient-text">Worked</span>
                    </h2>
                    <p className="mt-3 text-gray-500 max-w-lg mx-auto">
                        Industry experience spanning data engineering, AI optimization, and full-stack development.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div
                        className="absolute left-6 top-0 bottom-0 w-px md:left-1/2"
                        style={{ background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.25), transparent)' }}
                    />

                    <div className="flex flex-col gap-10">
                        {EXPERIENCES.map((exp, i) => {
                            const isRight = i % 2 === 0
                            return (
                                <ExperienceCard key={exp.company} exp={exp} index={i} isRight={isRight} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

function ExperienceCard({
    exp,
    index,
    isRight,
}: {
    exp: Experience
    index: number
    isRight: boolean
}) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isRight ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
            className={`relative pl-16 md:pl-0 md:w-[calc(50%-2rem)] group ${isRight ? 'md:ml-auto md:pr-0 md:pl-8' : 'md:mr-auto md:pr-8 md:pl-0 md:text-right'
                }`}
        >
            {/* Timeline dot */}
            <div
                className="absolute left-3 top-5 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white md:left-auto md:-right-3 md:translate-x-1/2"
                style={{
                    background: `linear-gradient(135deg, ${exp.accentColor}, ${exp.accentColor}88)`,
                    boxShadow: `0 0 12px ${exp.accentColor}55`,
                    ...(isRight ? { left: 'auto', right: 'auto', marginLeft: '-1.25rem' } : {}),
                }}
            >
                {exp.logo}
            </div>
            {/* Card */}
            <div className="glass rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <div
                    className={`flex items-start gap-3 ${isRight ? '' : 'md:flex-row-reverse md:text-right'}`}
                >
                    <div className="flex-1">
                        <p className="text-xs font-semibold mb-0.5" style={{ color: exp.accentColor }}>
                            {exp.period} · {exp.location}
                        </p>
                        <h3 className="font-serif font-bold text-lg text-gray-900">{exp.company}</h3>
                        <p className="text-sm font-medium text-gray-600 mb-2">{exp.role}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{exp.description}</p>
                        <div className={`flex flex-wrap gap-1.5 mt-3 ${isRight ? '' : 'md:justify-end'}`}>
                            {exp.tags.map(t => (
                                <span
                                    key={t}
                                    className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                                    style={{
                                        background: `${exp.accentColor}12`,
                                        color: exp.accentColor,
                                        border: `1px solid ${exp.accentColor}22`,
                                    }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
