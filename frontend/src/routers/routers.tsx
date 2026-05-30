import { createBrowserRouter, Navigate } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
import Signup from "../pages/Signuppage";
import NewPageforTest from "../pages/NewPageforTest";
import HealHeartMessage from '../pages/HealHeartMessagepage';
import { useAuth } from '../context/AuthContext';

const HealHeartWrapper = () => {
    const { token, user } = useAuth();
    const userId = user?.id || user?.username || "unknown-user";
    return <HealHeartMessage token={token || ""} currentUserId={userId} />;
};

const mainRouter = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/login", element: <Loginpage /> },
    { path: "/signup", element: <Signup /> },
    { path: "/heal-heart", element: <HealHeartWrapper /> },
    { path: "/newpagefortest", element: <NewPageforTest /> },
]);

export default mainRouter;