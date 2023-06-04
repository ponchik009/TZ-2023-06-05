import { ChatsPage } from "../../pages/ChatsPage/ChatsPage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { UnprotectedRoute } from "../UnprotectedRoute";

export const router = createBrowserRouter([
  {
    element: <UnprotectedRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <ChatsPage />,
      },
    ],
  },

  {
    path: "*",
    element: <div>СТРАНИЦА НЕ НАЙДЕНА!</div>,
  },
]);
