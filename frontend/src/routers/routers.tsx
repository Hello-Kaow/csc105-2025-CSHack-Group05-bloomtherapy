import { createBrowserRouter, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Loginpage from "../pages/Loginpage";
import Signup from "../pages/Signuppage";
import Journal from "../pages/Journalpage";
import AddDiary from "../pages/AddDiary";
import EditDiary from "../pages/EditDiary";

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
    {
        path: "/adddiary",
        element: <AddDiary/>
    },
    {
        path: "/editdiary",
        element: <EditDiary/>
    }
]);

export default mainRouter;