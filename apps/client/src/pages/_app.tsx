import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import AppBar from './appBar'

export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider>
    <AppBar></AppBar>
    <Component {...pageProps} />
  </SessionProvider>
}
