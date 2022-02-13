import React from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { login, logout } from '../../../redux/features/userSlice'
import Router from 'next/router'

const ME = gql`
  query Me($meId: Int!) {
    me(id: $meId) {
      name
    }
  }
`
const Auth = ({ children }) => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn)

  const { data, loading, error } = useQuery(ME, {
    variables: {
      meId: 44,
    },
  })
  if (loggedIn) return children

  if (loading) return <div>Loading...</div>
  const dispatch = useAppDispatch()

  if (error) {
    Router.replace('/login')
    dispatch(logout())
  }

  dispatch(login())
  return children
}

Auth.propTypes = {}

export default Auth
