import { gql } from '@apollo/client';

export const REGISTER_USER = gql `
    mutation registerUser(
    $name: String!
    $email: String!
    $password: String!
    ){
        registerUser(
            name: $name,
            email: $email,
            password: $password
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
