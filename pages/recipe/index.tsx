import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../redux/hooks'
import { useMutation, useQuery } from '@apollo/client'
import { RECIPE, MYBOOKS } from './recipe'
import { ME } from '../../components/auth'
import { useRouter } from 'next/router'

const Recipe = () => {
  const user = useAppSelector((state) => state.user.user)
  const [recipe, { data: recipeData, loading, error }] = useMutation(RECIPE, {
    refetchQueries: [ME],
  })

  const { data } = useQuery(MYBOOKS, {
    variables: { allBooksId: Number(user?.id) },
  })
  const router = useRouter()

  useEffect(() => {
    if (recipeData && !error) {
      const {
        addRecipe: { id },
      } = recipeData
      router.push(`/recipe/${id}`)
    }
  }, [recipeData, error])

  return (
    <Row justify="center" style={{ paddingTop: '15px' }}>
      <Col
        xs={22}
        sm={18}
        lg={16}
        xl={12}
        style={{ background: '#fff', padding: '15px' }}
      >
        <Typography.Title level={4}>Add New Recipe</Typography.Title>
        <Form
          name="basic"
          layout="vertical"
          style={{ marginTop: '50px' }}
          onFinish={(val) => {
            val.userId = Number(user?.id)
            val.cookBookId = Number(val.cookBookId)
            recipe({ variables: { options: val } })
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input placeholder="Provide a title for your recipe..." />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please input your description!' },
            ]}
          >
            <Input.TextArea
              rows={5}
              placeholder="Provide a description of the recipe..."
            />
          </Form.Item>
          <Form.Item label="CookBook" name="cookBookId">
            <Select>
              {data?.allBooks.map((book) => (
                <Select.Option key={book.id} value={book.id}>
                  {book.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Recipe
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

Recipe.propTypes = {}

export default Recipe
