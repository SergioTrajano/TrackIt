import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from "react";

import "../CSS/reset.css";

import Top from "./Top";
import Login from "./Login";
import SignUp from "./SignUp";
import ShowHabits from "./ShowHabits";
import Today from "./Today";
import History from "./History";
import Menu from "./Menu";
import AccountContext from "../context/AccountContext";


export default function App() {

    function top() {
        if (account.token) return <Top></Top>;
        return <></>;
    }

    function menu() {
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

    const showMenu = menu();
    const showTop = top();

    return (
        <AccountContext.Provider value={{account, setAccount}}>
            <BrowserRouter>
                { showTop }
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/habitos" element={<ShowHabits />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/historico" element={<History />} />
                </Routes>
                { showMenu }
            </BrowserRouter>
        </AccountContext.Provider>
    );
}