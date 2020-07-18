const graphql = require("graphql");
const _ = require("lodash");

// MongoDB models [collections] used to interact with collections inside Mongo server
const Book = require("../models/book");
const Author = require("../models/author");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
} = graphql;

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
                return Author.findById(parent.authorId); // [Author] = model/collection name
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
                return Book.find({ authorId: parent.id }); // [Book] = model/collection name
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Get data from DB or other resource
                return Book.findById(args.id);
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Get data from DB or other resource
                return Author.findById(args.id);
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({});
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            // args passed when using from graphiql to add data
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                // Feed up the created model with entered data
                let author = new Author({ name: args.name, age: args.age });
                // Save it to MongoDB, with [return] to bring back the saved data
                return author.save();
            },
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                });
                return book.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

// Example mutations
/*
mutation {
    addAuthor(name: "Patrick", age: 44) {
        name
        age
    }
}

//////////////////////////////////

mutation {
    addBook(name: "The Light Fantastic", genre: "Fantasy", authorId:"5ec1c781e9974302687d53a0") {
        name
        genre
    }
}
*/

// Example queries
/*
{
    books {
        name
        genre
        author {
            name
            age
        }
    }
}

//////////////////////////////////

{
    authors {
        name
        age
        books {
            name
        }
    }
}

//////////////////////////////////

{
    author(id: "5ec1c781e9974302687d53a0") {
        name
        age
        books {
            name
        }
    }
}
*/
