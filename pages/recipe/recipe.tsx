import { gql } from '@apollo/client'

export const RECIPE = gql`
  mutation AddRecipe($options: RecipeInput!) {
    addRecipe(options: $options) {
      title
      userId
      cookBookId
      description
      ingredients {
        title
        description
        measurement
        quantity
      }
    }
  }
`
