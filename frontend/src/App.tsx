import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
    return (
        <div>
            {/* <Home /> */}
            {/* <Login />
            <Signup /> */}
            <Outlet />
        </div>
    );
};

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/todo",
        element: <Home />,
    },
]);

export default App;
