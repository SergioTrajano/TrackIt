import styled from "styled-components";
import AccountContext from "../context/AccountContext";
import { useContext } from "react";

export default function Top() {

    const { account } = useContext(AccountContext);

    return (
        <Container>
            <p>TrackIt</p>
            <img src={account.image} alt={account.image}/>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px 0px #00000026;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4.8vw;
    box-sizing: border-box;
    z-index: 1;

    p {
        font-family: 'Playball', cursive;
    }

    img {
        width: 13.6vw;
        height: 13.6vw;
        border-radius: 50%;
        object-fit: cover;
    }
`