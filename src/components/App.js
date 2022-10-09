import GlobalStyle from "../GlobalStyle"
import Navbar from "./Navbar"
import Home from "./Home"
import Filme from "./Filme"
import Assentos from "./Assentos"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App(){
    return(
    <BrowserRouter>
    <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sessoes/:filmeId" element={<Filme />}/>
        <Route path="/assentos/:horariosId" element={<Assentos />} />
      </Routes>
    </BrowserRouter>
    )
}