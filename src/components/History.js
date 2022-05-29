import styled from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState, useContext } from "react";

import AccountContext from "../context/AccountContext";
import "../CSS/calendar.css";
import HabitClickedDay from "./HabitClickedDay";

export default function History() {

    const [history, setHistory] = useState([]);
    const { account } = useContext(AccountContext);
    const [clickedDay, setClickedDay] = useState(<></>);

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
            if (history.find(day => day.day === dayjs(date).format("DD/MM/YYYY")) || dayjs(date).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY")) {
                return false;
            }
            else return true;
        }
    }

    function renderCalendar() {
        if (history.length) {
            return  <Calendar 
                        calendarType="US"
                        tileClassName={verifyDay}
                        tileDisabled={disableDay}
                        onClickDay={(value) => renderClickedDayHabits(value)}
                    />;
        }
        else return <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>;
    }

    function renderClickedDayHabits(value) {
        const clickdDate = history.find( day => day.day === dayjs(value).format("DD/MM/YYYY"));
        setClickedDay(
            <ClickedDayHabitsContainer>
                <p>{dayjs(value).format("dddd, DD/MM/YYYY")}</p>
                {clickdDate.habits.map( (habit, i) => <HabitClickedDay 
                                                    key={i}
                                                    name={habit.name}
                                                    wasDone={habit.done}
                                                 />)}
            </ClickedDayHabitsContainer>
            
        );
    }

    return (
        <Container>
            <p>Histórico</p>
            {showCalendar}
            {clickedDay}
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    background-color: #F2F2F2;
    padding: 70px 4.53vw 105px 4.53vw;
    box-sizing: border-box;
    font-family: 'Lexend Deca', sans-serif;

    > p:first-child {
        color: #126BA5;
        font-size: 5.87vw;
        line-height: 7.47vw;
        font-family: 'Lexend Deca', sans-serif;
        margin-top: 28px;
        margin-bottom: 17px;
    }
`

const ClickedDayHabitsContainer = styled.div`
    background-color: lightsteelblue;
    margin-top: 20px;
    width: 91vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;

    > p {
        margin-bottom: 15px;
    }
`