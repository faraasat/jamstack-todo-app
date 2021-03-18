import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import AddTodoComponent from "../add-todo/add-todo.component"
import SearchTodoComponent from "../search-todo/search-todo.component"
import "./small-nav.styles.css"

const SmallNavComponent = () => {
  return (
    <div className={"crud-component__small-nav"}>
      <AppBar position="static">
        <Toolbar className="crud-component__alignment">
          <SearchTodoComponent />
          <AddTodoComponent />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default SmallNavComponent
