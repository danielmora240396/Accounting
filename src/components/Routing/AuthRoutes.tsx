import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import { useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useCookies } from "react-cookie";
import Dashboard from "../../pages/Dasboard";

const AuthRoutes = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({user: null, accessToken: '', refreshToken: ''});
    const [authCookie, setAuthCookie, removeCookie] = useCookies(['access_token', 'refresh_token', 'user']);

    const setAuth = (user: any, accessToken: string, refreshToken: string) => {
        setUser({user: user, accessToken: accessToken, refreshToken: refreshToken});
        const expires = new Date();
        expires.setHours(expires.getHours() + user['_tokenResponse'].expiresIn / 3600);
        setAuthCookie('access_token', user['_tokenResponse'].idToken, { path: '/', expires });
        setAuthCookie('refresh_token', user['_tokenResponse'].refreshToken, { path: '/', expires });
        setAuthCookie('user', JSON.stringify(user), { path: '/', expires });
    }

    const logout = () => {
        setUser({user: null, accessToken:'', refreshToken: ''});
        removeCookie('access_token');
        removeCookie('refresh_token');
        removeCookie('user');
        navigate('/login');
    }

    
    useEffect(() => {
        if(authCookie.user && authCookie.access_token && authCookie.refresh_token) {
            setAuth(authCookie.user, authCookie.access_token, authCookie.refresh_token);
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }, []);

    return <AuthContext.Provider value={
                {
                    user: user.user, 
                    accessToken: user.accessToken, 
                    refreshToken: user.refreshToken, 
                    setAuth: setAuth,
                    logout: logout
                }
            }>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="*" element={<p>404</p>} />
            </Routes> 
        </AuthContext.Provider>
}

export default AuthRoutes;