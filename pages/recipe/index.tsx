import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const Recipe = (props) => {
  return (
    <Row justify="center" style={{ paddingTop: '15px' }}>
      <Col span={12} style={{ background: '#fff', padding: '15px' }}>
        <Typography.Title level={4}>Add New Recipe</Typography.Title>
        <Form name="basic" layout="vertical" style={{ marginTop: '50px' }}>
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
          <Form.List name="users">
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
                      name={[name, 'description']}
                      label="Description"
                    >
                      <Input placeholder="provide ingredient description" />
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
                      <Input placeholder="provide ingredient quantity" />
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
