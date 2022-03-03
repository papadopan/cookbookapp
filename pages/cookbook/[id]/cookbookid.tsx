import { gql } from '@apollo/client'

export const mybook = gql`
  query Query($myBookId: Float!) {
    myBook(id: $myBookId) {
      title
      description
      recipes {
        title
        userId
        cookBookId
        description
        duration
        portions
        id
      }
    }
  }
`

export const deleteCookBook = gql`
  mutation DeleteBook($deleteBookId: Float!) {
    deleteBook(id: $deleteBookId) {
      title
      id
    }
  }
`
