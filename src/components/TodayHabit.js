import styled from "styled-components";
import { useContext } from "react";
import AccountContext from "../context/AccountContext";
import axios from "axios";

export default function TodayHabit({ habitName, habitId, isDone, currentSequence, highestSequence }) {

    const buttonBackgroundColor = isDone ? "#8FC549" : "#EBEBEB";
    const { account } = useContext(AccountContext);

    function toggleCheck() {
        const config = {
            headers: {
                Authorization: `Bearer ${account.token}`
            }
        };
        if (isDone) {
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/uncheck`, null, config);
        } else {
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/check`, null, config);
        }
    }

    return (
        <Container buttonBackgroundColor={buttonBackgroundColor} currentSequenceColor={isDone ? "#8FC549" : "#666666"} highestSequenceColor={currentSequence === highestSequence ? "#8FC549" : "#666666"}>
            <div>
                <p>{habitName}</p>
                <div>
                    <p>Sequência atual: <span>{currentSequence} {currentSequence > 1 ? "dias" : "dia"}</span> </p>
                    <p>Seu recorde: <span>{highestSequence} {highestSequence > 1 ? "dias" : "dia"}</span></p>
                </div>
            </div>
            <button onClick={toggleCheck}>
                <ion-icon name="checkmark-sharp"></ion-icon>
            </button>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    min-height: 25.1vw;
    background-color: #FFFFFF;
    padding: 13px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-top: 10px;
    border-radius: 5px;

     > div {
        color: #666666;
        font-family: 'Lexend Deca', sans-serif;

        > p {
            font-size: 5.3vw;
            line-height: 6.67vw;
            max-width: 60vw;
        }

        div {
            margin-top: 7px;

            p:first-child {
                font-size: 3.47vw;
                line-height: 4.27vw;
                
                span {
                    color: ${props => props.currentSequenceColor}
                }
            }

            p:last-child {
                font-size: 3.47vw;
                line-height: 4.27vw;
                
                span {
                    color: ${props => props.currentSequenceColor}
                }
            }
        }
    }

    button {
        background-color: ${props => props.buttonBackgroundColor};
        outline-color: #E7E7E7;
        width: 18.4vw;
        height: 18.4vw;
        box-sizing: border-box;
        font-family: 'Lexend Deca', sans-serif;
        border: none;
        border-radius: 5px;
        
        ion-icon {
            font-size: 9.3vw;
            color: #FFFFFF;
        }
    }
    
`