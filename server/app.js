const express = require("express");
const graphqlHTTP = require("express-graphql");

// Initialize express
const app = express();

// schema = define object types, relations between types, and define root queries
// schema in this example has 2 variations, local and remote
// local: just a local array
// remote: using mongoose models to define data stored in remote MongoDB instance

// 01 - local
//const schema = require("./schema/schema_local");
// End 01 - local

// 02 - remote
const schema = require("./schema/schema_remote");
// mongoose ORM for remote MongoDB
const mongoose = require("mongoose");
// Change <username>, <password> and <dbname> to your credentials
//const uri = "mongodb+srv://<username>:<password>@cluster0-4rff6.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
    console.log("Connected to remote database!");
});
// End 02 - remote

// Allow [Cross-Origin Resource Sharing] to let the server accepts requests from another server [client]
const cors = require("cors");
app.use(cors());

// Middleware for interacting with GraphQL requests using express-graphql
// You should pass a schema to the middleware to let it know how the graph will look
// Also use [graphiql] for better GUI queries
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

// Tell [app] to listen to a specific port
app.listen(4000, () => {
    console.log("Now listening to requests.");
});
