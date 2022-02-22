import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client'
import { useAppDispatch } from '../../redux/hooks'
import { login, logout } from '../../redux/features/userSlice'
import { useRouter } from 'next/router'

const ME = gql`
  query Me {
    me {
      id
      name
      lastName
      email
      books {
        title
        description
        recipes {
          title
          description
        }
      }
    }
  }
`
const Auth = ({ children }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { data, loading, error } = useQuery(ME)

  useEffect(() => {
    if (error) {
      router.push('/login')
      dispatch(logout())
    }
    if (data && !loading) {
      dispatch(login(data.me))
    }
  }, [data, error, loading])

  return children
}

Auth.propTypes = {
  children: PropTypes.node,
}

export default Auth
