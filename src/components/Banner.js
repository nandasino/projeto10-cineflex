import styled from "styled-components"
import { Link } from "react-router-dom"
export default function Banner({filme}){
    return(
        <Link to={`/sessoes/${filme.id}`}>
        <DivBanner data-identifier="movie-outdoor">
            <img src={filme.posterURL} />
        </DivBanner>
        </Link>
    )
}
const DivBanner= styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 145px;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin-bottom:25px;
img{
    width: 129px;
    height: 193px;
}

`