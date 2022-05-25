import styled from "styled-components";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { Link, useNavigate } from "react-router-dom";


export default function Menu() {

    const navigate = useNavigate();

    return (
        <>
            <NavBar>
                <Link to="/habitos">
                    <p>Hábitos</p>
                </Link>
                <Link to="/historico">
                    <p>Histórico</p>
                </Link>  
            </NavBar>
            <Bar onClick={() => navigate("/hoje")}>
                <CircularProgressbarWithChildren value="66"
                    styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.25,

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',

                        // Text size
                        textSize: '16px',

                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.5,

                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',

                        // Colors
                        pathColor: `#FFFFFF`,
                        textColor: '#f88',
                        trailColor: "#52B6FF",
                        backgroundColor: "#52B6FF",
                        
                    })}
                >
                    <p>Hoje</p>
                </CircularProgressbarWithChildren>
            </Bar>
        </>
        

    )
}

const NavBar = styled.div`
    width: 100vw;
    height: 70px;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8.8vw;
    box-sizing: border-box;

    p {
        font-family: 'Lexend Deca', sans-serif;
        color: #52B6FF;
        font-size: 4.8vw;
        line-height: 5.87vw;

        &:hover {
            filter: brightness(0.8)
        }
    }

    a {
        text-decoration: none;
    }
`

const Bar = styled.div`
    width: 24.3vw;
    height: 24.3vw;
    position: fixed;
    bottom: 10px;
    left: 37.85vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #52B6FF;
    border-radius: 50%;

    &:hover {
        filter: brightness(0.8)
    }

    div {
        width: 21.07vw;
        height: 21.07vw;
    }

    p {
        font-family: 'Lexend Deca', sans-serif;
        color: #FFFFFF;
        font-size: 4.8vw;
        line-height: 5.87vw;
        margin-bottom: 2px;

        &:hover {
            filter: brightness(0.8)
        }
    }
`