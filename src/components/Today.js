import styled from "styled-components";
import { useEffect, useContext } from "react";
import axios from "axios";
import dayjs from "dayjs";

import TodayHabit from "./TodayHabit";
import AccountContext from "../context/AccountContext";
import PorcentageHabitsDoneToday from "../context/PorcentageHabitsDoneToday";
import HabitsToday from "../context/HabitsToday";

export default function Today() {
    const { todayHabits, setTodayHabits } = useContext(HabitsToday);
    const { account } = useContext(AccountContext);
    const { porcentageHabitsDoneToday, setPorcentageHabitsDoneToday } = useContext(PorcentageHabitsDoneToday);
    const utc = require("dayjs/plugin/utc");
    const updateLocale = require("dayjs/plugin/updateLocale");

    dayjs.extend(utc);
    dayjs.extend(updateLocale);
    dayjs.updateLocale("en", {
        weekdays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
    });

    const date = dayjs.utc().local();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${account.token}`,
            },
        };
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then((response) => setTodayHabits(response.data));
    }, [todayHabits, account.token, setTodayHabits]);

    useEffect(() => {
        if (todayHabits.length) {
            setPorcentageHabitsDoneToday(
                todayHabits.filter((habit) => habit.done === true).length / todayHabits.length
            );
        } else {
            setPorcentageHabitsDoneToday(0);
        }
    }, [todayHabits, setPorcentageHabitsDoneToday]);

    function habitsDoneTodayporcent() {
        if (porcentageHabitsDoneToday) {
            return (
                <PorcentageText>
                    <p>{(porcentageHabitsDoneToday * 100).toFixed(0)}% dos hábitos concluídos</p>
                </PorcentageText>
            );
        }
        return <p>Nenhum hábito concluído ainda</p>;
    }

    function renderTodayshabits() {
        if (todayHabits.length) {
            return todayHabits.map((habit) => (
                <TodayHabit
                    key={habit.id}
                    habitName={habit.name}
                    habitId={habit.id}
                    isDone={habit.done}
                    currentSequence={habit.currentSequence}
                    highestSequence={habit.highestSequence}
                />
            ));
        } else return <p>Parece que você não tem hábitos para este dia da semana, que tal criar algum?</p>;
    }

    const descripition = habitsDoneTodayporcent();
    const listTodayHabits = renderTodayshabits();

    return (
        <Container>
            <TodaysDescription>
                <p>{date.format("dddd, DD/MM")}</p>
                {descripition}
            </TodaysDescription>
            {listTodayHabits}
        </Container>
    );
}

const Container = styled.div`
    background-color: #f2f2f2;
    min-height: 100vh;
    padding: 90px 4.53vw;
    box-sizing: border-box;
    font-family: "Lexend Deca", sans-serif;
`;

const TodaysDescription = styled.div`
    font-family: "Lexend Deca", sans-serif;
    margin-bottom: 30px;

    > p:first-child {
        color: #126ba5;
        font-size: 6.13vw;
        line-height: 7.47vw;
    }

    > p:last-child {
        color: #bababa;
        font-size: 4.8vw;
        line-height: 5.87vw;
    }
`;
const PorcentageText = styled.div`
    p {
        color: #8fc549;
        font-size: 4.8vw;
        line-height: 5.87vw;
    }
`;
