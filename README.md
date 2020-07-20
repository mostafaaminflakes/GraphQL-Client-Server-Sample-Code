# GraphQL-Client-Server-Sample-Code

![](./client/public/images/graphql.jpg?raw=true)

This example is using **GraphQL** to store, retrieve and manipulate books and authors data.

The front end is using **Reactjs** and **Apollo** which will be able to make queries to the graphql server and retrieve data back into the browser.

The back end is using **GraphQL** server on **Nodejs** using **Express** to describe how the graph looks (types of data on the graph, and the relations between those types), and setup different entry points into the graph. This is hooked up with two different types of data storage:

1. Flat javascript local array.
2. Mongodb online database instance.

**Tip 1**: Use **Graphiql** tool from the browser to simulate making queries from the front end to the GraphQL server.

**Tip 2**: You can change the data source for the app by editing the variable **[schema]** in the file **[./server/app.js]** and use either local or remote data source, default is local.

## Downloading GraphQL-Client-Server-Sample-Code

You can install **GraphQL-Client-Server-Sample-Code** as follows:

```bash
cd folder/to/clone-into/
git clone https://github.com/mostafaaminflakes/GraphQL-Client-Server-Sample-Code.git
```

## Dependencies

Make sure to install the following dependencies:

**Server**

-   express
-   graphql
-   express-graphql
-   lodash
-   mongoose

**Client**

-   react
-   apollo-boost
-   react-apollo
-   graphql
-   lodash

**Tip**: You may run **[npm install]** from inside both client and server folders to install the required dependencies.

## Usage

You need two instances of cmd:

![](./client/public/images/terminal.jpg?raw=true)

_1. To run the server:_

```bash
   cd path/to/server/folder/
   node app
```

Then open your browser at [localhost:4000/graphql]

_2. To run the client:_

```bash
   cd path/to/client/folder/
   npm start
```

Then open your browser at [localhost:3000]
