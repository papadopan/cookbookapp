import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'antd'
import Header from '../components/Header'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.Content>
          <Component {...pageProps} />
        </Layout.Content>
        <Layout.Footer>antonios</Layout.Footer>
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
