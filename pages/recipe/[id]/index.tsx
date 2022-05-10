import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { getRecipe, deleteRecipe } from './recipe'
import { useQuery, useMutation } from '@apollo/client'
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Modal,
  notification,
  PageHeader,
  Row,
  Input,
  Space,
  Steps,
  Table,
  Typography,
} from 'antd'
import Image from 'next/image'
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { mybook } from '../../cookbook/[id]/cookbookid'

const Recipe = () => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Measurement',
      dataIndex: 'measurement',
      key: 'measurement',
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
  ]

  const router = useRouter()
  const { id } = router.query

  const [showDrawer, setShowDrawer] = useState(false)
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
        variables: { myBookId: Number(data?.recipe?.cookBookId) },
      },
    ],
  })

  useEffect(() => {
    if (deleteData) {
      goToCookBookPage()
      notification.success({
        message: recipe.title,
        description: 'successfully deleted',
      })
    }
  }, [deleteData])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const { recipe } = data

  const closeDrawer = () => setShowDrawer(false)
  const openDrawer = () => setShowDrawer(true)
  const closeModal = () => setShowModal(false)
  const openModal = () => setShowModal(true)

  const deleteRecipeButton = () =>
    deleteRecipeById({
      variables: { deleteRecipeId: Number(id) },
    })
  const goToCookBookPage = () =>
    router.push(`/cookbook/${data.recipe.cookBookId}`)

  return (
    <React.Fragment>
      <Drawer
        title={recipe.title}
        placement="right"
        onClose={closeDrawer}
        visible={showDrawer}
      >
        <Button
          danger={true}
          icon={<DeleteOutlined />}
          onClick={deleteRecipeButton}
        >
          Delete
        </Button>
      </Drawer>
      <Modal
        visible={showModal}
        title="Add Ingredients"
        okText="Add"
        width={1000}
        onCancel={closeModal}
      >
        <Form name="dynamic_form_item">
          <Form.List name="ingredientList">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    required={false}
                    key={field.key}
                    style={{
                      background: index % 2 == 0 ? 'lightgrey' : 'white',
                      padding: '10px',
                    }}
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, 'title']}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Ingredient's title is mandatrory",
                        },
                      ]}
                    >
                      <Input placeholder="Title" />
                    </Form.Item>
                    <Space style={{ width: '100%' }}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'quantity']}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Ingredient's quantity is mandatory",
                          },
                        ]}
                      >
                        <Input placeholder="Quantity" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'measurement']}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Ingredient's measurement is mandatory",
                          },
                        ]}
                      >
                        <Input placeholder="Measurement" />
                      </Form.Item>
                    </Space>
                    <Form.Item
                      {...field}
                      name={[field.name, 'description']}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Ingredient's description is mandatory",
                        },
                      ]}
                    >
                      <Input placeholder="Description" />
                    </Form.Item>
                    <Button
                      danger={true}
                      icon={
                        <MinusCircleOutlined onClick={() => remove(field)} />
                      }
                    >
                      Remove Ingredient
                    </Button>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <PageHeader
        onBack={goToCookBookPage}
        title="CookBook"
        extra={
          <Button type="primary" onClick={openDrawer}>
            Settings
          </Button>
        }
      />
      <Row justify="center">
        <Col xs={22} style={{ background: 'lightblue' }}>
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
          <Row style={{ marginTop: '10px', padding: '10px' }} gutter={[16, 16]}>
            <Col xs={22} lg={12}>
              <Card
                title="Ingredients"
                extra={
                  <Button type="primary" onClick={openModal}>
                    Add ingredients
                  </Button>
                }
              >
                <Table
                  columns={columns}
                  dataSource={recipe.ingredients}
                  pagination={false}
                />
              </Card>
            </Col>
            <Col xs={22} lg={12}>
              <Card title="Steps">
                <Steps progressDot={true} current={0} direction="vertical">
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
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

Recipe.propTypes = {}

export default Recipe
