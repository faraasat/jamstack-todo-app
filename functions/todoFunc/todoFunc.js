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
  type Mutation {
    addTodo(task: String!): Todos
    deleteTodo(refId: String!): Todos
    updateTodo(refId: String!, task: String!): Todos
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
        console.log(error)
      }
    },
  },
  Mutation: {
    addTodo: async (_, { task }) => {
      try {
        var adminClient = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
        })
        const result = JSON.stringify(
          await adminClient.query(
            q.Create(q.Collection("todoApp"), {
              data: {
                id: cuid(),
                task: task,
                starred: false,
              },
            })
          )
        )

        const parsedRes = JSON.parse(result)

        return {
          refId: parsedRes?.ref["@ref"].id,
          collectionName: parsedRes?.ref["@ref"].collection["@ref"].id,
          id: parsedRes?.data?.id,
          task: parsedRes?.data?.task,
          starred: parsedRes?.data?.starred,
        }
      } catch (error) {
        console.log(error)
      }
    },
    deleteTodo: async (_, { refId }) => {
      try {
        var adminClient = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
        })
        const result = JSON.stringify(
          await adminClient.query(
            q.Delete(q.Ref(q.Collection("todoApp"), refId))
          )
        )
        const parsedRes = JSON.parse(result)

        return {
          refId: parsedRes?.ref["@ref"].id,
          collectionName: parsedRes?.ref["@ref"].collection["@ref"].id,
          id: parsedRes?.data?.id,
          task: parsedRes?.data?.task,
          starred: parsedRes?.data?.starred,
        }
      } catch (error) {
        console.log(error)
      }
    },
    updateTodo: async (_, { refId, task }) => {
      try {
        var adminClient = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
        })
        const result = JSON.stringify(
          await adminClient.query(
            q.Update(q.Ref(q.Collection("todoApp"), refId), {
              data: { task: task },
            })
          )
        )
        const parsedRes = JSON.parse(result)

        return {
          refId: parsedRes?.ref["@ref"].id,
          collectionName: parsedRes?.ref["@ref"].collection["@ref"].id,
          id: parsedRes?.data?.id,
          task: parsedRes?.data?.task,
          starred: parsedRes?.data?.starred,
        }
      } catch (error) {
        console.log(error)
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
