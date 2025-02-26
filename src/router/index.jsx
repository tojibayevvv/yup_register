import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Dashboard from "../components/dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/dashboard",
        element: <Dashboard/>
    }
])