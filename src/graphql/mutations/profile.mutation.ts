import { gql } from '@apollo/client';

export const CREATE_PROFILE = gql`
  mutation CreateProfile($input: CreateProfileInput!) {
    createProfile(input: $input) {
      id
      name
      imageUrl
      email
      createdAt
    }
  }
`;
