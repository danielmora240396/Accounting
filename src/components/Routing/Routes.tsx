import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login/Login";

const LoginRoutes = () => {

    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
    </Routes>
}

export default LoginRoutes;