import styled from "styled-components";
import AccountContext from "../context/AccountContext";
import { useContext } from "react";
import axios from "axios";

export default function Habit({ habit }) {

    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const { account } = useContext(AccountContext);

    function renderDay(day, index) {
        if (habit.days.filter(i => i === index).length) {
            return <ContainerDay key={index} textColor="#FFFFFF" backgroundColor="#CFCFCF">
                {day[0]}</ContainerDay>
        }
        return <ContainerDay key={index} textColor="#CFCFCF" backgroundColor="#FFFFFF">
            {day[0]}</ContainerDay>;
    }

    function renderDays() {
        return weekdays.map( (day, index) => renderDay(day, index));
    }

    function deleteHabit() {
        alert("Quero deletar!");
        if (window.confirm("Deseja excluir o hábito?")) {
            const config = {
                headers: {
                    Authorization: `Bearer ${account.token}`
                }
            };
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`, config);
            promise.then(() => alert("Hábito deletado com sucesso!"));
        }
    }

    const habitsDays = renderDays();

    return (
            <ContainerHabit>
                <p>{habit.name}</p>
                <div>
                    {habitsDays}
                </div>
                <ion-icon onClick={deleteHabit} name="trash-outline"></ion-icon>
            </ContainerHabit>
    );
}

const ContainerHabit = styled.div`
    background-color: #FFFFFF;
    width: 90.7vw;
    height: 91px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 4.27vw;
    font-family: 'Lexend Deca', sans-serif;
    border-radius: 5px;
    position: relative;

    > p {
        font-size: 5.3vw;
        line-height: 6.67vw;
        margin-top: 0;
    }

    > div {
        display: flex;
        justify-content: space-between;
        width: 71.73vw;
        margin-top: 2.13vw;
    }

    ion-icon {
        font-size: 4vw;
        position: absolute;
        top: 2.93vw;
        right: 2.67vw;
    }
`

const ContainerDay = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    color: ${props => props.textColor};
    background-color: ${props => props.backgroundColor};
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    width: 8vw;
    height: 8vw;
    display: flex;
    align-items: center;
    justify-content: center;
`