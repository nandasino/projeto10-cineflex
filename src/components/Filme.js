import axios from "axios"
import styled from "styled-components"
import Sessoes from "./Sessoes"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Filme(){
    const [filme, setFilme] = useState(undefined)
    const [error, setError] = useState(false) 
    const { filmeId } = useParams()

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmeId}/showtimes`)
    
        promise.then((res) => {
          setFilme(res.data)
        })
    
        promise.catch((err) => {
          console.log(err.response.data)
        })
      },[])
      if (error === true) {
        return <div>Erro na requisição! Tente de novo</div>
      }
    
      // Se eu ainda não tive resultado da requisição de imagens, mostre o carregando
      if (!error && filme === undefined) {
        return <div>Carregando...</div>
      }
      
    return(
        <>
        <DivSessao>
            <h1>Selecione o horário</h1>
            <ContainerSessao>
                {filme.days.map((f)=><Sessoes dia={f.weekday} data={f.date} horarios={f.showtimes}/>)}
            </ContainerSessao>
        </DivSessao>
        <Footer>
            <DivBanner data-identifier="movie-img-preview"><img src={filme.posterURL}/></DivBanner>
            <p data-identifier="movie-and-session-infos-preview">{filme.title}</p>
        </Footer>
        </>
    )
}
const DivSessao=styled.div`
    display:flex;
    width:100%;
    flex-direction: column;
    align-items:center;
    margin-bottom:117px;
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
const ContainerSessao= styled.div`
    display:flex;
    flex-direction: column;
`
const Footer=styled.div`
    width:100%;
    display:flex;
    position:fixed;
    z-index:1;
    bottom:0;
    left:0;
    height: 117px;
    background: #C3CFD9;
    align-items:center;
    p{
        color: #293845;
        font-family: 'Roboto'!important;
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        margin-left:30px;
    }
`
const DivBanner=styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 89px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    margin-left:20px;
    img{
        width: 48px;
        height: 72px;
    }
`