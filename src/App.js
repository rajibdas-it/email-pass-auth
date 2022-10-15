import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layout/Main";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Error from "./Components/Error";
import ForgotPassword from "./Components/ForgotPassword";
import UpdateProfile from "./Components/UpdateProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error />,
      element: <Main></Main>,
      children: [
        { path: "/", element: <SignUp /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/reset-password", element: <ForgotPassword /> },
        { path: "/profile-update", element: <UpdateProfile /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
