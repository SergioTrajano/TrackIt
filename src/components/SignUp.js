import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

import Logo from "../assets/Group 8.png";

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [URL, setURL] = useState("");
    const [opacit, setOpacit] = useState(1);
    const [inputBackGroundColor, setInputBackGroundColor] = useState("#FFFFFF");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function load() {
        if (!loading) return <p>Cadastrar</p>;
        return <ThreeDots width="13.6vw" height="3.47vw" color="#FFFFFF"/>;
    }

    function submit(e) {
        e.preventDefault();
        setInputBackGroundColor("#F2F2F2");
        setLoading(true);
        setOpacit(0.7);
        const signUp = {
            email,
            name,
            image: URL,
            password
        };
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", signUp);
        promise.then(GoToLogin);
        promise.catch(failure);
    }

    function GoToLogin() {
        navigate("/");
    }

    function failure() {
        setLoading(false);
        setInputBackGroundColor("#FFFFFF");
        setOpacit(1);
        setEmail("");
        setName("");
        setPassword("");
        setURL("");
    }

    const button = load();

    return (
        <Container>
            <img src={Logo} alt="Logo"/>
            <Forms onSubmit={submit} color={inputBackGroundColor} opacit={opacit}>
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
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="senha" 
                    disabled={loading}
                    required>   
                </input>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="nome" 
                    disabled={loading}
                    required>   
                </input>
                <input 
                    type="url" 
                    value={URL} 
                    onChange={(e) => setURL(e.target.value)} 
                    placeholder="foto" 
                    disabled={loading}
                    required>   
                </input>
                <button type="submit" disabled={loading}>
                    {button}
                </button>
            </Forms>
            <Link to="/">
                <p>
                    Já tem uma conta? Faça login!
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
        background-color: ${props => props.inputBackGroundColor};

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