import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { mybook } from './cookbookid'
import {
  Col,
  PageHeader,
  Row,
  Layout,
  Card,
  Typography,
  Space,
  Button,
  Dropdown,
  Menu,
} from 'antd'
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons'

const CookBookID = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(mybook, {
    variables: { myBookId: Number(id) },
  })

  if (loading) return <div>Loading....</div>
  if (error) return <div>{error.message}</div>

  const menu = (
    <Menu>
      <Menu.Item icon={<EditOutlined />}>Edit</Menu.Item>
      <Menu.Item danger icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  )
  const { myBook } = data
  return (
    <Layout>
      <PageHeader
        title={myBook.title}
        subTitle={myBook.description}
        onBack={() => router.back()}
        extra={[
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<SettingOutlined />} type="primary">
              Settings
            </Button>
          </Dropdown>,
        ]}
      />
      <Layout.Content style={{ padding: '15px' }}>
        <Row gutter={[16, 16]}>
          {myBook?.recipes.map((item) => (
            <Col
              xs={{ span: 22, offset: 1 }}
              md={{ span: 12, offset: 0 }}
              lg={8}
              xl={6}
              xxl={4}
            >
              <Card
                actions={[
                  <Space key="time">
                    <Typography.Text type="secondary">30 min</Typography.Text>
                    <ClockCircleOutlined />
                  </Space>,
                  <Space>
                    <Typography.Text type="secondary">
                      9 portions
                    </Typography.Text>
                    <TeamOutlined />
                  </Space>,
                  <Space>
                    <Typography.Text type="secondary">3.5</Typography.Text>
                    <StarOutlined />
                  </Space>,
                ]}
                cover={
                  <Image
                    height={250}
                    width={450}
                    alt="example"
                    src="https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3BhZ2hldHRpJTIwY2FyYm9uYXJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  />
                }
              >
                <Card.Meta title={item.title} description={item.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </Layout.Content>
    </Layout>
  )
}

CookBookID.propTypes = {}

export default CookBookID
