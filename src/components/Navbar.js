import styled from "styled-components"
export default function Navbar(){
    return(
        <DivNavbar>
        CINEFLEX
        </DivNavbar>
    )
}
const DivNavbar= styled.div`
    width: 100%;
    height: 67px;
    background: #C3CFD9;
    position:fixed;
    z-index:1;
    display:flex;
    justify-content:center;
    align-items:center;
    color: #E8833A;
    font-family: 'Roboto'!important;
    font-style: normal;
    font-weight: 400;
    font-size: 34px;

`