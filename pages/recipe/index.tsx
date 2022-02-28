import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Row, Space, Typography } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../redux/hooks'
import { useMutation } from '@apollo/client'
import { RECIPE } from './recipe'
import { ME } from '../../components/auth'
const Recipe = (props) => {
  const user = useAppSelector((state) => state.user.user)
  const [recipe, { data, loading, error }] = useMutation(RECIPE, {
    refetchQueries: [ME],
  })

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
            val.cookBookId = 5
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
          <Form.List name="ingredients">
            {(fields, { add, remove }) => (
              <>
                <Typography.Title level={5}>Ingredient List</Typography.Title>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space
                    key={key}
                    direction="vertical"
                    style={{
                      padding: '10px',
                      width: '100%',
                      marginBottom: '10px',
                      background: index % 2 != 0 ? '#f4f4f4' : undefined,
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      label="Title"
                      rules={[
                        { required: true, message: 'Missing ingredient title' },
                      ]}
                    >
                      <Input placeholder="provide ingredient title" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'quantity']}
                      label="Quantity"
                      rules={[
                        {
                          required: true,
                          message: 'Missing ingredient quantity',
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="provide ingredient quantity"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'measurement']}
                      label="Measurement"
                      rules={[
                        {
                          required: true,
                          message: 'Missing ingredient measurement',
                        },
                      ]}
                    >
                      <Input placeholder="provide ingredient measurement" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label="Additional Information"
                    >
                      <Input.TextArea placeholder="provide additional information" />
                    </Form.Item>
                    <Button
                      danger
                      onClick={() => remove(name)}
                      icon={<MinusCircleOutlined />}
                    >
                      Remove Ingredient
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Ingredient
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
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
