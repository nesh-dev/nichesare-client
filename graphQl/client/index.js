import { ApolloClient, InMemoryCache } from '@apollo/client';
const appLink = `${process.env.NEXT_PUBLIC_API_URL}`;
// console.log(appLink, '>>>>>>>')

const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql',
    cache: new InMemoryCache()
  });


export default client;
