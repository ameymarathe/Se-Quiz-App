import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import Questions from "./Components/questions";

import "./App.css";

const client = new ApolloClient({
  uri: "http://140.238.164.148/graphql"
});

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header>
          <div>FY20 India SE Cloud Symposium - Quiz</div>
        </header>
        <Questions />
      </div>
    </ApolloProvider>
  );
}

export default App;
