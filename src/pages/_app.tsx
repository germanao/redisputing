import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import Header from '../components/header'
import { Footer } from '../components/footer'
import { AuthProvider } from '../contexts/AuthContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <GlobalStyle />
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
