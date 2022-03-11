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
export const deleteRecipe = gql`
  mutation Mutation($deleteRecipeId: Float!) {
    deleteRecipe(id: $deleteRecipeId) {
      title
      id
    }
  }
`
