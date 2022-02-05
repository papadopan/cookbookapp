
import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Signup($options: UserSignUpInput!) {
    signup(options: $options) {
      user {
        email
        lastName
        name
        id
      }
    }
  }
`;


