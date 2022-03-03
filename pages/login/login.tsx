import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      name
      email
      id
      books {
        id
        title
        description
        recipes {
          title
          description
          portions
          duration
        }
      }
    }
  }
`
