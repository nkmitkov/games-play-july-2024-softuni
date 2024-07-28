import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";

import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(() => {
        localStorage.removeItem("accessToken");

        return {};
    });

    const loginSubmitHandler = async (values) => {
        try {
            const result = await authService.login(values.email, values.password);
            
            setAuth(result);

            localStorage.setItem("accessToken", result.accessToken);
    
            navigate(Path.Home);
        } catch (error) {
            console.log(error);
        }
    };

    const registerSubmitHandler = async (values) => {
        try {
            const result = await authService.register(values.username, values.email, values.password);
            
            setAuth(result);

            localStorage.setItem("accessToken", result.accessToken);
    
            navigate(Path.Home);
        } catch (error) {
            console.log(error);
        }
    };

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem("accessToken");
        navigate(Path.Home);
    };

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = "AuthContext";

export default AuthContext;