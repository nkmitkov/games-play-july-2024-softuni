import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext";
import Path from "./paths";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import GameList from "./components/game-list/GameList";
import GameCreate from "./components/game-create/GameCreate";
import GameDetails from "./components/game-details/GameDetails";
import GameEdit from "./components/game-edit/GameEdit";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";

function App() {

    return (
        <AuthProvider>
            <div id="box">
                <Header />

                <main id="main-content">

                    <Routes>
                        <Route path={Path.Home} element={<Home />} />
                        <Route path={Path.Catalog} element={<GameList />} />
                        <Route path={Path.Create} element={<GameCreate />} />
                        <Route path={Path.Details} element={<GameDetails />} />
                        <Route path={Path.GameEdit} element={<GameEdit />} />
                        <Route path={Path.Login} element={<Login />} />
                        <Route path={Path.Register} element={<Register />} />
                        <Route path={Path.Logout} element={<Logout />} />
                    </Routes>

                </main>
            </div>
        </AuthProvider>
    );
};

export default App;