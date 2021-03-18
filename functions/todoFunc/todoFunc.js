const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb"),
  q = faunadb.query
const dotenv = require("dotenv")
dotenv.config()
const cuid = require("cuid")

const typeDefs = gql`
  type Query {
    getTodos: [Todos!]
  }
  type Todos {
    refId: String!
    collectionName: String!
    id: String!
    task: String!
    starred: Boolean!
  }
`

const resolvers = {
  Query: {
    getTodos: async (root, args, context) => {
      try {
        var adminClient = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
        })
        const result = JSON.stringify(
          await adminClient.query(
            q.Map(
              q.Paginate(q.Match(q.Index("todoId"))),
              q.Lambda(x => q.Get(x))
            )
          )
        )

        let todoArr = []
        JSON.parse(result).data.forEach(element => {
          todoArr = [
            ...todoArr,
            {
              refId: element?.ref["@ref"].id,
              collectionName: element?.ref["@ref"].collection["@ref"].id,
              id: element?.data?.id,
              task: element?.data?.task,
              starred: element?.data?.starred,
            },
          ]
        })

        return todoArr
      } catch (error) {
        console.log(error instanceof Error)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
