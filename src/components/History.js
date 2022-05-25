import styled from "styled-components";


export default function History() {

    return (
        <Container>
            <p>Histórico</p>
            <p>
                Em breve você poderá ver o histórico dos seus hábitos aqui!
            </p>
        </Container>
    )
}

const Container = styled.div`
    background-color: #F2F2F2;
    padding: 70px 4.53vw;
    box-sizing: border-box;

    p:first-child {
        color: #126BA5;
        font-size: 5.87vw;
        line-height: 7.47vw;
        font-family: 'Lexend Deca', sans-serif;
        margin-top: 28px;
    }

    p:last-child {
        font-family: 'Lexend Deca', sans-serif;
        color: #666666;
        font-size: 4.8vw;
        line-height: 5.87vw;
        margin-top: 17px;

    }
`