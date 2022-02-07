import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'antd'
import Header from '../components/Header'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Header>
            <Header />
          </Layout.Header>
          <Layout.Content>
            <Component {...pageProps} />
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            Cookbook ©2022
          </Layout.Footer>
        </Layout>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
