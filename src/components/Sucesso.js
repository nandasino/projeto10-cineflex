import { useLocation } from 'react-router-dom';
import styled from "styled-components"
export default function Sucesso() {
    const location = useLocation();
  
    return (
      <>
        <NomeDiv>
          Nome: {location.state.name} - CPF:{location.state.cpf}-DIA: {location.state.dia}-DATA: {location.state.data}-HORARIO:{location.state.horario}
        </NomeDiv>
        {location.state.nomes.map((value) => (
          <AssentoDiv>Assento: {value}</AssentoDiv>
        ))}
      </>
    );
  }
const NomeDiv= styled.div`
    margin-top:107px;
    width:100%;

`
const AssentoDiv= styled.div`
  width:100%;   
`