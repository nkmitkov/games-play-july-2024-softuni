import { Link } from "react-router-dom";
import { useContext, useMemo } from "react";

import useForm from "../../hooks/useForm";
import AuthContext from "../../contexts/authContext";
import Path from "../../paths";

const RegisterFormKeys = {
    Email: "email",
    Username: "username",
    Password: "password",
    RePassword: "rePassword",
};

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);
    
    //TODO: temp solution for form reinitialization
    const initialValues = useMemo(() => ({
        [RegisterFormKeys.Email]: "",
        [RegisterFormKeys.Username]: "",
        [RegisterFormKeys.Password]: "",
        [RegisterFormKeys.RePassword]: "",
    }), []);

    const {
        values,
        onChangeHandler,
        onSubmitHandler
    } = useForm(registerSubmitHandler, initialValues);

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmitHandler}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name={RegisterFormKeys.Username}
                        value={values[RegisterFormKeys.Username]}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="maria@email.com"
                        name={RegisterFormKeys.Email}
                        value={values[RegisterFormKeys.Email]}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        id="register-password"
                        name={RegisterFormKeys.Password}
                        value={values[RegisterFormKeys.Password]}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name={RegisterFormKeys.RePassword}
                        value={values[RegisterFormKeys.RePassword]}
                        onChange={onChangeHandler}
                    />

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <Link to={Path.Login}>here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};