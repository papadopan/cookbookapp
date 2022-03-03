import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { getRecipe } from './recipe'
import { useQuery } from '@apollo/client'
import { Col, Row, Space, Typography } from 'antd'
import Image from 'next/image'

const Recipe = (props) => {
  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(getRecipe, {
    variables: {
      recipeId: Number(id),
    },
  })
  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const { recipe } = data
  return (
    <Row justify="center">
      <Col xs={22} style={{ textAlign: 'center', background: 'steelBlue' }}>
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
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Recipe.propTypes = {}

export default Recipe
