import GlobalStyle from "../GlobalStyle"
import Navbar from "./Navbar"
import Home from "./Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App(){
    return(
    <BrowserRouter>
    <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
    )
}