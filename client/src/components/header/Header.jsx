import { Link } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../contexts/authContext";
import Path from "../../paths";

export default function Header() {
    const {
        username,
        isAuthenticated,
    } = useContext(AuthContext);

    return (
        <header>
            <h1><Link className="home" to={Path.Home}>GamesPlay</Link></h1>
            <nav>
                <Link to={Path.Catalog}>All games</Link>

                {isAuthenticated && (
                    <div id="user">
                        <Link to={Path.Create}>Create Game</Link>
                        <Link to={Path.Logout}>Logout</Link>
                        <span>| {username}</span>
                    </div>
                )}

                {!isAuthenticated && (
                    <div id="guest">
                        <Link to={Path.Login}>Login</Link>
                        <Link to={Path.Register}>Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};