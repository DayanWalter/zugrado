"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";

/**
 * Apollo Client Provider component that wraps the app with GraphQL client
 * Exporting client so it can be used to clear cache when needed
 */
export const apolloClient = new ApolloClient({
  uri: "https://odyssey-lift-off-server.herokuapp.com/",
  cache: new InMemoryCache(),
});

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

export function ApolloProviderWrapper({
  children,
}: ApolloProviderWrapperProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
