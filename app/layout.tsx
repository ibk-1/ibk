import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
    title: 'IBK — AI-Native Builder & Data Science Engineer',
    description:
        'Portfolio of Ibrahim Kalil Jagir Hussain — AI engineer, full-stack builder, and Data Science Master\'s student at TU Hamburg. Builder of Mesh It, AI Companion, and Neuro-Symbolic AI systems.',
    keywords: ['AI Engineer', 'Data Science', 'Machine Learning', 'Next.js', 'Portfolio', 'TU Hamburg'],
    authors: [{ name: 'Ibrahim Kalil Jagir Hussain' }],
    openGraph: {
        title: 'IBK — AI-Native Builder',
        description: 'I don\'t just study models, I build the systems around them.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="antialiased">
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
