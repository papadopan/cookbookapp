import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { login, logout } from '../../redux/features/userSlice'
import { useRouter } from 'next/router'

const ME = gql`
  query Me {
    me {
      id
      name
      lastName
      email
    }
  }
`
const Auth = ({ children }) => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { data, loading, error } = useQuery(ME)

  useEffect(() => {
    if (error) {
      router.push('/login')
      dispatch(logout())
    }
    if (data && !loading) {
      router.push('/')
      dispatch(login())
    }
  }, [data, error, loading])

  return children
}

Auth.propTypes = {
  children: PropTypes.node,
}

export default Auth
