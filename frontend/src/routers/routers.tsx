import { createBrowserRouter } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
import Signup from "../pages/Signuppage";
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
]);

export default mainRouter;