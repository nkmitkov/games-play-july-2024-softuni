import { useContext } from "react";
import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import AuthContext from "../../contexts/authContext";
import Path from "../../paths";

const LoginFormKeys = {
    Email: "email",
    Password: "password",
};

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const { values, onChangeHandler, onSubmitHandler } = useForm(loginSubmitHandler, {
        [LoginFormKeys.Email]: "",
        [LoginFormKeys.Password]: "",
    });

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmitHandler}>

                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name={LoginFormKeys.Email}
                        placeholder="Sokka@gmail.com"
                        onChange={onChangeHandler}
                        value={values[LoginFormKeys.Email]}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name={LoginFormKeys.Password}
                        onChange={onChangeHandler}
                        value={values[LoginFormKeys.Password]}
                    />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <Link to={Path.Register}>here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};