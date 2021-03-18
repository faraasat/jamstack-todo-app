import React from "react"
import "./todo-stick-loading.styles.css"

const TodoStickLoadingComponent = () => {
  return (
    <div className="crud-component__stick-loading">
      <div className="crud-component__stick-loading_box"></div>
      <div className="crud-component__stick-loading_text">
        Please be patient! Loading your Todos...
      </div>
      <div className="crud-component__stick-loading_box"></div>
      <div className="crud-component__stick-loading_box"></div>
    </div>
  )
}

export default TodoStickLoadingComponent
