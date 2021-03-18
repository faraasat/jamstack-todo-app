import React, { useEffect } from "react"
import TodoStickLoadingComponent from "../todo-stick-loading/todo-stick-loading.component"
import TodoStickComponent from "../todo-stick/todo-stick.component"
import MoodBadIcon from "@material-ui/icons/MoodBad"
import cuid from "cuid"
import "./todo-list.styles.css"
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { getTodos, selectTodoData } from "../../store/todo.slice"

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
  const { data, loading, error } = useQuery(GET_DATA)
  let sortedTodos = { data: [] }
  const dispatch = useDispatch()
  const { todoData, allTodos } = useSelector(selectTodoData)

  if (data && data !== allTodos) {
    dispatch(getTodos(data))
  }

  if (
    typeof data != "undefined" &&
    !loading &&
    todoData.getTodos.length !== 0
  ) {
    sortedTodos = {
      data: [
        ...todoData.getTodos.filter(todoData => {
          return todoData.starred === true
        }),
        ...todoData.getTodos.filter(todoData => {
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
