import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchTodos: any = createAsyncThunk(
  "data/fetchTodos",
  async (data, thunkAPI) => {
    const response = await fetch("/.netlify/functions/get_todos")
    return await response.json()
  }
)

export const TodoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    todos: { getTodos: [] },
    updateId: {},
    todoLoading: false,
    allTodos: { getTodos: [] },
  },
  reducers: {
    getTodos: (state, action) => {
      state.allTodos = action.payload
      if (state.todos.getTodos.length === 0) {
        state.todos = action.payload
      }
    },
    searchTodos: (state, action) => {
      const abc = state.allTodos.getTodos.filter(da => {
        return da.task.toLowerCase().includes(action.payload.toLowerCase())
      })
      console.log(abc)
      state.todos = { getTodos: [...abc] }
      console.log(state.todos)
    },
    refreshComponent: (state, action) => {
      state.updateId = action.payload
    },
    deleteTodo: (state, action) => {
      const abc = state.allTodos.getTodos.filter(da => {
        return da.ref["@ref"].id !== action.payload
      })
      state.allTodos = { getTodos: [...abc] }
      state.todos = { getTodos: [...abc] }
    },
    pinTodo: (state, action) => {
      state.todos = {
        getTodos: state.allTodos.getTodos.map(datum => {
          if (datum.getTodos.id === action.payload) {
            var temp = Object.assign({}, datum)
            temp.getTodos.starred = !temp.getTodos.starred
            return temp
          }
          return datum
        }),
      }
    },
  },
  extraReducers: {
    [fetchTodos.fulfilled]: (state, action) => {
      state.todos = action.payload
      state.allTodos = action.payload
      state.todoLoading = false
    },
    [fetchTodos.reject]: (state, action) => {
      console.log("fetchTodos Rejected")
      state.todoLoading = false
    },
    [fetchTodos.pending]: (state, action) => {
      state.todoLoading = true
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
  todoLoading: state.todoReducer.todoLoading,
})
export const TodoSliceReducer = TodoSlice.reducer
