import { configureStore } from "@reduxjs/toolkit"
import React from "react"
import { Provider } from "react-redux"
import { TodoSliceReducer } from "./todo.slice"

const store = configureStore({
  reducer: {
    todoReducer: TodoSliceReducer,
  },
})

export const wrapRootElement = ({ element }) => {
  return <Provider store={store}>{element}</Provider>
}
