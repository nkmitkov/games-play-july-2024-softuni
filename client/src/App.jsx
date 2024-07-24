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
                        <Route path={Path.Home} element={<Home />} />
                        <Route path={Path.Catalog} element={<GameList />} />
                        <Route path={Path.Create} element={<GameCreate />} />
                        <Route path={Path.Details} element={<GameDetails />} />
                        <Route path={Path.Edit} element={<GameEdit />} />
                        <Route path={Path.Login} element={<Login />} />
                        <Route path={Path.Register} element={<Register />} />
                    </Routes>

                </main>
            </div>
        </AuthContext.Provider>
    )
}

export default App
