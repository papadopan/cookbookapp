import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Space, Typography } from 'antd'
import HeaderMenu from './Menu'

const Header = (props) => {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Typography.Title level={5} style={{ color: '#fff' }}>
          CookBook
        </Typography.Title>
      </Col>
      <Col>antonios</Col>
      <Col span={2}>
        <HeaderMenu />
      </Col>
    </Row>
  )
}

Header.propTypes = {}

export default Header
