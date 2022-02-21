import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Row, Typography, notification } from 'antd'
import { useMutation } from '@apollo/client'
import { REGISTER } from './register'
import { useRouter } from 'next/router'

const index = (props) => {
  const [register, { data, loading, error }] = useMutation(REGISTER, {
    onError(error) {
      return error
    },
  })

  const router = useRouter()

  if (error) return <div>{error.message}</div>

  useEffect(() => {
    if (!loading && data && data.signup) {
      router.push({
        pathname: '/login',
        query: { email: data.signup.email },
      })
      notification.success({
        message: 'SignUp Successfuly',
        description: 'Congartulations, now you can login to out platform',
      })
    }
  }, [data])

  return (
    <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
      <Col lg={12} xs={22} style={{ background: '#fff', padding: '15px 10px' }}>
        <Typography.Title>Register</Typography.Title>
        <Typography.Text type="secondary">
          Welcome to our community
        </Typography.Text>
        <Form
          layout="vertical"
          style={{ marginTop: '20px' }}
          onFinish={(val) => {
            register({ variables: { options: val } })
          }}
        >
          <Form.Item
            label="First Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Stan" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: 'Please input your last name!' },
            ]}
          >
            <Input placeholder="Smith" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              {
                message: 'Please provide a valid email',
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              },
            ]}
          >
            <Input placeholder="your email..." />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Password is required for your security!',
              },
              {
                message:
                  'At least 1 capital, 1 number, 1 special character, minimum 6',
                pattern:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
              },
            ]}
          >
            <Input.Password placeholder="*****" type="password" />
          </Form.Item>
          <Form.Item
            label="Repeat Password"
            name="repeatPassword"
            rules={[
              {
                required: true,
                message: 'Please input the same password as above!',
              },
              {
                message:
                  'At least 1 capital, 1 number, 1 special character, minimum 6',
                pattern:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
              },
            ]}
          >
            <Input.Password placeholder="*****" type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

index.propTypes = {}

export default index
