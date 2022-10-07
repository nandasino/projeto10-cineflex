import styled from "styled-components"
export default function Banner({img}){
    return(
        <DivBanner>
            <img src={img} />
        </DivBanner>
    )
}
const DivBanner= styled.div`
img{
    width: 129px;
    height: 193px;
    margin-bottom:25px;
}

`