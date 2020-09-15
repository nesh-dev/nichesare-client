import { ApolloClient, InMemoryCache } from '@apollo/client';
const appLink = `${process.env.REACT_APP_LINK}`;
// console.log(appLink, '>>>>>>>')

const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql',
    cache: new InMemoryCache()
  });


export default client;
