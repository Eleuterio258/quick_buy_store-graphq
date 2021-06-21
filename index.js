const { ApolloServer } = require("apollo-server");

const { sequelize } = require("./models");

const resolvers = require("./graphql/resolvers.js");
const typeDefs = require("./graphql/typeDefs.js");
const contextMiddleware = require('./middleware/tokenMiddleware')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,


});

server.listen().then(({ url }) => {
  console.log("SERVIDOR INICIADO NA PORTA", url);

  sequelize
    .authenticate()
    .then(() => console.log("Connection successfully."))
    .catch((err) => console.log("Unable to connect to the database:"));
});
