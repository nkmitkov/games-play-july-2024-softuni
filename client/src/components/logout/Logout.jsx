import { useContext, useEffect } from "react";

import * as authService from "../../services/authService";
import AuthContext from "../../contexts/authContext";

export default function Logout() {
    const { logoutHandler } = useContext(AuthContext);

    useEffect(() => {
        authService.logout()
            .then(res => logoutHandler())
            .catch(err => console.log(err));
    }, []);

    return null;
};