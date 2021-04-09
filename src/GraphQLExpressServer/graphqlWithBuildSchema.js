var { graphqlHTTP } = require('express-graphql');
var { buildSchema,GraphQLString,GraphQLSchema,GraphQLObjectType } = require('graphql');
var { books,authors} = require("./data")

function route(app){
    
    // Construct a schema, using GraphQL schema language
    var schema = buildSchema(`
    type Book{
        id: Int!
        name: String
        authorId: Int
        getId:Int
    }
    type Author{
        id:Int!
        name:String
    }
    type Query{
        getBooks: [Book]
        getSpecializeBook(id:Int!): Book
        getAuthors: [Author]
    }
    `);
    
    // The root provides a resolver function for each API endpoint
    var root = {
    getBooks: () => books,
    getSpecializeBook: ({id})=>{
        return books.find(x => x.id === id);
    },
    getAuthors: ()=> authors
    };
    
    app.use("/graphql",graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
      })
    );
}

module.exports=route
