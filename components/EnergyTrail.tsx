'use client'

import { useEffect, useRef, useCallback } from 'react'

// ─── Wind / Flow Particle System ─────────────────────────────────────────────
// Particles drift slowly at their origin. When the mouse moves, its VELOCITY
// (not position) is applied as a wind force to nearby particles — they flow
// in the direction the cursor is moving. On scroll, a vertical breeze pushes
// all particles. No attraction, no vibration.

const PARTICLE_COUNT = 160
const WIND_RADIUS = 200      // px — how far the cursor wind reaches
const WIND_STRENGTH = 0.28   // how much mouse velocity transfers to particles
const RETURN_FORCE = 0.022   // gentle spring back to origin
const FRICTION = 0.88        // high friction = slow, smooth drift
const MAX_SPEED = 5
const DRIFT_SPEED = 0.18     // ambient slow drift speed

const COLORS = ['#06D6A0', '#22D3EE', '#34D399', '#2DD4BF', '#6EE7B7']

interface Particle {
    ox: number; oy: number
    x: number; y: number
    vx: number; vy: number
    radius: number
    color: string
    alpha: number
    driftAngle: number  // individual ambient drift direction
}

function createParticles(w: number, h: number): Particle[] {
    const particles: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        particles.push({
            ox: x, oy: y, x, y,
            vx: 0, vy: 0,
            radius: 1.5 + Math.random() * 2,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: 0.3 + Math.random() * 0.4,
            driftAngle: Math.random() * Math.PI * 2,
        })
    }
    return particles
}

export default function EnergyTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({ x: -9999, y: -9999 })
    // Track velocity by comparing previous position
    const prevMouseRef = useRef({ x: -9999, y: -9999 })
    const mouseVelRef = useRef({ vx: 0, vy: 0 })
    const scrollVelRef = useRef(0)
    const prevScrollRef = useRef(0)
    const frameRef = useRef<number>(0)
    const timeRef = useRef(0)

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const prev = mouseRef.current
        mouseRef.current = { x: e.clientX, y: e.clientY }
        // Mouse velocity = distance moved this event
        mouseVelRef.current = {
            vx: e.clientX - prev.x,
            vy: e.clientY - prev.y,
        }
    }, [])

    const handleTouchMove = useCallback((e: TouchEvent) => {
        const t = e.touches[0]
        const prev = mouseRef.current
        mouseRef.current = { x: t.clientX, y: t.clientY }
        mouseVelRef.current = {
            vx: t.clientX - prev.x,
            vy: t.clientY - prev.y,
        }
    }, [])

    const handleScroll = useCallback(() => {
        const sy = window.scrollY
        scrollVelRef.current = sy - prevScrollRef.current
        prevScrollRef.current = sy
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            particlesRef.current = createParticles(canvas.width, canvas.height)
        }
        resize()

        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        window.addEventListener('touchmove', handleTouchMove, { passive: true })
        window.addEventListener('scroll', handleScroll, { passive: true })

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            timeRef.current += 0.008

            const mx = mouseRef.current.x
            const my = mouseRef.current.y
            const mvx = mouseVelRef.current.vx
            const mvy = mouseVelRef.current.vy
            const cursorActive = mx > -999

            // Decay scroll velocity each frame
            scrollVelRef.current *= 0.85

            for (const p of particlesRef.current) {
                // ── Ambient drift (each particle moves slowly in its own direction) ──
                p.driftAngle += 0.004
                p.vx += Math.cos(p.driftAngle) * DRIFT_SPEED * 0.012
                p.vy += Math.sin(p.driftAngle) * DRIFT_SPEED * 0.012

                // ── Wind from mouse velocity ──────────────────────────────────────────
                if (cursorActive && (Math.abs(mvx) > 0.5 || Math.abs(mvy) > 0.5)) {
                    const dx = mx - p.x
                    const dy = my - p.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < WIND_RADIUS) {
                        // Falloff: strongest near cursor, fades at edge
                        const falloff = 1 - dist / WIND_RADIUS
                        p.vx += mvx * WIND_STRENGTH * falloff
                        p.vy += mvy * WIND_STRENGTH * falloff
                    }
                }

                // ── Scroll vertical breeze ────────────────────────────────────────────
                if (Math.abs(scrollVelRef.current) > 0.5) {
                    p.vy += scrollVelRef.current * 0.04
                }

                // ── Spring back to origin ─────────────────────────────────────────────
                p.vx += (p.ox - p.x) * RETURN_FORCE
                p.vy += (p.oy - p.y) * RETURN_FORCE

                // ── Friction & speed cap ──────────────────────────────────────────────
                p.vx *= FRICTION
                p.vy *= FRICTION
                const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
                if (spd > MAX_SPEED) {
                    p.vx = (p.vx / spd) * MAX_SPEED
                    p.vy = (p.vy / spd) * MAX_SPEED
                }

                p.x += p.vx
                p.y += p.vy

                // ── Draw ──────────────────────────────────────────────────────────────
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
                const moving = speed > 0.5
                const drawAlpha = Math.min(1, p.alpha + (moving ? speed * 0.04 : 0))

                ctx.save()
                ctx.globalAlpha = drawAlpha
                ctx.globalCompositeOperation = 'screen'

                // Soft glow when moving fast
                if (moving) {
                    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5)
                    g.addColorStop(0, p.color + '99')
                    g.addColorStop(1, p.color + '00')
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2)
                    ctx.fillStyle = g
                    ctx.fill()
                }

                // Elongated streak in direction of motion (comet-like)
                if (spd > 1) {
                    ctx.beginPath()
                    ctx.moveTo(p.x, p.y)
                    ctx.lineTo(p.x - p.vx * 2.5, p.y - p.vy * 2.5)
                    ctx.strokeStyle = p.color
                    ctx.lineWidth = p.radius * 0.9
                    ctx.lineCap = 'round'
                    ctx.globalAlpha = drawAlpha * 0.5
                    ctx.stroke()
                }

                // Core dot
                ctx.globalAlpha = drawAlpha
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = p.color
                ctx.fill()

                ctx.restore()
            }

            // Decay mouse velocity each frame so wind stops when cursor stops
            mouseVelRef.current.vx *= 0.6
            mouseVelRef.current.vy *= 0.6

            frameRef.current = requestAnimationFrame(animate)
        }

        frameRef.current = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(frameRef.current)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('touchmove', handleTouchMove)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleMouseMove, handleTouchMove, handleScroll])

    return (
        <canvas
            ref={canvasRef}
            id="trail-canvas"
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none' }}
        />
    )
}
