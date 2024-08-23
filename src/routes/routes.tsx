import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home/Home";
import SecondLayout from "../layouts/SecondLayout";
import PokemonDetailPage from "../pages/Home/PokemonDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pokemon/:name",
        element: <PokemonDetailPage />,
      },
    ],
  },
  {
    path: "/",
    element: <SecondLayout />,
    children: [
      {
        path: "second",
        element: <p>Second</p>,
      },
    ],
  },
]);

export default router;
