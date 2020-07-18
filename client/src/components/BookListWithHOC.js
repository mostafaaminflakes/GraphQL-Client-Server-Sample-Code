import React, { useState } from "react";
import { withApollo } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookListWithHOC({ client }) {
    const [books, setBooks] = useState([]);
    const [selectedBookId, setselectedBookId] = useState();

    client
        .query({ query: getBooksQuery })
        .then((res) => setBooks(res.data.books))
        .catch((err) => console.log(err));

    if (books.length > 0) {
        return (
            <div className="characters">
                <ul id="book-list">
                    {books.map((book) => (
                        <li
                            key={book.id}
                            onClick={(e) => {
                                setselectedBookId(book.id);
                            }}
                        >
                            <p>Name: {book.name}</p>
                            <p>Genre: {book.genre}</p>
                        </li>
                    ))}
                </ul>
                <BookDetails bookId={selectedBookId} />
            </div>
        );
    }
    return (
        <div className="App">
            <h2>Loading...</h2>
        </div>
    );
}

export default withApollo(BookListWithHOC);
