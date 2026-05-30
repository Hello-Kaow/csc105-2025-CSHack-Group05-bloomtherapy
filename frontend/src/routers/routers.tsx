import { createBrowserRouter } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
//import Homepage from "../pages/Journal";
import Signup from "../pages/Signuppage";
import NewPageforTest from "../pages/NewPageforTest";
import HealHeartMessage from '../pages/HealHeartMessagepage';

const mainRouter = createBrowserRouter([
    {
        path: "/login",
        element: <Loginpage />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/heal-heart",
        element: <HealHeartMessage />
    },
    {
        path: "/newpagefortest",
        element: <NewPageforTest/>
    },
    // {
    //     path: "/journal",
    //     element: <Journal/>
    // }

]);

export default mainRouter;