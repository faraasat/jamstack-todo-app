import React, { useEffect, useState } from "react"
import StarIcon from "@material-ui/icons/Star"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import DeleteIcon from "@material-ui/icons/Delete"
import UpdateIcon from "@material-ui/icons/Update"
import { useDispatch } from "react-redux"
import UpdateTodoComponent from "../update-todo/update-todo.component"
import {
  deleteTodo as deleteMyTodo,
  refreshComponent,
  pinTodo,
} from "../../store/todo.slice"
import "./todo-stick.styles.css"
import { gql } from "graphql-tag"
import { useMutation, useQuery } from "@apollo/client"

const DELETE_TODO = gql`
  mutation deleteTodo($refId: String!) {
    deleteTodo(refId: $refId) {
      id
      refId
      collectionName
      task
      task
    }
  }
`

const STARRED_TODO = gql`
  mutation updateStarred($refId: String!, $starred: Boolean!) {
    updateStarred(refId: $refId, starred: $starred) {
      id
      refId
      collectionName
      task
      task
    }
  }
`

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

const TodoStickComponent = ({ refObj }) => {
  const [changeTodoData, setChangeTodoData] = useState<any>()
  const [changeStarredData, setChangeStarredData] = useState<any>()
  const [openDetail, setOpenDetail] = useState<boolean>(false)
  const [deleteTodo] = useMutation(DELETE_TODO)
  const [updateStarred] = useMutation(STARRED_TODO)
  const { refetch } = useQuery(GET_DATA)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshComponent(changeTodoData))
    dispatch(refreshComponent(changeStarredData))
  }, [changeTodoData, changeStarredData])

  const handleTodoDelete = async () => {
    dispatch(deleteMyTodo(refObj.refId))
    try {
      const res = deleteTodo({
        variables: {
          refId: refObj.refId,
          refetchQueries: [{ query: GET_DATA }],
        },
      })
      res.then(data => {
        setChangeTodoData(data.data)
        refetch()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleStarredUpdate = async value => {
    try {
      dispatch(pinTodo(refObj.id))
      const res = updateStarred({
        variables: {
          refId: refObj.refId,
          starred: value,
          refetchQueries: [{ query: GET_DATA }],
        },
      })
      res.then(data => {
        setChangeStarredData(data.data)
        refetch()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleTodoUpdate = () => {
    setOpenDetail(true)
  }

  return (
    <>
      <div className="crud-component__todo-stick">
        <div className="crud-component__todo-stick__content">
          <span className="crud-component__todo-stick__content-star">
            {refObj.starred ? (
              <StarIcon
                onClick={() => handleStarredUpdate(false)}
                style={{ color: "#7a9dff" }}
              />
            ) : (
              <StarBorderIcon
                onClick={() => handleStarredUpdate(true)}
                style={{ color: "#ff7ad3" }}
              />
            )}
          </span>
          <span className="crud-component__todo-stick__content-task">
            {refObj.task}
          </span>
          <div className="crud-component__todo-stick__content-icons">
            <span
              className="crud-component__todo-stick__content-delete"
              title="Delete"
              onClick={() => {
                handleTodoDelete()
              }}
            >
              {<DeleteIcon />}
            </span>
            <span
              className="crud-component__todo-stick__content-update"
              title="Update"
              onClick={() => {
                handleTodoUpdate()
              }}
            >
              {<UpdateIcon />}
            </span>
          </div>
        </div>
      </div>
      <UpdateTodoComponent
        prev={refObj.task}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        refObj={refObj}
      />
    </>
  )
}

export default TodoStickComponent
