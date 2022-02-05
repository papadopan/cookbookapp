import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'antd'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Component {...pageProps} />
      </Layout.Content>
      <Layout.Footer>antonios</Layout.Footer>
    </Layout>
  )
}

export default MyApp
