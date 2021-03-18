import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const TodoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    todos: { getTodos: [] },
    updateId: {},
    allTodos: { getTodos: [] },
  },
  reducers: {
    getTodos: (state, action) => {
      state.allTodos = action.payload
      if (
        state.todos.getTodos.length === 0 ||
        state.allTodos.getTodos !== state.todos.getTodos
      ) {
        state.todos = action.payload
      }
    },
    searchTodos: (state, action) => {
      const abc = state.allTodos.getTodos.filter(da => {
        return da.task.toLowerCase().includes(action.payload.toLowerCase())
      })
      state.todos = { getTodos: [...abc] }
    },
    refreshComponent: (state, action) => {
      state.updateId = action.payload
    },
    deleteTodo: (state, action) => {
      const abc = state.allTodos.getTodos.filter(da => {
        return String(da.refId) !== String(action.payload)
      })
      state.todos = { getTodos: [...abc] }
    },
    pinTodo: (state, action) => {
      state.todos = {
        getTodos: state.allTodos.getTodos.map(datum => {
          if (datum.id === action.payload) {
            var temp = Object.assign({}, datum)
            temp.starred = !temp.starred
            return temp
          }
          return datum
        }),
      }
    },
  },
})

export const {
  searchTodos,
  refreshComponent,
  deleteTodo,
  pinTodo,
  getTodos,
} = TodoSlice.actions
export const selectTodoData = (state: any) => ({
  todoData: state.todoReducer.todos,
  allTodos: state.todoReducer.allTodos,
  updateId: state.todoReducer.updateId,
})
export const TodoSliceReducer = TodoSlice.reducer
