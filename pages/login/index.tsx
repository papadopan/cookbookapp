import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { LOGIN } from './login'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useAppDispatch } from '../../redux/hooks'
import { login as stateLogin } from '../../redux/features/userSlice'

const Login = (props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [login, { data, loading, error }] = useMutation(LOGIN, {
    onError(error) {
      return error
    },
  })

  useEffect(() => {
    if (data && data.login) {
      dispatch(stateLogin(data.login))
      router.push('/')
    }
  }, [data])

  return (
    <Row justify="center" style={{ padding: '20px 0 ' }}>
      <Col span={12} style={{ background: '#fff', padding: '15px 10px' }}>
        <Typography.Title>Login</Typography.Title>
        <Typography.Text type="secondary">Welcome again</Typography.Text>
        <Form
          name="login"
          style={{ marginTop: '20px' }}
          onFinish={(val) => login({ variables: val })}
          initialValues={{ email: router.query.email }}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                message: 'Please provide a valid email',
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              },
            ]}
          >
            <Input placeholder="your email ..." />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                message:
                  'At least 1 capital, 1 number, 1 special character, minimum 6',
                pattern:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
              },
            ]}
          >
            <Input.Password placeholder="****" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
          {error && (
            <Typography.Text type="danger">{error.message}</Typography.Text>
          )}
        </Form>
      </Col>
    </Row>
  )
}

Login.propTypes = {}

export default Login
