import { gql } from '@apollo/client'

export const createCookbook = gql`
  mutation CreateBook($data: BookInput!) {
    createBook(data: $data) {
      title
      description
    }
  }
`
