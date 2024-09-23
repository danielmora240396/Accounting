import { createContext } from "react";

const initialState = {
    user: null,
    accessToken: '',
    refreshToken: '',
    setAuth: (user: any, accessToken: string, refreshToken: string) => {},
    logout: () => {}
}

const AuthContext = createContext(initialState);


export default AuthContext;