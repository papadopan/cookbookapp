import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useQuery, useMutation } from '@apollo/client'
import { mybook, deleteCookBook } from './cookbookid'

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
  notification,
} from 'antd'
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { ME } from '../../../components/auth'
type RecipeItem = {
  cookBookId: number
  description: string
  duration: number
  id: number
  portions: number
  title: string
  userId: number
}

const CookBookID = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(mybook, {
    variables: { myBookId: Number(id) },
  })

  const [deleteBook, { data: deleteData, error: deleteError }] = useMutation(
    deleteCookBook,
    {
      refetchQueries: [ME],
    }
  )

  useEffect(() => {
    if (deleteData) {
      const { deleteBook } = deleteData
      goToCookBooks()
      notification.success({
        message: 'CookBook Deleted',
        description: `${deleteBook.title} deleted successfully`,
      })
    }
  }, [deleteData])

  if (loading) return <div>Loading....</div>
  if (error) return <div>{error.message}</div>

  const menu = (
    <Menu>
      <Menu.Item icon={<EditOutlined />}>Edit</Menu.Item>
      <Menu.Item
        danger={true}
        icon={<DeleteOutlined />}
        onClick={() => deleteBook({ variables: { deleteBookId: Number(id) } })}
      >
        Delete
      </Menu.Item>
    </Menu>
  )
  const { myBook } = data
  const goToCookBooks = () => router.push('/cookbook')
  const goToRecipe = (id: number) => () => router.push(`/recipe/${id}`)

  return (
    <Layout>
      <PageHeader
        title={myBook.title}
        subTitle={myBook.description}
        onBack={goToCookBooks}
        extra={[
          <Dropdown key="Settings" overlay={menu} trigger={['click']}>
            <Button icon={<SettingOutlined />} type="primary">
              Settings
            </Button>
          </Dropdown>,
        ]}
      />
      <Layout.Content style={{ padding: '15px' }}>
        <Row gutter={[16, 16]}>
          {myBook?.recipes.map((item: RecipeItem) => (
            <Col
              xs={{ span: 22, offset: 1 }}
              md={{ span: 12, offset: 0 }}
              lg={8}
              xl={6}
              xxl={4}
              key={item.id}
            >
              <Card
                onClick={goToRecipe(item.id)}
                actions={[
                  <Space key="time">
                    <Typography.Text type="secondary">
                      {item.duration} min
                    </Typography.Text>
                    <ClockCircleOutlined />
                  </Space>,
                  <Space key="portions">
                    <Typography.Text type="secondary">
                      {item.portions} portions
                    </Typography.Text>
                    <TeamOutlined />
                  </Space>,
                  <Space key="stars">
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
