import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";

const Router = () => {
    return (
        <BrowserRouter>
               <AuthRoutes />
        </BrowserRouter>
    )

}

export default Router;