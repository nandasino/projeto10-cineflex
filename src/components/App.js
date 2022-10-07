import GlobalStyle from "../GlobalStyle"
import Navbar from "./Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App(){
    return(
    <BrowserRouter>
    <GlobalStyle />
      <Navbar />
      <Routes>
      </Routes>
    </BrowserRouter>
    )
}