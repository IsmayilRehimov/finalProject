import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
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

function App() {
  const queryClient = new QueryClient();

  const Layout = () => (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <Navbar />
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
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
