import React from "react"
import ReactDom from "react-dom"
import Footer from "./layouts/Footer"
import UserMenu from "./layouts/UserMenu"
import NavBar from "./layouts/NavBar"
import MainContent from "./layouts/MainContent"

function App(){
    return (
        <div>
            <UserMenu />
            <NavBar />
            <MainContent />
            <Footer />
        </div>
    )
}

ReactDom.render(<App />, document.getElementById("root"))