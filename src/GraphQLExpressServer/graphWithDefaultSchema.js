var {GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList,
    GraphQLEnumType,
    GraphQLUnionType} = require('graphql')
var {authors,books} = require('./data')
var {graphqlHTTP} = require('express-graphql')
function route(app){
   const BookType = new GraphQLObjectType({
       name: "Book",
       fields: ()=>({
           id: {type : GraphQLInt},
           name: {type: GraphQLString},
           authorId: {type:GraphQLInt},
           Author:{
            type: AuthorType,
            resolve: (book)=> authors.find(x=> x.id === book.authorId)
        }
       })
   });

   const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: ()=>({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        writeBooks:{
            type: new GraphQLList(BookType),
            resolve: (author)=>books.filter(x=>x.authorId === author.id)
        }
        })
    });

    var STATUS = new GraphQLEnumType({
        name: 'status',
        values: {
          READ: { value: "READ" },
          WRITE: { value: "WRITE" }
        }
      });
      var AnyType = new GraphQLUnionType({
        name: 'any',
        types: ()=> [ BookType,AuthorType ],
        resolveType: (value)=>{
          return value.authorId ? BookType:AuthorType
        }
      });


    const RootGraph = new GraphQLObjectType({
        name: "Query",
        fields: ()=>({
            Books: {
                type: new GraphQLList(BookType),
                resolve: ()=> books
            },
            Authors:{
                type: new GraphQLList(AuthorType),
                resolve: ()=> authors
            },
            Book:{
                type: BookType,
                args: {
                    id:{type: new GraphQLNonNull(GraphQLInt) , defaultValue: 1}
                },
                resolve: (parent,args)=> books.find(x=> x.id === args.id)
            },
            Author:{
                type: AuthorType,
                args: {
                    id:{type: new GraphQLNonNull(GraphQLInt)}
                },
                resolve: (parent,args)=> authors.find(x=> x.id === args.id)
            },
            State:{
                type : GraphQLString,
                args: {
                    status: {type: STATUS}
                },
                resolve: (parent,args)=>args.status
            },
            search:{
                type: new GraphQLList(AnyType),
                args:{ text: {type: new GraphQLNonNull(GraphQLString)}},
                resolve: (parent,args)=> (books.concat(authors)).filter(x=> x.name.match(args.text))
            }
        })
    });

    const schema = new GraphQLSchema({
        query: RootGraph
      })

      app.use("/graphql",graphqlHTTP({
        schema: schema,
        graphiql: true
      })
    );
}

module.exports = route