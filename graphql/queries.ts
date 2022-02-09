import { gql } from "@apollo/client";

export const GET_RESORTS = gql`
  query resorts {
    resorts {
      name
      latitude
      longitude
      image
      country
      id
      instructors {
        firstName
        lastName
        rate
      }
    }
  }
`;
