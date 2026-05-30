import { createBrowserRouter, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Loginpage from "../pages/Loginpage";
import Signup from "../pages/Signuppage";
import Journal from "../pages/Journalpage";

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Journal/>
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