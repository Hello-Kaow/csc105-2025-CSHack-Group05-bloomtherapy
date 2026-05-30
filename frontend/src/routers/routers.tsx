import { createBrowserRouter, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Loginpage from "../pages/Loginpage";
import BucketList from "../pages/BucketList";
//import Homepage from "../pages/Journal";
import Signup from "../pages/Signuppage";
import NewPageforTest from "../pages/NewPageforTest";

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
        path: "/newpagefortest",
        element: <NewPageforTest/>
    },
    {
        path:"/bucketlist",
        element:<BucketList/>
    }
    // {
    //     path: "/journal",
    //     element: <Journal/>
    // }

]);

export default mainRouter;