import { useState } from 'react';
import './App.css';

import Layout from './pages/layout/Layout';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import Game from "./pages/Game";
import Profile from './pages/Profile';
import ReviewGames from './pages/ReviewGames';
import Leaderboard from './pages/Leaderboard';
import Loading from "./components/loading/Loading";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/game",
                element: <Game/>
            },
            {
                path: "/profile",
                element: <Profile />
            },
            // {
            //     path: "/profile/games",
            //     element: <ReviewGames />
            // },
            {
                path: "/leaderboard",
                element: <Leaderboard />
            }
        ]
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
])

export let getUser = null;
export let setUser = null;
export let refreshUser = null;
function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);

    getUser = () => {
        return loggedInUser;
    }

    setUser = setLoggedInUser;

    refreshUser = async (username, password) => {
        const res = await fetch("http://127.0.0.1:3001/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const data = await res.json();
        setLoggedInUser(data.user);
    }

    return (
        <RouterProvider router={router} />
    );
}

export default App;