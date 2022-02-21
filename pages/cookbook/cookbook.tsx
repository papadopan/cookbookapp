import { gql } from '@apollo/client'

export const createCookbook = gql`
  mutation CreateBook($data: BookInput!) {
    createBook(data: $data) {
      title
      description
    }
  }
`

export const mybooks = gql`
  query MyBook($myBookId: Float!) {
    myBooks(id: $myBookId) {
      title
      description
    }
  }
`
