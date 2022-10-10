import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"


function Assento({ assento, selecionaAssento }) {
  return (
    <>
      <AssentoStyle
        className={`${assento.isAvailable ? "" : "unavailable"} ${
          assento.selected ? "selected" : ""
        }`}
        onClick={() => selecionaAssento(assento)}
      >
        {assento.name}
      </AssentoStyle>
    </>
  );
}

export default function Assentos(){
    const [name, setName] = useState("");
	  const [cpf, setCpf] = useState("");
    const navigate = useNavigate()
    const [assentos, setAssentos] = useState(undefined)
    const [assentosSelecionados, setAssentosSelecionados] = useState([]);
    const [error, setError] = useState(false) 
    const { horariosId } = useParams()
    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${horariosId}/seats`)
    
        promise.then((res) => {
          setAssentos(res.data.seats)
          console.log(res.data)
        })
    
        promise.catch((err) => {
          console.log(err.response.data)
        })
    },[])

      if (error === true) {
        return <div>Erro na requisição! Tente de novo</div>
      }
    
      if (!error && assentos === undefined) {
        return <div>Carregando...</div>
      }

      function selecionaAssento(assento) {
        if (!assento.isAvailable) {
          return;
        }
        assento.selected = !assento.selected;
    
        if (!assento.selected) {
          const filtroAssentos = assentosSelecionados.filter((s) => !(s.id === assento.id));
          setAssentosSelecionados([...filtroAssentos]);
          return;
        }
        setAssentosSelecionados([...assentosSelecionados, assento]);
        return;
      }
      console.log(assentosSelecionados);
      
      function reservaLugares(e){
        e.preventDefault()
        const URL = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many"
        const ids= assentosSelecionados.map((value)=>value.id)
        const body = {ids,name,cpf}
        console.log(body);
        const promise = axios.post(URL, body)
        
        promise.then(() => {
          alert("Lugares Reservados")
          // mudar de página
          navigate("/")
        })
    
        promise.catch((err) => {
          alert(err.response.data.mensagem)
        })        

      }

      return(
        <DivAssentos>
            <h1>Selecione o(s) assento(s)</h1>
            <ConteinerAssentos>
                {assentos.map((a)=><Assento key={a.id} assento={a} selecionaAssento={selecionaAssento}/>)}
            </ConteinerAssentos>
        <form onSubmit={reservaLugares}>
          <DivImput>
            <label htmlFor="name" className="title">Nome do comprador:</label>
            <input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              required
            />
          </DivImput>
          <DivImput>
            <label htmlFor="cpf" className="title">CPF do comprador:</label>
            <input 
              id="description"
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              type="number"
              required
            />
          </DivImput>   
          <button type="submit">Reservar assento(s)</button>        
        </form>
        </DivAssentos>
      )
} 
const DivAssentos=styled.div`
    display:flex;
    width:100%;
    flex-direction: column;
    align-items:center;
    margin-bottom:117px;
    h1{
        margin-top:107px;
        margin-bottom:30px;
        font-family: 'Roboto'!important;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        color: #293845;
    }
`

const ConteinerAssentos= styled.div`
    width:350px;
    display:flex;
    justify-content:center;
    flex-wrap: wrap;   
`
const AssentoStyle= styled.div`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #C3CFD9;
    margin:5px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;

    &.selected {
        background-color: #1AAE9E;
      }

    &.unavailable {
      background-color: #FBE192;
      border-color: #F7C52B;
    }
`
const DivImput= styled.div`
    width:100%;
`