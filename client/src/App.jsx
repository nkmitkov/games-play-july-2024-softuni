import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext";
import Path from "./paths";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import GameList from "./components/game-list/GameList";
import GameCreate from "./components/game-create/GameCreate";
import GameEdit from "./components/game-edit/GameEdit";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthGuard from "./components/guards/AuthGuard";
import GuestGuard from "./components/guards/GuestGuard";
// import GameDetails from "./components/game-details/GameDetails";
const GameDetails = lazy(() => import("./components/game-details/GameDetails"));

function App() {

    return (
        <ErrorBoundary>
            <AuthProvider>
                <div id="box">
                    <Header />

                    <main id="main-content">

                        <Suspense fallback={<h1>Loading...</h1>}>
                            <Routes>
                                <Route path={Path.Home} element={<Home />} />
                                <Route path={Path.Catalog} element={<GameList />} />
                                <Route path={Path.Details} element={<GameDetails />} />

                                <Route element={<AuthGuard />}>
                                    <Route path={Path.Create} element={<GameCreate />} />
                                    <Route path={Path.GameEdit} element={<GameEdit />} />
                                    <Route path={Path.Logout} element={<Logout />} />
                                </Route>

                                <Route element={<GuestGuard />}>
                                    <Route path={Path.Login} element={<Login />} />
                                    <Route path={Path.Register} element={<Register />} />
                                </Route>
                            </Routes>
                        </Suspense>

                    </main>
                </div>
            </AuthProvider>
        </ErrorBoundary>
    );
};

export default App;