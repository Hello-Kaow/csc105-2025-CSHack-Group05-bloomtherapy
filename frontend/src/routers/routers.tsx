import { createBrowserRouter, Navigate } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
import BucketList from "../pages/BucketListPage";
import Signup from "../pages/Signuppage";
import Journal from "../pages/Journalpage";
import AddDiary from "../pages/AddDiary";
import EditDiary from "../pages/EditDiary";
import HealHeartMessage from '../pages/HealHeartMessagepage';
import { useAuth } from '../context/AuthContext';

const HealHeartWrapper = () => {
    const { token, user } = useAuth();
    console.log('user object:', user)
    const userId = user?.id || user?.username || "unknown-user";
    return <HealHeartMessage token={token || ""} currentUserId={userId} username={user?.username}/>;
};


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
        path: "/heal-heart",
        element: <HealHeartWrapper />
    },
    {
        path: "/bucketlist",
        element: <BucketList />
    },
    {
        path: "/editdiary/:id",
        element: <EditDiary />
    }
]);

export default mainRouter;