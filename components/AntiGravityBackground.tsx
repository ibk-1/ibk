'use client'

import { useRef, useMemo, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 380

// Cyan-green palette
const NEON_COLORS = [
    new THREE.Color('#06D6A0'), // teal-green
    new THREE.Color('#22D3EE'), // bright cyan
    new THREE.Color('#34D399'), // emerald
    new THREE.Color('#2DD4BF'), // teal
    new THREE.Color('#6EE7B7'), // mint
]

function Particles({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
    const points = useRef<THREE.Points>(null!)

    const { positions, colors, velocities, phases, colorIndices } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3)
        const colors = new Float32Array(PARTICLE_COUNT * 3)
        const velocities = new Float32Array(PARTICLE_COUNT * 3)
        const phases = new Float32Array(PARTICLE_COUNT)
        const colorIndices = new Uint8Array(PARTICLE_COUNT)

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3
            positions[i3] = (Math.random() - 0.5) * 20
            positions[i3 + 1] = (Math.random() - 0.5) * 13
            positions[i3 + 2] = (Math.random() - 0.5) * 5

            velocities[i3] = (Math.random() - 0.5) * 0.006
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.006
            velocities[i3 + 2] = 0

            phases[i] = Math.random() * Math.PI * 2
            const ci = Math.floor(Math.random() * NEON_COLORS.length)
            colorIndices[i] = ci
            colors[i3] = NEON_COLORS[ci].r
            colors[i3 + 1] = NEON_COLORS[ci].g
            colors[i3 + 2] = NEON_COLORS[ci].b
        }
        return { positions, colors, velocities, phases, colorIndices }
    }, [])

    useFrame(({ clock }) => {
        if (!points.current) return
        const t = clock.getElapsedTime()
        const geo = points.current.geometry
        const pos = geo.attributes.position.array as Float32Array
        const col = geo.attributes.color.array as Float32Array

        const mx = mouseRef.current.x * 9
        const my = mouseRef.current.y * 6

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3
            const phase = phases[i]

            pos[i3 + 1] += Math.sin(t * 0.35 + phase) * 0.0018 + velocities[i3 + 1]
            pos[i3] += Math.cos(t * 0.28 + phase * 1.2) * 0.001 + velocities[i3]

            if (pos[i3] > 11) pos[i3] = -11
            if (pos[i3] < -11) pos[i3] = 11
            if (pos[i3 + 1] > 7.5) pos[i3 + 1] = -7.5
            if (pos[i3 + 1] < -7.5) pos[i3 + 1] = 7.5

            // Anti-gravity repel from mouse
            const dx = pos[i3] - mx
            const dy = pos[i3 + 1] - my
            const distSq = dx * dx + dy * dy
            const repelRadius = 2.8

            if (distSq < repelRadius * repelRadius && distSq > 0.001) {
                const dist = Math.sqrt(distSq)
                const force = ((repelRadius - dist) / repelRadius) * 0.07
                pos[i3] += (dx / dist) * force
                pos[i3 + 1] += (dy / dist) * force
            }

            // Color brightness based on proximity — brighter near cursor
            const dist = Math.sqrt(Math.max(distSq, 0.001))
            const proximity = Math.max(0, 1 - dist / repelRadius)
            const ci = colorIndices[i]
            const base = NEON_COLORS[ci]
            col[i3] = Math.min(1, base.r + proximity * 0.25)
            col[i3 + 1] = Math.min(1, base.g + proximity * 0.2)
            col[i3 + 2] = Math.min(1, base.b + proximity * 0.2)
        }

        geo.attributes.position.needsUpdate = true
        geo.attributes.color.needsUpdate = true
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.055}
                vertexColors
                transparent
                opacity={0.5}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

function ConnectionLines() {
    const lineRef = useRef<THREE.LineSegments>(null!)

    useFrame(({ clock }) => {
        if (!lineRef.current) return
        const t = clock.getElapsedTime()
        lineRef.current.rotation.z = Math.sin(t * 0.04) * 0.04
    })

    const { positions, indices } = useMemo(() => {
        const count = 55
        const positions = new Float32Array(count * 3)
        const indices: number[] = []
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 22
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4
        }
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = positions[i * 3] - positions[j * 3]
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
                if (Math.sqrt(dx * dx + dy * dy) < 3.8) {
                    indices.push(i, j)
                }
            }
        }
        return { positions, indices }
    }, [])

    return (
        <lineSegments ref={lineRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="index" args={[new Uint16Array(indices), 1]} />
            </bufferGeometry>
            <lineBasicMaterial color="#06D6A0" transparent opacity={0.05} />
        </lineSegments>
    )
}

function Scene({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
    return (
        <>
            <Particles mouseRef={mouseRef} />
            <ConnectionLines />
        </>
    )
}

export default function AntiGravityBackground() {
    const mouseRef = useRef({ x: 0, y: 0 })

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseRef.current = {
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: -((e.clientY / window.innerHeight) * 2 - 1),
        }
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [handleMouseMove])

    return (
        <Canvas
            id="bg-canvas"
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: false, alpha: true }}
            dpr={[1, 1.5]}
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100vw', height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <Scene mouseRef={mouseRef} />
        </Canvas>
    )
}
