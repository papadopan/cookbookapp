import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { mybook } from './cookbookid'
import { Col, PageHeader, Row, Layout, Card, Typography } from 'antd'

const CookBookID = (props) => {
  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(mybook, {
    variables: { myBookId: Number(id) },
  })

  if (loading) return <div>Loading....</div>
  if (error) return <div>{error.message}</div>
  const { myBook } = data
  return (
    <Layout>
      <PageHeader
        title={myBook.title}
        subTitle={myBook.description}
        onBack={() => router.back()}
      />
      <Layout.Content style={{ padding: '15px' }}>
        <Row>
          {myBook?.recipes.map((item) => (
            <Col
              xs={{ span: 22, offset: 1 }}
              md={{ span: 12, offset: 0 }}
              lg={4}
            >
              <Card>
                <Typography.Title level={5}>{item.title}</Typography.Title>
                <Typography.Text type="secondary">
                  {item.description}
                </Typography.Text>
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
