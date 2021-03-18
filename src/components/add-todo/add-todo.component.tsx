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
import "./add-todo.styles.css"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { refreshComponent } from "../../store/todo.slice"

const AddTodoComponent = () => {
  const [open, setOpen] = React.useState(false)
  const [addTodoData, setAddTodoData] = useState<any>()
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(refreshComponent(addTodoData))
  }, [addTodoData])

  const addTodo = async (values: any) => {
    try {
      const res = await fetch("/.netlify/functions/create_todo", {
        method: "POST",
        body: JSON.stringify(values),
      })
      setAddTodoData(await res.json())
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: { todo: "" },
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
      setOpen(false)
    },
  })

  return (
    <div className="crud-component__add-todo">
      <button
        className="crud-component__add-todo__btn"
        onClick={handleClickOpen}
      >
        Add Todo
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Add a Todo</DialogTitle>
          <DialogContent className="crud-component__add-todo__dialog-content">
            <DialogContentText>
              Write the name of todo and click Add Todo to list your todo so
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
              &nbsp;Add Todo
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default AddTodoComponent
