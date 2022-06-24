const express = require("express");
const colors = require("colors");
require("dotenv").config();
const schema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

const app = express();
//Connect to database
connectDB();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
