import React, { useEffect, useState } from "react"
import StarIcon from "@material-ui/icons/Star"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import DeleteIcon from "@material-ui/icons/Delete"
import UpdateIcon from "@material-ui/icons/Update"
import { useDispatch } from "react-redux"
import UpdateTodoComponent from "../update-todo/update-todo.component"
import { deleteTodo, refreshComponent, pinTodo } from "../../store/todo.slice"
import "./todo-stick.styles.css"

const TodoStickComponent = ({ refObj }) => {
  const { ref, data } = refObj
  const [changeTodoData, setChangeTodoData] = useState<any>()
  const [changeStarredData, setChangeStarredData] = useState<any>()
  const [openDetail, setOpenDetail] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshComponent(changeTodoData))
    dispatch(refreshComponent(changeStarredData))
  }, [changeTodoData, changeStarredData])

  const handleTodoDelete = async () => {
    const values = {
      refId: ref["@ref"].id,
      collection: ref["@ref"].collection["@ref"].id,
    }
    try {
      dispatch(deleteTodo(values.refId))
      const res = await fetch("/.netlify/functions/delete_todos", {
        method: "POST",
        body: JSON.stringify(values),
      })
      setChangeTodoData(await res.json())
    } catch (error) {
      console.log(error)
    }
  }

  const handleStarredUpdate = async value => {
    const values = {
      refId: ref["@ref"].id,
      collection: ref["@ref"].collection["@ref"].id,
      starred: value,
    }
    try {
      dispatch(pinTodo(data.id))
      const res = await fetch("/.netlify/functions/pin_unpin", {
        method: "POST",
        body: JSON.stringify(values),
      })
      setChangeStarredData(await res.json())
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
            {data.starred ? (
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
            {data.task}
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
        prev={data.task}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        refObj={{
          refId: ref["@ref"].id,
          collection: ref["@ref"].collection["@ref"].id,
        }}
      />
    </>
  )
}

export default TodoStickComponent
