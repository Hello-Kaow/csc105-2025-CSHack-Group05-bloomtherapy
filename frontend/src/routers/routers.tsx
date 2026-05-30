import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Loginpage from "../pages/Loginpage";
import BucketList from "../pages/BucketListPage";
import Signup from "../pages/Signuppage";
import HumanityTest from "../pages/HumanityTestPage";
import WhatKeepsYouHuman from "../pages/WhatKeepsYouHumanPage.tsx";
import TestMessages from "../pages/TestMessagesPage.tsx.tsx";
import Journal from "../pages/Journalpage";
import AddDiary from "../pages/AddDiary";
import EditDiary from "../pages/EditDiary";
import HealHeartMessage from "../pages/HealHeartMessagepage";
import PageTransition from "../components/PageTransition";

import { useAuth } from "../context/AuthContext";

const HealHeartWrapper = () => {
    const { token, user } = useAuth();

    console.log("user object:", user);

    const userId = user?.id || user?.username || "unknown-user";

    return (
        <HealHeartMessage
            token={token || ""}
            currentUserId={userId}
            username={user?.username}
        />
    );
};

const AnimatedLayout = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
                <Outlet />
            </PageTransition>
        </AnimatePresence>
    );
};

const mainRouter = createBrowserRouter([
    {
        element: <AnimatedLayout />,
        children: [
            {
                index: true,
                element: <Journal />,
            },
            {
                path: "login",
                element: <Loginpage />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "adddiary",
                element: <AddDiary />,
            },
            {
                path: "heal-heart",
                element: <HealHeartWrapper />,
            },
            {
                path: "bucketlist",
                element: <BucketList />,
            },
            {
                path: "editdiary/:id",
                element: <EditDiary />,
            },
            {
                path: "*",
                element: <Navigate to="/" replace />,
            },
            {
                path: "humanity-test",
                element: <HumanityTest />,
            },
            {
                path: "humanitytest/what-keeps-you-human",
                element: <WhatKeepsYouHuman />,
            },
            {
                path: "humanitytest/what-keeps-you-human/messages",
                element: <TestMessages />,
            }
        
        ],
    },
]);

export default mainRouter;