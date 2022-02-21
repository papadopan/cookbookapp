
import { gql } from '@apollo/client';

export const REGISTER = gql`
mutation Signup($options: UserSignUpInput!) {
  signup(options: $options) {
    id
    name
    lastName
    email
  }
}
`;


