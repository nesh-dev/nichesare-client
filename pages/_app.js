import "../styles/globals.css";
import { ApolloProvider} from "@apollo/client";
import client from "../graphQl/client/index";
import { ThemeProvider } from "@chakra-ui/core";


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
              <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
