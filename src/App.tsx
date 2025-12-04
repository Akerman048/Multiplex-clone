import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { RootLayout } from "./pages/RootLayout";
import { Home } from "./pages/Home";
import { MovieDetails } from "./pages/MovieDetails/MovieDetails";
import { MovieSession } from "./components/MovieSession/MovieSession";
import { movies } from "./data/movies";
import { Login } from "./pages/Login/Login";
import { BuyTicketPage } from "./pages/BuyTicketPage/BuyTicketPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "movie/:id", element: <MovieDetails movies={movies} /> },
      {
        path: "movie/:id:movie/:time",
        element: <MovieSession movie={movies} />,
      },
      
    ],
  },
  {path:"movie/:id/buy", element: <BuyTicketPage/>},
  {path:"login",
        element: <Login/>
      },
]);

export const App: FC = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
