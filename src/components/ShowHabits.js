import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import Habit from "./Habit";
import Day from "./Day";
import HabitsToday from "../context/HabitsToday";
import PorcentageHabitsDoneToday from "../context/PorcentageHabitsDoneToday";
import AccountContext from "../context/AccountContext";

export default function ShowHabits() {
    const { account } = useContext(AccountContext);
    const [habits, setHabits] = useState([]);
    const [addHabit, setAddHabit] = useState("none");
    const [loading, setLoading] = useState(false);
    const [newHabit, setNewHabit] = useState({
        name: "",
        days: [],
    });
    const [opacit, setOpacit] = useState(1);
    const [inputBackgroundColor, setInputBackgroundColor] = useState("#FFFFFF");
    const { setPorcentageHabitsDoneToday } = useContext(PorcentageHabitsDoneToday);
    const { todayHabits, setTodayHabits } = useContext(HabitsToday);

    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const showLoading = insideSaveHabit();
    const MyHabits = renderHabits();
    const makeHabit = renderNewHabit();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${account.token}`,
            },
        };
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then((response) => setHabits(response.data));
        promise.catch(() => alert(`Deu erro no servidor!`));
    }, [habits, account.token]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${account.token}`,
            },
        };
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then((response) => setTodayHabits(response.data));
    }, [habits, account.token, setTodayHabits]);

    useEffect(() => {
        if (todayHabits.length) {
            setPorcentageHabitsDoneToday(
                todayHabits.filter((habit) => habit.done === true).length / todayHabits.length
            );
        } else {
            setPorcentageHabitsDoneToday(0);
        }
    }, [habits, setPorcentageHabitsDoneToday, todayHabits]);

    function renderHabits() {
        if (habits.length > 0) {
            return habits.map((habit, i) => <Habit key={i} habit={habit} />);
        }
        return <Text>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Text>;
    }

    function renderNewHabit() {
        if (addHabit === "none") return <></>;
        else {
            return (
                <NewHabit display={addHabit} opacit={opacit} inputBackgroundColor={inputBackgroundColor}>
                    <input
                        value={newHabit.name}
                        onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                        placeholder="nome do hábito"
                        disabled={loading}
                    />
                    <div>
                        {weekdays.map((day, i) => (
                            <Day
                                key={i}
                                index={i}
                                day={day}
                                newHabit={newHabit}
                                setNewHabit={setNewHabit}
                                loading={loading}
                            />
                        ))}
                    </div>
                    <div>
                        <button onClick={cancel} disabled={loading}>
                            Cancelar
                        </button>
                        <button onClick={saveHabit} disabled={loading}>
                            {showLoading}
                        </button>
                    </div>
                </NewHabit>
            );
        }
    }

    function insideSaveHabit() {
        if (loading) return <ThreeDots width="11.7vw" height="2.93vw" color="#FFFFFF" />;
        return <>Salvar</>;
    }

    function cancel() {
        setAddHabit("none");
    }

    function sucessAddinghabit(data) {
        setHabits([...habits, data]);
        setAddHabit("none");
        setNewHabit({ ...newHabit, name: "", days: [] });
        setOpacit(1);
        setLoading(false);
        setInputBackgroundColor("#FFFFFF");
    }

    function failureAddingHabit() {
        alert("Erro no servidor!");
    }

    function saveHabit() {
        if (newHabit.name && newHabit.days.length) {
            setOpacit(0.7);
            setLoading(true);
            setInputBackgroundColor("#F2F2F2");
            const config = {
                headers: {
                    Authorization: `Bearer ${account.token}`,
                },
            };
            const promise = axios.post(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
                newHabit,
                config
            );
            promise.then((response) => sucessAddinghabit(response.data));
            promise.catch(() => failureAddingHabit());
        } else {
            alert("Preencha o nome do hábito e marque pelo menos um dia da semana!");
        }
    }

    return (
        <Container>
            <div>
                <p>Meus hábitos</p>
                <div onClick={() => setAddHabit("column")}>+</div>
            </div>
            <div>
                {makeHabit}
                {MyHabits}
            </div>
        </Container>
    );
}

const Container = styled.div`
    padding: 90px 4.8vw 25px 4.8vw;
    box-sizing: border-box;
    background-color: #f2f2f2;
    min-height: 100vh;

    > div:first-child {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
            color: #126ba5;
            font-size: 6.13vw;
            line-height: 7.47vw;
            font-family: "Lexend Deca", sans-serif;
        }

        div {
            background-color: #52b6ff;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10.7vw;
            height: 9.3vw;
            border-radius: 5px;

            &:hover {
                filter: brightness(0.9);
            }
        }
    }

    > div:last-child {
        margin-bottom: 70px;
        background-color: #f2f2f2;
    }
`;
const Text = styled.p`
    font-size: 4.8vw;
    line-height: 5.87vw;
    font-family: "Lexend Deca", sans-serif;
    color: #666666;
    margin-top: 30px;
`;

const NewHabit = styled.div`
    background-color: #ffffff;
    width: 90.7vw;
    height: 48vw;
    margin-top: 20px;
    display: ${(props) => props.display};
    flex-direction: column;
    box-sizing: border-box;
    padding: 4.27vw;
    font-family: "Lexend Deca", sans-serif;
    border-radius: 5px;
    opacity: ${(props) => props.opacit};

    input {
        width: 100%;
        height: 12vw;
        border: 1px solid #d4d4d4;
        font-size: 5.3vw;
        line-height: 6.67vw;
        border-radius: 5px;
        padding-left: 2.93vw;
        background-color: ${(props) => props.inputBackgroundColor};
        font-family: "Lexend Deca", sans-serif;

        &::placeholder {
            color: #dbdbdb;
            font-size: 5.3vw;
            line-height: 6.67vw;
            font-family: "Lexend Deca", sans-serif;
        }
    }

    > div {
        display: flex;
        justify-content: space-between;
        width: 71.73vw;
        margin-top: 8px;
        margin-bottom: 15px;
        font-family: "Lexend Deca", sans-serif;
    }

    > div:last-child {
        display: flex;
        width: 100%;
        justify-content: end;
        align-items: center;
        margin-bottom: 0;
        margin-top: 8vw;
        align-self: flex-end;
        font-family: "Lexend Deca", sans-serif;

        button:first-child {
            color: #52b6ff;
            line-height: 5.3vw;
            font-size: 4.27vw;
            margin-right: 6.13vw;
            margin-top: 0;
            background-color: #ffffff;
            outline: none;
            border: none;
            opacity: ${(props) => props.opacit};
        }

        button:last-child {
            width: 22.4vw;
            height: 9.33vw;
            color: #ffffff;
            background-color: #52b6ff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            line-height: 5.3vw;
            font-size: 4.27vw;
            opacity: ${(props) => props.opacit};
            border: none;
        }
    }
`;
