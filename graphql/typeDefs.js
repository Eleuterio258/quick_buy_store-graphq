const { gql } = require("apollo-server");
module.exports = gql`
  type User {
    id: ID!
    username: String!
    fullname: String
    email: String
    createdAt: String
    updatedAt: String!
    token: String!
    phone:String!
    status:String!
    role_id:String!
    imageUrl: String
    expiresIn: String!
  }

  type Product {
    name:String
    description: String
    image_id: Int
    brand: String
    price: Float
    stock: Int 
    featured: Boolean 
    status: Int
  }

  type Role {
    id: ID!
    name: String!
    slug: String!
  }
   

     
  

  type Query {
    getUsers: [User]!
    login(username: String!, password: String!): User!
    role: [Role!]
    getProducts :[Product!]
   
  }

  type Mutation {
    regiterProduct(name:String! description: String! brand: String! price: Float stock: Int  featured: Boolean):Product
    regiter(username: String! email: String! password: String! confirmPassword: String! phone: String! fullname:String!): User!
  }
`;
