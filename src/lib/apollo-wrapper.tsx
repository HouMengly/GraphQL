"use client";

import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client/react";

function makeClient() {
  const httpUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/graphql";
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000/graphql";

  // 1. HTTP Link (Queries & Mutations)
  const httpLink = new HttpLink({
    uri: httpUrl,
  });

  // 2. WebSocket Link (Subscriptions)
  const wsLink = new GraphQLWsLink(
    createClient({
      url: wsUrl,
    })
  );

  // 3. Split Link: Use WS for subscriptions, HTTP for the rest
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const client = makeClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}