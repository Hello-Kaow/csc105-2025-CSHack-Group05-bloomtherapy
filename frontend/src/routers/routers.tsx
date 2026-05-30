import { createBrowserRouter, Navigate } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
import Signup from "../pages/Signuppage";
import NewPageforTest from "../pages/NewPageforTest";
import HealHeartMessage from '../pages/HealHeartMessagepage';
import { useAuth } from '../context/AuthContext';
// import Journal from "../pages/Journal";

const HealHeartWrapper = () => {
    const { token, user } = useAuth();
    console.log('user object:', user)
    const userId = user?.id || user?.username || "unknown-user";
    return <HealHeartMessage token={token || ""} currentUserId={userId} username={user?.username}/>;
};

const mainRouter = createBrowserRouter([
    // { path: "/", element: <Journal /> },
    { path: "/login", element: <Loginpage /> },
    { path: "/signup", element: <Signup /> },
    { path: "/heal-heart", element: <HealHeartWrapper /> },
    { path: "/newpagefortest", element: <NewPageforTest /> },
]);

export default mainRouter;