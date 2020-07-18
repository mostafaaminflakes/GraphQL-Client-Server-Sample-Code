import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookListWithHooks() {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selectedBookId, setselectedBookId] = useState();

    if (error) {
        return <div>Error</div>;
    }

    if (loading) {
        return (
            <div className="App">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (data) {
        if (data.books.length > 0) {
            return (
                <div className="characters">
                    <ul id="book-list">
                        {data.books.map((book) => (
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
    }
}

export default BookListWithHooks;
