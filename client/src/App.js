import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Components
// The [BookList] component is implemented with 4 approaches, but usage is the same
import BookListWithProps1 from "./components/BookListWithProps1";
//import BookListWithProps2 from "./components/BookListWithProps2";
//import BookListWithHooks from "./components/BookListWithHooks";
//import BookListWithHOC from "./components/BookListWithHOC";

import AddBook from "./components/AddBook";

// Apollo client setup
const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div id="main">
                    <h1>GraphQL Book List</h1>
                    {/* Use either approach of the following */}
                    <BookListWithProps1 />
                    {/* <BookListWithProps2 /> */}
                    {/* <BookListWithHooks /> */}
                    {/* <BookListWithHOC /> */}
                    <AddBook />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
