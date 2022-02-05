import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
      user {
        name
      }
      errors {
        field
        message
      }
    }
  }
`
