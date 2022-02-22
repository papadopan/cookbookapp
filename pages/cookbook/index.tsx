import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Modal, Form, Input, Space, Card } from 'antd'
import { useAppSelector } from '../../redux/hooks'
import { useMutation } from '@apollo/client'
import { createCookbook } from './cookbook'
import { ME } from '../../components/auth'
const CookBook = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [form] = Form.useForm()
  const user = useAppSelector((state) => state.user.user)
  const [createBook] = useMutation(createCookbook, {
    refetchQueries: [ME],
    onError(error) {
      return error
    },
  })

  return (
    <Row style={{ padding: '10px' }}>
      <Modal
        visible={showModal}
        title="Add new CookBook"
        onCancel={() => setShowModal(false)}
        okText="Create"
        okButtonProps={{
          onClick: () => form.submit(),
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={(val) => {
            createBook({
              variables: {
                data: {
                  ...val,
                  userId: Number(user?.id),
                },
              },
            })
            setShowModal(false)
          }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Row justify="end" style={{ width: '100%' }}>
        <Button type="primary" onClick={() => setShowModal(true)}>
          Add CookBook
        </Button>
      </Row>
      <Col>
        <Space size="large" style={{ flexWrap: 'wrap' }}>
          {user?.books?.map((item) => (
            <Card
              style={{ minWidth: '300px' }}
              title={item.title}
              extra={item.recipes?.length}
            >
              {item.description}
            </Card>
          ))}
        </Space>
      </Col>
    </Row>
  )
}

CookBook.propTypes = {}

export default CookBook
