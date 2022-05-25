import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from "react";

import "../CSS/reset.css";

import Top from "./Top";
import Login from "./Login";
import SignUp from "./SignUp";
import Habits from "./Habits";
import Today from "./Today";
import History from "./History";
import Menu from "./Menu";
import TokenContext from "../context/TokenContext";


export default function App() {

    const [token, setToken] = useState();

    return (
        <TokenContext.Provider value={{token, setToken}}>
            <BrowserRouter>
                <Top></Top>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/historico" elemento={<History />} />
                </Routes>
                <Menu></Menu>
            </BrowserRouter>
        </TokenContext.Provider>
    );
}