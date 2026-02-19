'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINKS = [
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/ibrahim-kalil-92616b190/',
        icon: '🔗',
        description: 'Connect professionally',
        color: '#06D6A0',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/ibk-1',
        icon: '💻',
        description: 'View my code',
        color: '#10B981',
    },
    {
        label: 'Email',
        href: 'mailto:ibrahim.kalil.1025@gmail.com',
        icon: '✉️',
        description: 'Say hello',
        color: '#22D3EE',
    },
]

export default function ContactSection() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })

    return (
        <section id="contact" className="section-full">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="tag mb-4 inline-block">Let's Connect</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black text-gray-900">
                        Get in <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="mt-3 text-gray-500 max-w-lg mx-auto">
                        Open to collaborations, full-time roles, and interesting problems in AI and data engineering.
                    </p>
                </motion.div>

                {/* Main CTA card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="relative rounded-3xl overflow-hidden mb-10"
                    style={{
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
                        border: '1px solid rgba(59,130,246,0.15)',
                    }}
                >
                    {/* Glow orbs */}
                    <div
                        className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #06D6A0, transparent)' }}
                    />
                    <div
                        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #22D3EE, transparent)' }}
                    />

                    <div className="relative z-10 p-10 text-center">
                        <p className="text-lg font-serif text-gray-700 mb-2 italic">
                            "I don't just study models, I build the systems around them."
                        </p>
                        <p className="text-gray-500 text-sm mb-8">— IBK</p>
                        <a
                            href="mailto:ibrahim.kalil.1025@gmail.com"
                            className="btn-glow inline-block"
                        >
                            Start a Conversation →
                        </a>
                    </div>
                </motion.div>

                {/* Link cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {LINKS.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('mailto') ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            className="glass rounded-2xl p-5 flex flex-col items-center gap-2 text-center group transition-all duration-200"
                        >
                            <span className="text-3xl">{link.icon}</span>
                            <span className="font-semibold text-gray-800 group-hover:text-gray-900">{link.label}</span>
                            <span className="text-xs text-gray-500">{link.description}</span>
                        </motion.a>
                    ))}
                </div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 }}
                    className="text-center text-xs text-gray-400 mt-14"
                >
                    © 2026 Ibrahim Kalil Jagir Hussain · Built with Next.js, Three.js &amp; ❤️
                </motion.p>
            </div>
        </section>
    )
}
