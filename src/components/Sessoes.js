import styled from "styled-components"
import { Link } from "react-router-dom"

export default function Sessoes({dia,data,horarios}){
    return(
        <DivDia>
            <p>{dia}-{data}</p>
            <Horarios>{horarios.map((h)=><Link to={`/assentos/${h.id}`}><button>{h.name}</button></Link>)}</Horarios>
        </DivDia>
    )
}
const DivDia= styled.div`
    width:100%;
    display:flex;
    flex-direction: column;
    height: 120px;
    p{
        font-family: 'Roboto'!important;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #293845;
    }
`
const Horarios= styled.div`
    margin-top:20px;
    width:180px;
    display:flex;
    justify-content:space-between;
    button{
        width: 83px;
        height: 43px;
        background: #E8833A;
        border-radius: 3px;
        border:none;
        color:#FFFFFF;
        font-family: 'Roboto'!important;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
    }
`