import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import dynamic from 'next/dynamic'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { theme } from '../styles/custom-theme'
import { LanguageProvider } from "@/utils/hooks/useLanguage";
import AuthProvider from "@/components/auth/auth-provider";
import { TabProvider } from "@/utils/hooks/useTabs";
import { ToastProvider } from "@/utils/hooks/useToast";

//fix for hydration errors
const NoSSRNavigation = dynamic(() => import('../components/navigation/navigation'), { ssr: false })

const roboto = Roboto({ subsets: ['latin'], weight: '400' });
const queryClient = new QueryClient


function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <div className={`${roboto.className}`} style={{ height: '100%' }}>
            <SessionProvider session={pageProps.session}>
              <AuthProvider>
                <ToastProvider>
                  <NoSSRNavigation />
                  <Component {...pageProps} />
                </ToastProvider>
              </AuthProvider>
            </SessionProvider>
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>

  )
}


export default App