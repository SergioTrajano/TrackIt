import styled from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState, useContext } from "react";

import AccountContext from "../context/AccountContext";
import "../CSS/calendar.css";

export default function History() {

    const [history, setHistory] = useState([]);
    const { account } = useContext(AccountContext);
    const today = dayjs().format("DD/MM/YYYY");
    const showCalendar = renderCalendar();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${account.token}`
            }
        };
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", config);
        promise.then( response => setHistory(response.data));
        promise.catch( () => alert("Erro no servidor!"));
    }, []);

    function verifyDay({ date, view }) {
        const element = history.find( day => day.day === dayjs(date).format("DD/MM/YYYY"));
        
        if (element && view === "month" && element.day !== today) {
            if (element.habits.filter( habit => !habit.done).length) return "not-all-done";
            return "all-done";
        }
    }

    function disableDay({ date, view}) {
        if (view === "month") {
            if (history.find(day => day.day === dayjs(date).format("DD/MM/YYYY"))) {
                return false;
            }
            else return true;
        }
    }

    function renderCalendar() {
        if (history.length) {
            return <Calendar 
                        calendarType="US"
                        tileClassName={verifyDay}
                        tileDisabled={disableDay}
                        />;
        }
        else return <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>;
    }

    return (
        <Container>
            <p>Histórico</p>
            {showCalendar}
            
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    background-color: #F2F2F2;
    padding: 70px 4.53vw;
    box-sizing: border-box;

    p:first-child {
        color: #126BA5;
        font-size: 5.87vw;
        line-height: 7.47vw;
        font-family: 'Lexend Deca', sans-serif;
        margin-top: 28px;
        margin-bottom: 17px;
    }
`