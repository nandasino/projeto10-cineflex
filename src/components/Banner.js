import styled from "styled-components"
import { Link } from "react-router-dom"
export default function Banner({filme}){
    return(
        <Link to={`/sessoes/${filme.id}`}>
        <DivBanner>
            <img src={filme.posterURL} />
        </DivBanner>
        </Link>
    )
}
const DivBanner= styled.div`
img{
    width: 129px;
    height: 193px;
    margin-bottom:25px;
}

`