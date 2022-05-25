import styled from "styled-components";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import Logo from "../assets/Group 8.png";
import TokenContext from "../context/TokenContext";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setToken } = useContext(TokenContext); 
    const navigate = useNavigate();
    const [opacit, setOpacit] = useState(1);
    const [inputBackgroundColor, setInputBackgroundColor] = useState("#FFFFFF");

    function load() {
        if (!loading) {
            return <Text>Entrar</Text>;
        } else {
            return <ThreeDots width="13.6vw" height="3.47vw" color="#FFFFFF"/>;
        }
    }

    const button = load();

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
        setToken(data.token);
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
        text-decoration: none;

        p {
            color: #52B6FF;
            font-size: 3.73vw;
            line-height: 4.53vw;

            &:hover {
            filter: brightness(2);
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

        &::placeholder {
            color: #DBDBDB;
        }
    }

    button {
        background-color: #52B6FF;
        width: 80.8vw;
        height: 12vw;
        display:flex;
        justify-content: center;
        align-items: center;
        opacity: ${props => props.opacit};

        p {
        color: #FFFFFF;
        font-size: 3.73vw;
        line-height: 4.53vw;
        }

        &:hover {
            filter: brightness(0.9);
        }
    }
`

const Text = styled.p`
    color: #FFFFFF;
    font-size: 5.6vw;
    line-height: 6.93vw;
`
