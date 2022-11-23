import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/Auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
