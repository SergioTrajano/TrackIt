import styled from "styled-components";
import { useContext, useEffect } from "react";
import AccountContext from "../context/AccountContext";
import axios from "axios";

export default function TodayHabit({ habitName, habitId, isDone, currentSequence, highestSequence, setTodayHabits }) {

    const buttonBackgroundColor = isDone ? "#8FC549" : "#EBEBEB";
    const { account } = useContext(AccountContext);

    function toggleCheck() {
        const config = {
            headers: {
                Authorization: `Bearer ${account.token}`
            }
        };
        if (isDone) {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/uncheck`, null, config);
            promise.then(() => reloadTodayHabits());
        } else {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/check`, null, config);
            promise.then(() => reloadTodayHabits());
        }
    }

    function reloadTodayHabits() {
        const config = {
            headers: {
                Authorization: `Bearer ${account.token}`
            }
        };
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then(response => setTodayHabits(response.data));
    }

    return (
        <Container buttonBackgroundColor={buttonBackgroundColor}>
            <div>
                <p>{habitName}</p>
                <div>
                    <p>Sequência atual: {currentSequence}</p>
                    <p>Seu recorde: {highestSequence}</p>
                </div>
            </div>
            <button onClick={toggleCheck}>
                <ion-icon name="checkmark-outline"></ion-icon>
            </button>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 25.1vw;
    background-color: #FFFFFF;
    padding: 13px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

     > div {
        color: #666666;
        font-family: 'Lexend Deca', sans-serif;

        > p {
            font-size: 5.3vw;
            line-height: 6.67vw;
        }

        div {
            margin-top: 7px;

            p {
                font-size: 3.47vw;
                line-height: 4.27vw;    
            }
        }
    }

    button {
        background-color: ${props => props.buttonBackgroundColor};
        outline-color: #E7E7E7;
        width: 18.4vw;
        height: 18.4vw;
        box-sizing: border-box;
        
        ion-icon {
            font-size: 9.3vw;
            color: #FFFFFF;
        }
    }
    
`