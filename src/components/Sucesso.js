import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom"
import styled from "styled-components"
export default function Sucesso() {
    const location = useLocation();
  
    return (
      <DivSucesso>
        <Mensagem>
          Pedido feito com sucesso!
        </Mensagem>
        <Filme>
          <h1>Filme e sessão</h1>
          <p data-identifier="movie-session-infos-reserve-finished">{location.state.filme}</p>
          <p data-identifier="movie-session-infos-reserve-finished">{location.state.data} - {location.state.horario}</p>
        </Filme>
        <Ingressos>
          <h1>Ingressos</h1>
          {location.state.nomes.map((value) => (
          <AssentoDiv data-identifier="seat-infos-reserve-finished">Assento: {value}</AssentoDiv>
          ))}
        </Ingressos>
        <Comprador data-identifier="buyer-infos-reserve-finished">
          <h1>Comprador</h1>
          Nome: {location.state.name} - CPF:{location.state.cpf}
        </Comprador> 
        <Link to={`/`}><button data-identifier="back-to-home-btn">Voltar pra Home</button></Link>       
      </DivSucesso>
    );
  }

const DivSucesso=styled.div`
  width:100%;
  margin-top:67px;
  display:flex;
  flex-direction: column;
  align-items: center;
  color: #293845;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  h1{
    color: #293845;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    margin-bottom:10px;
  }
  button{
    color: #FFFFFF;
    width: 225px;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    border:none;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    margin-top:50px;
  }
`
const Mensagem=styled.div`
  width:100%;
  display:flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #247A6B;
`
const Comprador= styled.div`
    width:90%;
    margin-bottom:20px;

`
const AssentoDiv= styled.div`
  width:100%;   
  margin-bottom:5px;
`
const Filme= styled.div`
    width:90%;
    margin-bottom:20px;

`
const Ingressos=styled.div`
  width:90%;
  margin-bottom:20px;
`