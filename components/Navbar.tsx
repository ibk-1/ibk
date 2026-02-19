'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/ThemeProvider'

const NAV_ITEMS = [
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
]

const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : ''

function ThemeToggle() {
    const { theme, toggle } = useTheme()
    return (
        <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
                background: theme === 'dark' ? 'rgba(6,214,160,0.12)' : 'rgba(6,214,160,0.08)',
                border: '1px solid rgba(6,214,160,0.25)',
            }}
        >
            <motion.span
                key={theme}
                initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-base leading-none"
            >
                {theme === 'dark' ? '☀️' : '🌙'}
            </motion.span>
        </button>
    )
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { theme } = useTheme()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const navBg = scrolled
        ? theme === 'dark'
            ? 'rgba(8,15,12,0.88)'
            : 'rgba(255,255,255,0.85)'
        : 'transparent'

    const borderColor = scrolled
        ? theme === 'dark'
            ? 'rgba(6,214,160,0.15)'
            : 'rgba(6,214,160,0.12)'
        : 'transparent'

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: navBg,
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: `1px solid ${borderColor}`,
                }}
            >
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#hero" className="font-serif font-black text-2xl gradient-text select-none">
                        IBK
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map(item => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium transition-colors relative group"
                                style={{ color: theme === 'dark' ? 'rgba(232,245,240,0.7)' : '#6B7280' }}
                            >
                                {item.label}
                                <span
                                    className="absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                                    style={{ background: 'var(--electric)' }}
                                />
                            </a>
                        ))}
                        <ThemeToggle />
                        <a
                            href={`${basePath}/resume.pdf`}
                            download="IBK_Resume.pdf"
                            className="btn-glow text-xs px-4 py-2"
                        >
                            Resume ↗
                        </a>
                    </div>

                    {/* Mobile: theme toggle + hamburger */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5"
                            onClick={() => setMenuOpen(v => !v)}
                            aria-label="Toggle menu"
                        >
                            <span
                                className="block w-5 h-0.5 rounded transition-all duration-200"
                                style={{
                                    background: theme === 'dark' ? '#E8F5F0' : '#374151',
                                    transform: menuOpen ? 'rotate(45deg) translate(2px, 4px)' : 'none',
                                }}
                            />
                            <span
                                className="block w-5 h-0.5 rounded transition-all duration-200"
                                style={{
                                    background: theme === 'dark' ? '#E8F5F0' : '#374151',
                                    opacity: menuOpen ? 0 : 1,
                                }}
                            />
                            <span
                                className="block w-5 h-0.5 rounded transition-all duration-200"
                                style={{
                                    background: theme === 'dark' ? '#E8F5F0' : '#374151',
                                    transform: menuOpen ? 'rotate(-45deg) translate(2px, -4px)' : 'none',
                                }}
                            />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 z-40 glass"
                        style={{ borderBottom: '1px solid rgba(6,214,160,0.12)' }}
                    >
                        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3">
                            {NAV_ITEMS.map(item => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-base font-medium py-2"
                                    style={{ color: theme === 'dark' ? '#E8F5F0' : '#374151' }}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href={`${basePath}/resume.pdf`}
                                download="IBK_Resume.pdf"
                                className="btn-glow text-sm text-center mt-2"
                            >
                                Download Resume ↗
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
