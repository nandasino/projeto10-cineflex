import styled from "styled-components"
import axios from "axios"
import Banner from "./Banner"
import { useEffect, useState } from "react"

export default function Home(){
    const [filmes, setFilmes] = useState(undefined)
    const [error, setError] = useState(false) 
    useEffect(() => {
        const URL = "https://mock-api.driven.com.br/api/v5/cineflex/movies"
        const promise = axios.get(URL)
    
        promise.then((res) => {
          //console.log(res.data)
          setFilmes(res.data)
        })
    
        promise.catch((err) => {
          console.log(err.response.data)
        
          setError(true)
        })
      }, []);

      if (error === true) {
        return <div>Erro na requisição! Tente de novo</div>
      }
    
      if (!error && filmes === undefined) {
        return <div>Carregando...</div>
      }
      
    return(
        <DivHOme>
            <h1>Selecione o filme</h1>
            <ContainerFilmes>
            {filmes.map((filme) => <Banner key={filme.id} filme={filme}/>)}            
            </ContainerFilmes>
        </DivHOme>
    )
}
const DivHOme= styled.div`
    display:flex;
    width:100%;
    flex-direction: column;
    align-items:center;
    h1{
        margin-top:107px;
        margin-bottom:40px;
        font-family: 'Roboto'!important;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        color: #293845;
    }
`
const ContainerFilmes= styled.div`
    display:flex;
    width: 90%;
    box-sizing:border-box;
    flex-wrap: wrap;
    justify-content:space-around ;
`