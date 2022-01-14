import { ChakraProvider } from "@chakra-ui/react";
import App from "next/app";
import theme from "../theme/theme";

class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    );
  }
}

export default MyApp;
