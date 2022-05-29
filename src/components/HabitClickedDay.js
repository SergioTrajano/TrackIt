import styled from "styled-components";

export default function HabitClickedDay({ name, wasDone}) {

    const icon = wasDoneIcon();
    
    function wasDoneIcon() {
        if (wasDone) return <ion-icon name="checkmark-circle-sharp"></ion-icon>;
        return <ion-icon name="close-circle-sharp"></ion-icon>;
    }

    return (
        <Container iconColor={wasDone ? "#009F00" : "#E03338"}>
            <p>{name}</p>
            {icon}
        </Container>
    );
}

const Container = styled.div`
    width: 80vw;
    height: 25vw;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px;
    margin-bottom: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;

    ion-icon {
        font-size: 16vw;
        color: ${props => props.iconColor}
    }

    p {
        color: ${props => props.iconColor}
    }
`