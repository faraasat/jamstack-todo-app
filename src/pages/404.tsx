import * as React from "react"
import Layout from "../components/layout/layout.component"
import NotFoundComponent from "../components/not-found/not-found.component"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <NotFoundComponent />
  </Layout>
)

export default NotFoundPage
