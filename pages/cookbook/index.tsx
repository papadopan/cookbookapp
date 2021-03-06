import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Modal, Form, Input, Space, Card } from 'antd'
import { useAppSelector } from '../../redux/hooks'
import { useMutation } from '@apollo/client'
import { createCookbook } from './cookbook'
import { ME } from '../../components/auth'
import { PlusOutlined, SwapRightOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { MYBOOKS } from '../recipe/recipe'

const CookBook = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [form] = Form.useForm()
  const user = useAppSelector((state) => state.user.user)
  const [createBook] = useMutation(createCookbook, {
    refetchQueries: [
      ME,
      { query: MYBOOKS, variables: { allBooksId: Number(user?.id) } },
    ],
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
            rules={[
              { required: true },
              { max: 240, message: 'Max 240 characters' },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
      <Row justify="end" style={{ width: '100%' }}>
        <Button
          type="primary"
          onClick={() => setShowModal(true)}
          icon={<PlusOutlined />}
        >
          Add CookBook
        </Button>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '20px', width: '100%' }}>
        {user?.books?.map((item) => (
          <Col xs={{ span: 22, offset: 1 }} md={{ span: 12, offset: 0 }} lg={4}>
            <Link href={`/cookbook/${item.id}`}>
              <Card
                title={item.title}
                extra={`${item.recipes?.length} recipes`}
                actions={[<SwapRightOutlined key="ellipsis" />]}
              >
                {item.description}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Row>
  )
}

CookBook.propTypes = {}

export default CookBook
