import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import NotFound from "./pages/notFound/NotFound";
import Favorites from "./pages/favorites/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";
import UserProfile from "./pages/userProfile/UserProfile";
import Profile from "./pages/profile/Profile";
import newRequest from "./utils/newRequest";

function App() {
  const queryClient = new QueryClient();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`/api/users/${userId}`)
        .then((res) => res.json())
        .then((user) => {
          if (user.darkMode !== undefined) {
            setDarkMode(user.darkMode);
          }
        })
        .catch((err) => console.log(err));
    } else {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode === "true") setDarkMode(true);
    }
  }, []);

  const toggleMode = async () => {
  const newMode = !darkMode;
  setDarkMode(newMode);
  localStorage.setItem("darkMode", newMode);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    try {
      await newRequest.put(`/users/${currentUser._id}/theme`, { darkMode: newMode });
    } catch (err) {
      console.log(err);
    }
  }
};

useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    newRequest.get(`/users/${currentUser._id}`).then((res) => {
      setDarkMode(res.data.darkMode);
      localStorage.setItem("darkMode", res.data.darkMode);
    }).catch((err) => console.log(err));
  } else {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") setDarkMode(true);
  }
}, []);


  const Layout = () => (
    <div className={darkMode ? "app dark" : "app"}>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <Navbar toggleMode={toggleMode} darkMode={darkMode} />
          <Outlet />
          <Footer />
        </FavoritesProvider>
      </QueryClientProvider>
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile", element: <Profile /> },
        { path: "/gigs", element: <Gigs /> },
        { path: "/myGigs", element: <MyGigs /> },
        { path: "/orders", element: <Orders /> },
        { path: "/messages", element: <Messages /> },
        { path: "/message/:id", element: <Message /> },
        { path: "/add", element: <Add /> },
        { path: "/gig/:id", element: <Gig /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/pay/:id", element: <Pay /> },
        { path: "/success", element: <Success /> },
        { path: "/favorites", element: <Favorites /> },
        { path: "/user/:id", element: <UserProfile /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
