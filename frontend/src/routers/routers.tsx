import { createBrowserRouter, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Loginpage from "../pages/Loginpage";
import Homepage from "../pages/Journal";
import Signup from "../pages/Signuppage";

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Homepage/>
    },
    {
        path: "/login",
        element: <Loginpage/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
]);

export default mainRouter;