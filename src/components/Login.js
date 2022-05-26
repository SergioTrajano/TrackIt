import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import Logo from "../assets/Group 8.png";
import AccountContext from "../context/AccountContext";


export default function Login() {

    const localUser = localStorage.getItem("user");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setAccount } = useContext(AccountContext); 
    const navigate = useNavigate();
    const [opacit, setOpacit] = useState(1);
    const [inputBackgroundColor, setInputBackgroundColor] = useState("#FFFFFF");

    const button = load();

    useEffect(() => {
        if (localUser !== null) {
            const localUserParse = JSON.parse(localUser);
            setEmail(localUserParse.email);
            setPassword(localUserParse.password);
            //submit();
        }
    }, [])

    function load() {
        if (!loading) {
            return <p>Entrar</p>;
        } else {
            return <ThreeDots width="13.6vw" height="3.47vw" color="#FFFFFF"/>;
        }
    }

    function submit(e) {
        e.preventDefault();
        setInputBackgroundColor("#F2F2F2");
        setLoading(true);
        setOpacit(0.7);
        const user = {
            email,
            password
        }
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", user);
        promise.then(response => GoToToday(response.data));
        promise.catch(failure)
    }

    function GoToToday(data) {
        setAccount(data);
        const user = {
            email,
            password
        }
        localStorage.removeItem("user");
        const userStrigify = JSON.stringify(user);
        localStorage.setItem("user", userStrigify);
        navigate("/hoje");
    }

    function failure() {
        setEmail("");
        setPassword("");
        setInputBackgroundColor("#FFFFFF");
        setLoading(false);
        setOpacit(1)
        alert("Dados Incorretos!");
    }

    return (
        <Container>
            <img src={Logo} alt="Logo"/>
            <Forms onSubmit={submit} color={inputBackgroundColor} opacit={opacit}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="email" 
                    disabled={loading}
                    required>
                </input>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) =>setPassword(e.target.value)} 
                    placeholder="senha" 
                    disabled={loading}
                    required>   
                </input>
                <button type="submit" disabled={loading}>
                    {button}
                </button>
            </Forms>
            <Link to="/cadastro">
                <p>
                    Não tem uma conta? Cadastre-se!
                </p>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        margin-top: 68px;
        margin-bottom: 32px;
    }

    a {
        margin-top: 25px;
        text-decoration-color: #52B6FF;

        p {
            color: #52B6FF;
            font-size: 3.73vw;
            line-height: 4.53vw;
            font-family: 'Lexend Deca', sans-serif;

            &:hover {
            filter: brightness(1.1);
            }
        }
    }
`

const Forms = styled.form`
    display:flex;
    flex-direction: column;
    
    input {
        width: 80.8vw;
        height: 12vw;
        font-size: 5.3vw;
        line-height: 6.67vw;
        padding-left: 2.93vw;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px solid #D4D4D4;
        background-color: ${props => props.color};
        font-family: 'Lexend Deca', sans-serif;

        &::placeholder {
            color: #DBDBDB;
            font-family: 'Lexend Deca', sans-serif;
        }
    }

    button {
        background-color: #52B6FF;
        height: 12vw;
        display:flex;
        justify-content: center;
        align-items: center;
        opacity: ${props => props.opacit};

        p {
        color: #FFFFFF;
        font-size: 5.6vw;
        line-height: 6.93vw;
        font-family: 'Lexend Deca', sans-serif;
        }

        &:hover {
            filter: brightness(0.9);
        }
    }
`