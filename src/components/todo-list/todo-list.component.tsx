import React from "react"
import TodoStickLoadingComponent from "../todo-stick-loading/todo-stick-loading.component"
import TodoStickComponent from "../todo-stick/todo-stick.component"
import { useDispatch, useSelector } from "react-redux"
import { fetchTodos, selectTodoData } from "../../store/todo.slice"
import MoodBadIcon from "@material-ui/icons/MoodBad"
import cuid from "cuid"
import "./todo-list.styles.css"

const TodoListComponent = () => {
  const dispatch = useDispatch()
  const { todoData, updateId, todoLoading } = useSelector(selectTodoData)
  let sortedTodos = { data: [] }

  React.useEffect(() => {
    dispatch(fetchTodos())
  }, [updateId])

  if (todoData.data.length !== 0) {
    sortedTodos = {
      data: [
        ...todoData.data.filter(todoData => {
          return todoData.data.starred === true
        }),
        ...todoData.data.filter(todoData => {
          return todoData.data.starred === false
        }),
      ],
    }
  }

  return (
    <>
      {todoLoading && todoData.data.length === 0 ? (
        <>
          <TodoStickLoadingComponent key={cuid()} />
          <TodoStickLoadingComponent key={cuid()} />
          <TodoStickLoadingComponent key={cuid()} />
          <TodoStickLoadingComponent key={cuid()} />
        </>
      ) : todoData.data.length !== 0 && sortedTodos.data.length !== 0 ? (
        sortedTodos.data.map((todoData: any) => {
          return <TodoStickComponent key={todoData.id} refObj={todoData} />
        })
      ) : (
        !todoLoading &&
        todoData.data.length === 0 && (
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
