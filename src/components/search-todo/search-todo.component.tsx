import React from "react"
import "./search-todo.styles.css"
import { searchTodos } from "../../store/todo.slice"
import { useDispatch } from "react-redux"

const SearchTodoComponent = () => {
  const dispatch = useDispatch()
  const handleSearchChange = (event: any) => {
    dispatch(searchTodos(event.target.value))
  }

  return (
    <div className="crud-component__search-todo">
      <input
        type="text"
        className="crud-component__search-todo__input"
        placeholder="Search Todos"
        id="search-todos"
        onChange={e => handleSearchChange(e)}
      />
    </div>
  )
}

export default SearchTodoComponent
