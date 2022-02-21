import React from 'react'
import type { AppProps } from 'next/app'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import Header from '../components/Header'

function App({ Component, pageProps: pageProps }: AppProps) {
  return (
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
  )
}

App.propTypes = {}

export default App
