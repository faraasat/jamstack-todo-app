import { configureStore } from "@reduxjs/toolkit"
import React from "react"
import { ApolloProvider } from "@apollo/client"
import { Provider } from "react-redux"
import { TodoSliceReducer } from "./store/todo.slice"
import { client } from "./apollo/client"

const store = configureStore({
  reducer: {
    todoReducer: TodoSliceReducer,
  },
})

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>{element}</Provider>
    </ApolloProvider>
  )
}
