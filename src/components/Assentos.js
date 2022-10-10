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
    const navigate = useNavigate();
    const [infoFilme,setInfoFilme]= useState(undefined);
    const [assentos, setAssentos] = useState(undefined);
    const [assentosSelecionados, setAssentosSelecionados] = useState([]);
    const [error, setError] = useState(false); 
    const { horariosId } = useParams();
    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${horariosId}/seats`)
    
        promise.then((res) => {
          setAssentos(res.data.seats)
          setInfoFilme(res.data)
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
        const nomes= assentosSelecionados.map((value)=>value.name)
        const horario= infoFilme.name;
        const data= infoFilme.day.date;
        const dia= infoFilme.day.weekday;
        const filme= infoFilme.movie.title;
        const body = {ids,name,cpf}
        console.log(body);
        const promise = axios.post(URL, body)
        
        promise.then(() => {
          alert("Lugares Reservados")
          // mudar de página
          navigate('/sucesso', {
            state: {
              name,
              cpf,
              nomes,
              horario,
              data,
              dia,
              filme,
            },
          });
        })
    
        promise.catch((err) => {
          alert(err.response.data.mensagem)
        })        

      }

      return(
        <>
        <DivAssentos>
            <h1>Selecione o(s) assento(s)</h1>
            <ConteinerAssentos>
                {assentos.map((a)=><Assento key={a.id} assento={a} selecionaAssento={selecionaAssento}/>)}
            </ConteinerAssentos>
            <DivLegenda>
              <Legenda><AssentoStyle className="selected"></AssentoStyle><p>Selecionado</p></Legenda>
              <Legenda><AssentoStyle></AssentoStyle><p>Disponível</p></Legenda>
              <Legenda><AssentoStyle className="unavailable"></AssentoStyle><p>Indisponível</p></Legenda>
            </DivLegenda>
        <form onSubmit={reservaLugares}>
          <DivImput>
            <label htmlFor="name" className="title">Nome do comprador:</label>
            <input
              placeholder="Digite seu nome..."
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
              placeholder="Digite seu CPF..."
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
        <Footer>
            <img src={infoFilme? infoFilme.movie.posterURL: ""}/>
            <DivInfoSessao>
              <p>{infoFilme? infoFilme.movie.title: ""}</p>
              <p>{infoFilme? `${infoFilme.day.weekday} - ${infoFilme.name}` : ""}</p>
            </DivInfoSessao>
        </Footer>
        </>
      )
} 
const DivAssentos=styled.div`
    display:flex;
    width:100%;
    flex-direction: column;
    align-items: center;
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
    button{   
      width: 225px;
      height: 42px;
      background: #E8833A;
      border-radius: 3px;
      border:none;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      color: #FFFFFF;
      margin-top:50px;
      margin-bottom:30px;
    }
    form{
      display:flex;
      flex-direction: column;
      align-items: center;
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
    border: 1px solid #808F9D;
    margin:5px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    color: #000000;

    &.selected {
        background-color: #1AAE9E;
        border: 1px solid #0E7D71;
      }

    &.unavailable {
      background-color: #FBE192;
      border-color: #F7C52B;
    }
` 
const DivLegenda=styled.div`
    display:flex;
    width:300px;   
    margin-top:5px;
    margin-bottom:50px;
    justify-content:space-around;
    align-items: center;
`
const Legenda=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    color: #4E5A65;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
`
const DivImput= styled.div`
    width:320px;
    display:flex;
    flex-direction:column;
    margin-top:5px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #293845;

    input{
      width:100%;
      height: 40px;
      background: #FFFFFF;
      border: 1px solid #D5D5D5;
      border-radius: 3px;
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 400;
      font-size: 18px;
      color: #AFAFAF;
    }
    
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

    img{
        width: 48px;
        height: 72px;
        padding-left:20px;
    }
    p{
        color: #293845;
        font-family: 'Roboto'!important;
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        margin-left:30px;
        margin-top:5px;
    }
`
const DivInfoSessao= styled.div`
    display:flex;
    flex-direction: column;
`