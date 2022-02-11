import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'antd'
import Header from '../components/Header'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client'
import Cookies from 'js-cookie'

const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  headers: { Authentication: `Bearer ${Cookies.get('ckbk')}` },
})

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  credentials: 'include',
})

function MyApp({ Component, pageProps: pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )
}

export default MyApp
