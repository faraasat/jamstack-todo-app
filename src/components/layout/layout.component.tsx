import * as React from "react"
import "./layout.styles.css"
import HeaderComponent from "../header/header.component"
import FooterComponent from "../footer/footer.component"

const Layout = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      <main className="crud-component__layout-main">{children}</main>
      <FooterComponent />
    </>
  )
}

export default Layout
