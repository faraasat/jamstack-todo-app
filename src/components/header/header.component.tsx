import React from "react"
import "./header.styles.css"
import { Link } from "gatsby"

const HeaderComponent = () => {
  return (
    <nav className="crud-component__header">
      <div className="crud-component__container">
        <Link to="/" className="crud-component__header-brand">
          Todo Site
        </Link>
        <div className="crud-component__header-links">
          <Link to="/">Home</Link>
        </div>
      </div>
    </nav>
  )
}

export default HeaderComponent
