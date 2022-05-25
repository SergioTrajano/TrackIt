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
import AccountContext from "../context/AccountContext";


export default function App() {

    function showTop() {
        if (account.token) return <Top></Top>;
        return <></>;
    }

    function showMenu() {
        if (account.token) return <Menu></Menu>;
        return <></>;
    }

    const [account, setAccount] = useState({
        id: "",
        name: "",
        image: "",
        email: "",
        password: "",
        token: ""
    });

    const menu = showMenu();
    const top = showTop();

    return (
        <AccountContext.Provider value={{account, setAccount}}>
            <BrowserRouter>
                {top}
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/historico" elemento={<History />} />
                </Routes>
                {menu}
            </BrowserRouter>
        </AccountContext.Provider>
    );
}