const { ApolloServer, gql } = require('apollo-server');
const {userModel,emailUserModel,normalUserModel,phoneUserModel} = require("../MongoConnect/DiscriminatorDemo")
const build = require('./connectDB');

const mongoose = build();

const typeDefs = gql`
   interface User{
       id: String
       password: String
   }

   type NormalUser implements User{
       id: String!
       password: String
       username: String!
   }

   type EmailUser implements User{
       id: String!
       password: String
       email: String!
   }

   type PhoneUser implements User{
       id: String!
       password: String
       phone: String
   }

   type Query{
       Users : [User!]
       SearchUsers(type:String): [User!]
   }
`;
const PHONE = "phoneuser",EMAIL = "emailuser",NORMAL = "normaluser";

const resolvers = {
    User:{
        __resolveType(x){
            switch (x.userType){
                case PHONE:
                    return 'PhoneUser';
                case EMAIL:
                    return 'EmailUser';
                default:
                    return 'NormalUser';
            }
        }
    },
    Query:{
        Users:() => {return userModel.find({});},
        SearchUsers :(parent,args) => { return userModel.find({userType : { "$regex" : `${args.type}`  } })}
    }
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀🚀🚀  Server ready at ${url}`);
  });

