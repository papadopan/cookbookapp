import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { getRecipe, deleteRecipe } from './recipe'
import { useQuery, useMutation } from '@apollo/client'
import {
  Button,
  Col,
  Drawer,
  notification,
  PageHeader,
  Row,
  Space,
  Steps,
  Typography,
} from 'antd'
import Image from 'next/image'
import { DeleteOutlined } from '@ant-design/icons'
import { mybook } from '../../cookbook/[id]/cookbookid'

const Recipe = (props) => {
  const router = useRouter()
  const { id } = router.query

  const [showModal, setShowModal] = useState(false)
  const { data, loading, error } = useQuery(getRecipe, {
    variables: {
      recipeId: Number(id),
    },
  })
  const [
    deleteRecipeById,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(deleteRecipe, {
    refetchQueries: [
      {
        query: mybook,
        variables: { myBookId: Number(data?.recipe.cookBookId) },
      },
    ],
  })

  useEffect(() => {
    if (deleteData) {
      router.back()
      notification.success({
        message: recipe.title,
        description: 'successfully deleted',
      })
    }
  }, [deleteData])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const { recipe } = data
  return (
    <React.Fragment>
      <Drawer
        title={recipe.title}
        placement="right"
        onClose={() => setShowModal(false)}
        visible={showModal}
      >
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() =>
            deleteRecipeById({
              variables: { deleteRecipeId: Number(id) },
            })
          }
        >
          Delete
        </Button>
      </Drawer>
      <PageHeader
        onBack={() => router.back()}
        title="a"
        extra={
          <Button type="primary" onClick={() => setShowModal(true)}>
            Settings
          </Button>
        }
      />
      <Row justify="center">
        <Col xs={22} style={{ textAlign: 'center', background: 'lightblue' }}>
          <Space direction="vertical" size="large">
            <Space direction="vertical" size="small">
              <Typography.Title level={1}>{recipe.title}</Typography.Title>
              <Typography.Text>{recipe.description}</Typography.Text>
            </Space>
            <Image
              height={250}
              width={450}
              alt="example"
              src="https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3BhZ2hldHRpJTIwY2FyYm9uYXJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            />
          </Space>
          <Row style={{ marginTop: '10px' }}>
            <Col xs={22} lg={12}>
              <Typography.Title level={3}>Ingredients</Typography.Title>
            </Col>
            <Col xs={22} lg={12}>
              <Typography.Title level={3}>Steps</Typography.Title>
              <Steps progressDot current={0} direction="vertical">
                <Steps.Step
                  title="Finished"
                  description="This is a description."
                />
                <Steps.Step
                  title="In Progress"
                  description="This is a description."
                />
                <Steps.Step
                  title="Waiting"
                  description="This is a description."
                />
              </Steps>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

Recipe.propTypes = {}

export default Recipe
