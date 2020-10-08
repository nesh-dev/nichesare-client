import { gql } from '@apollo/client';

export const GOOGLE_AUTH = gql `
    mutation authGoogle(
    $accessToken: String!
    ){
        authGoogle(,
            accessToken: $accessToken,
        ){
        token 
        user{
            name
            email
            profileAvatar 
        }
        }
    }
    
`; 
