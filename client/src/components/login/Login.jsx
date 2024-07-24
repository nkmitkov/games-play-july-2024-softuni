import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";

export default function Login() {
    const { values, onChangeHandler, onSubmitHandler } = useForm({
        email: "",
        password: "",
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
                        name="email"
                        placeholder="Sokka@gmail.com"
                        onChange={onChangeHandler}
                        value={values.email}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        onChange={onChangeHandler}
                        value={values.password}
                    />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <Link href="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};