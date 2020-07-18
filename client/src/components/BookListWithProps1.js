import React, { Component } from "react";
import { Query } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookListWithProps1 extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: null };
    }

    render() {
        return (
            <div>
                <Query query={getBooksQuery}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        return (
                            <div className="characters">
                                <ol id="book-list">
                                    {data.books.map((book) => (
                                        <li
                                            key={book.id}
                                            onClick={(e) => {
                                                this.setState({
                                                    selected: book.id,
                                                });
                                            }}
                                        >
                                            <p>Name: {book.name}</p>
                                            <p>Genre: {book.genre}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        );
                    }}
                </Query>
                <BookDetails bookId={this.state.selected} />
            </div>
        );
    }
}

export default BookListWithProps1;
