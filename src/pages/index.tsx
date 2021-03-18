import * as React from "react"
import Layout from "../components/layout/layout.component"
import SEO from "../components/seo"
import "./index.styles.css"
import SmallNavComponent from "../components/small-nav/small-nav.component"
import TodoListComponent from "../components/todo-list/todo-list.component"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Index Page" />
      <div className="crud-page__index">
        <SmallNavComponent />
        <div className="crud-page__index__todos-list">
          <TodoListComponent />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
