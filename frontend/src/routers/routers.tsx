import { createBrowserRouter, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Loginpage from "../pages/Loginpage";
//import Homepage from "../pages/Journal";
import Signup from "../pages/Signuppage";
import HumanityTest from "../pages/HumanityTestPage";
import WhatKeepsYouHuman from "../pages/hWhatKeepsYouHumanPage";
import TestMessages from "../pages/WhatKeepsYouHumanMessages";



const mainRouter = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Homepage/>
    // },
    {
        path: "/login",
        element: <Loginpage/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/humanitytest",
        element: <HumanityTest/>
    },
    {
        path:"/humanity-test/what-keeps-you-human",
        element:<WhatKeepsYouHuman />
    },
    {
        path: "/humanity-test/what-keeps-you-human/messages",
        element: <TestMessages />
    },
]);

export default mainRouter;