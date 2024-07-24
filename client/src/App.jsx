import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import * as authService from "./services/authService";
import AuthContext from "./contexts/authContext";
import Path from "./paths";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import GameList from "./components/game-list/GameList";
import GameCreate from "./components/game-create/GameCreate";
import GameDetails from "./components/game-details/GameDetails";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import GameEdit from "./components/game-edit/GameEdit";

function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState();

    const loginSubmitHandler = async (values) => {
        try {
            const result = await authService.login(values.email, values.password);
            
            setAuth(result);
    
            navigate(Path.Home);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ loginSubmitHandler }}>
            <div id="box">
                <Header />

                <main id="main-content">

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/games" element={<GameList />} />
                        <Route path="/games/create" element={<GameCreate />} />
                        <Route path="/games/:gameId" element={<GameDetails />} />
                        <Route path="/games/edit" element={<GameEdit />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>

                </main>
            </div>
        </AuthContext.Provider>
    )
}

export default App
