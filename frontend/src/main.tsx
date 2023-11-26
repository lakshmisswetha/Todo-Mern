import ReactDOM from "react-dom/client";
import { appRouter } from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <>
        <RouterProvider router={appRouter} />
    </>
);
