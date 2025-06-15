"use cache";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ModelProvider } from '@/components/ui/model-provider'
import { ToasterProvider } from '@/components/toaster-provider'
import { CrispProvider } from '@/components/crisp-provider'
import { Providers } from './provider'
import Script from 'next/script'
import { DarkModeProvider } from '@/hooks/DarkModeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NexZenith',
  description: 'Ai based Software As a Service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider >
      <html lang="en" suppressHydrationWarning>
      <CrispProvider/>
        <body className={inter.className}>
          <ModelProvider/>
          <ToasterProvider/>
          <Providers>
            <DarkModeProvider>{children}</DarkModeProvider>
          </Providers>
          <Script src='https://checkout.razorpay.com/v1/checkout.js'/>
          </body>
      </html>
    </ClerkProvider>
  )
}
