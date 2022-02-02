import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Space, Typography } from 'antd';
import profilePic from "../../public/image.jpeg"
import Image from 'next/image'


const Header = (props) => {
  return <Row justify='space-between' style={{verticalAlign:"middle"}}>
    <Col>
    <Space>

    <Image
        src={profilePic}
        alt="Cook book logo"
        height={40}
        width={40}
        />
        <Typography.Title level={5} style={{color:"#fff"}}>CookBook</Typography.Title>
        </Space>
      </Col>
    <Col>antonios</Col>
    <Col>antonios</Col>
  </Row>;
};

Header.propTypes = {};

export default Header;
