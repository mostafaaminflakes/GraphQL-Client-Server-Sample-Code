import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookListWithProps2 extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: null };
    }

    displayBooks() {
        var data = this.props.data;
        if (data.loading) {
            return <div>Loading...</div>;
        } else {
            return data.books.map((book) => {
                return (
                    <li
                        key={book.id}
                        onClick={(e) => {
                            this.setState({ selected: book.id });
                        }}
                    >
                        <p>
                            {book.name} - {book.genre}
                        </p>
                    </li>
                );
            });
        }
    }
    render() {
        return (
            <div>
                <ul id="book-list">{this.displayBooks()}</ul>
                <BookDetails bookId={this.state.selected} />
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookListWithProps2);
