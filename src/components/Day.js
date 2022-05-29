import styled from "styled-components";
import { useState, useEffect } from "react";

export default function Day({ index, day, newHabit, setNewHabit, loading }) {

    const [textColor, setTextColor] = useState("#DBDBDB");
    const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

    useEffect(() => {
     if (newHabit.days.filter(i => i === index).length) {
        setTextColor("#FFFFFF");
        setBackgroundColor("#CFCFCF");
     }   
    }, []);

    function selected() {
        if (newHabit.days.filter(i => i === index).length) {
            setNewHabit({...newHabit, days: newHabit.days.filter(i => i !== index)});
            setTextColor("#DBDBDB");
            setBackgroundColor("#FFFFFF");
        } else {
            setNewHabit({...newHabit, days: [...newHabit.days, index].sort()});
            setTextColor("#FFFFFF");
            setBackgroundColor("#CFCFCF");
        }
        
    }

    return (
        <Container textColor={textColor} backgroundColor={backgroundColor} onClick={selected} disabled={loading}>
            {day[0]}
        </Container>
    );
}

const Container = styled.button`
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