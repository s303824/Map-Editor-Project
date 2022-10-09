import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();

export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    SET_LOGGED_IN: "SET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGOUT: "LOGOUT",
    REGISTER_RETRY: "REGISTER_RETRY",
    LOGIN_RETRY: "LOGIN_RETRY",
}

function AuthContextProvider(props) {

    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        successfulRegister: true,
        error: null,
    });

    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, [auth]);

    const authReducer = (action) => {
        const {type, payload} = action;
        switch (type) {
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.register,
                    successfulRegister: payload.successfulRegister,
                    successfulLogin: false,
                    error: payload.error,
                    guest: auth.guest
                })
            }
        }
    }


    auth.registerUser = async function(userData, store) {
        let response;
        try {
            response = await api.registerUser(userData);   
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user,
                        successfulRegister: true
                    }
                });
                history.push("/");
            }
        }
        catch(error) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: null,
                    successfulRegister: false,
                    error: error.response.data.errorMessage
                }
            });
        }
    }

}

export default AuthContext;
export { AuthContextProvider };