import { createBrowserRouter } from "react-router-dom";
import { Init } from "./Init";
import Root from "./Root";
import { Issues } from "./Issues";
import { Setting } from "./Setting";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Init />,
      },
      {
        path: "/set",
        element: <Setting />,
      },
      {
        path: "/issues",
        element: <Issues />,
      },
    ],
  },
]);
