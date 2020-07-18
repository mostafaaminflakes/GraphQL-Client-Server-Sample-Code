const graphql = require("graphql");
const _ = require("lodash");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
} = graphql;

// Dummy data
var books = [
    { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
    { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
    { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
    { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
    { name: "The Color of Magic", genre: "Fantasy", id: "5", authorId: "3" },
    { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" },
];
var authors = [
    { name: "Patrick", age: 44, id: "1" },
    { name: "Brandon", age: 42, id: "2" },
    { name: "Terry", age: 66, id: "3" },
];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        genre: {
            type: GraphQLString,
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // parent is book
                return _.find(authors, { id: parent.authorId });
            },
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        age: {
            type: GraphQLInt,
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // parent is author
                return _.filter(books, { authorId: parent.id });
            },
        },
    }),
});

// Define how the user will query and grab data from the front end
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Get data from DB or other resource
                return _.find(books, { id: args.id });
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Get data from DB or other resource
                return _.find(authors, { id: args.id });
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            },
        },
    },
});

module.exports = new GraphQLSchema({ query: RootQuery });

// Example queries
/*
{
    book(id:"1"){
        name
        genre
    }
}

//////////////////////////////////

{
    author(id:"2"){
        name
        age
    }
}

//////////////////////////////////

{
    book(id: "3") {
        name
        genre
        author{
            name
            age
        }
    }
}

//////////////////////////////////

{
    author(id: "3") {
        name
        age
        books{
            name
            genre
        }
    }
}

//////////////////////////////////

{
    books {
        name
        genre
    }
}

//////////////////////////////////

{
    authors {
        name
        age
    }
}

//////////////////////////////////

{
    authors {
        name
        age
        books{
            name
        }
    }
}

*/
