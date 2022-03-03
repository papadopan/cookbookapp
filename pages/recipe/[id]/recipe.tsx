import { gql } from '@apollo/client'

export const getRecipe = gql`
  query Recipe($recipeId: Float!) {
    recipe(id: $recipeId) {
      title
      id
      userId
      cookBookId
      description
      duration
      portions
      ingredients {
        title
        description
        measurement
        quantity
      }
    }
  }
`
