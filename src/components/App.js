import GlobalStyle from "../GlobalStyle"
import Navbar from "./Navbar"
import Home from "./Home"
import Filme from "./Filme"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App(){
    return(
    <BrowserRouter>
    <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sessoes/:filmeId" element={<Filme />}/>
      </Routes>
    </BrowserRouter>
    )
}