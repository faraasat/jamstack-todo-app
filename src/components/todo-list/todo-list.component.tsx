import React from "react"
import TodoStickLoadingComponent from "../todo-stick-loading/todo-stick-loading.component"
import TodoStickComponent from "../todo-stick/todo-stick.component"
import { useDispatch, useSelector } from "react-redux"
import { fetchTodos, selectTodoData } from "../../store/todo.slice"
import MoodBadIcon from "@material-ui/icons/MoodBad"
import cuid from "cuid"
import "./todo-list.styles.css"
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"

const GET_DATA = gql`
  query {
    getTodos {
      refId
      collectionName
      id
      task
      starred
    }
  }
`

const TodoListComponent = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useQuery(GET_DATA)
  let sortedTodos = { data: [] }

  // React.useEffect(() => {
  //   dispatch(fetchTodos())
  // }, [updateId])

  if (typeof data != "undefined" && !loading) {
    sortedTodos = {
      data: [
        ...data.getTodos.filter(todoData => {
          return todoData.starred === true
        }),
        ...data.getTodos.filter(todoData => {
          return todoData.starred === false
        }),
      ],
    }
  }

  if (error) {
    console.log(error)
    return <div>Error</div>
  }

  return (
    <>
      {loading && typeof data == "undefined" ? (
        <>
          <TodoStickLoadingComponent key={cuid()} />
          <TodoStickLoadingComponent key={cuid()} />
          <TodoStickLoadingComponent key={cuid()} />
          <TodoStickLoadingComponent key={cuid()} />
        </>
      ) : typeof data != "undefined" && sortedTodos.data.length !== 0 ? (
        sortedTodos.data.map((todoData: any) => {
          return <TodoStickComponent key={todoData.id} refObj={todoData} />
        })
      ) : (
        !loading &&
        typeof data != "undefined" && (
          <div className="crud-component__todo-list__nothing">
            <MoodBadIcon />
            Ooops! Nothing To show...
          </div>
        )
      )}
    </>
  )
}

export default TodoListComponent
