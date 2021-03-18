import React, { useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import CancelIcon from "@material-ui/icons/Cancel"
import "./update-todo.styles.css"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { refreshComponent } from "../../store/todo.slice"

const UpdateTodoComponent = ({ prev, openDetail, setOpenDetail, refObj }) => {
  const [addTodoData, setAddTodoData] = useState<any>()
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpenDetail(false)
  }

  useEffect(() => {
    dispatch(refreshComponent(addTodoData))
  }, [addTodoData])

  const addTodo = async (values: any) => {
    if (prev === values.todo || prev === "" || prev.length <= 3) return
    try {
      const res = await fetch("/.netlify/functions/update_todo", {
        method: "POST",
        body: JSON.stringify({
          task: values.todo,
          refId: refObj.refId,
          collection: refObj.collection,
        }),
      })
      setAddTodoData(await res.json())
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      todo: prev,
    },
    validate: (values: any) => {
      const errors = { todo: "" }
      if (!values.todo) {
        errors.todo = "Required"
        return errors
      } else if (values.todo.length >= 1 && values.todo.length <= 3) {
        errors.todo = "More Than 3 characters are required"
        return errors
      }
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      addTodo(values)
      setSubmitting(false)
      resetForm()
      setOpenDetail(false)
    },
  })

  return (
    <div className="crud-component__update-todo">
      <Dialog
        open={openDetail}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Update a Todo</DialogTitle>
          <DialogContent className="crud-component__update-todo__dialog-content">
            <DialogContentText>
              Write the name of todo and click Update Todo to list your todo so
              that you can remember What <b>Todo</b>?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Your Todo"
              type="text"
              id="todo"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.todo}
              helperText={
                formik.errors.todo && formik.touched.todo
                  ? formik.errors.todo
                  : ""
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              className="crud-component__btn-cancel"
            >
              <CancelIcon />
              &nbsp;Cancel
            </Button>
            <button
              type="submit"
              className="crud-component__btn-add"
              disabled={formik.isSubmitting}
            >
              <AddCircleIcon />
              &nbsp;Update Todo
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default UpdateTodoComponent
