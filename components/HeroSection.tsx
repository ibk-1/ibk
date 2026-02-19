'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : ''

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })

    return (
        <section
            ref={ref}
            id="hero"
            className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center relative"
        >
            {/* Ambient glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="w-[600px] h-[600px] rounded-full"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(6,214,160,0.07) 0%, rgba(34,211,238,0.04) 40%, transparent 70%)',
                    }}
                />
            </div>

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
                className="mb-6"
            >
                <span className="tag">
                    🎓 MSc Data Science · TU Hamburg
                </span>
            </motion.div>

            {/* Name */}
            <motion.h1
                className="text-6xl md:text-8xl font-serif font-black mb-4 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.75, ease: 'easeOut' }}
            >
                <span className="gradient-text">IBK</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="text-xl md:text-2xl font-serif text-gray-600 mb-3 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
            >
                AI-Native Builder &amp; Data Science Master's Student
            </motion.p>

            {/* Punchline */}
            <motion.p
                className="text-base md:text-lg text-gray-500 italic mb-10 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
            >
                "I don't just study models, I build the systems around them."
            </motion.p>

            {/* CTA buttons */}
            <motion.div
                className="flex flex-col sm:flex-row gap-4 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.65, duration: 0.7, ease: 'easeOut' }}
            >
                <a href="#projects" className="btn-glow text-sm">
                    View Projects ↓
                </a>
                <a
                    href={`${basePath}/resume.pdf`}
                    download="IBK_Resume.pdf"
                    className="btn-outline text-sm"
                >
                    Download Resume ↗
                </a>
            </motion.div>

            {/* Achievement stats card */}
            <motion.div
                className="mt-16 glass rounded-2xl p-5 max-w-md w-full text-left"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                style={{ animation: 'float 6s ease-in-out infinite' }}
            >
                {/* Terminal top bar */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-black/5">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#06D6A0', opacity: 0.8 }} />
                    </div>
                    <span className="text-xs text-gray-400 font-mono ml-1">ibk.profile</span>
                    <div className="ml-auto flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#06D6A0' }} />
                            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#06D6A0' }} />
                        </span>
                        <span className="text-xs font-semibold" style={{ color: '#06D6A0' }}>Open to work</span>
                    </div>
                </div>

                {/* Current role */}
                <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.2)' }}>💼</div>
                    <div>
                        <p className="text-xs font-semibold text-gray-800">Working Student — Data Science</p>
                        <p className="text-xs text-gray-500">Visable GmbH · Hamburg <span className="mx-1">·</span> Mar 2024 – Present</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">LLM monitoring · Recommendation systems · OpenAI APIs</p>
                    </div>
                </div>

                {/* Profile status list */}
                <div className="flex flex-col gap-2 mb-4">
                    {[
                        { icon: '📍', label: 'Based in', value: 'Hamburg, Germany' },
                        { icon: '🎓', label: 'Studying', value: 'MSc Data Science · TU Hamburg' },
                        { icon: '🔬', label: 'Focus', value: 'AI Systems · LLMs · Data Engineering' },
                        { icon: '🔍', label: 'Looking for', value: 'Full-time roles in AI / Data' },
                    ].map(item => (
                        <div key={item.label} className="flex items-center gap-3">
                            <span className="text-sm w-5 text-center flex-shrink-0">{item.icon}</span>
                            <span className="text-[10px] text-gray-400 w-16 flex-shrink-0 uppercase tracking-wide font-medium">{item.label}</span>
                            <span className="text-xs text-gray-700 font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* Terminal status line */}
                <div className="flex items-center gap-2 rounded-lg px-3 py-2 flex-wrap" style={{ background: 'rgba(6,214,160,0.05)', border: '1px solid rgba(6,214,160,0.12)' }}>
                    <span className="text-xs font-mono text-gray-400">&gt;</span>
                    <span className="text-xs font-mono text-gray-500">stack:</span>
                    <span className="text-xs font-mono font-semibold" style={{ color: '#06D6A0' }}>Python · Next.js · Azure · LLMs</span>
                </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
                <div
                    className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-1.5"
                    style={{ borderColor: 'rgba(6,214,160,0.35)' }}
                >
                    <div
                        className="w-1.5 h-2.5 rounded-full"
                        style={{ background: '#06D6A0' }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
