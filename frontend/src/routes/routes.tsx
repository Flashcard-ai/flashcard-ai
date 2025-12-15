import { createBrowserRouter } from "react-router";
import { CategoriesPage } from "../pages/categories/categories";
import { RegisterAndLoginPage } from "../pages/register-and-login/register-and-login";
import { PrivateRouter } from "./private-router";
import { SubCategoriesPage } from "../pages/subcategories/subcategories";
import { CardsPage } from "../pages/cards/cards";

const applicationRoutes = createBrowserRouter([
  {
    path: "/auth",
    Component: RegisterAndLoginPage,
  },
  {
    path: "/",
    Component: PrivateRouter,
    children: [
      {
        path: "/",
        Component: CategoriesPage,
      },
      {
        path: "/categories/:id",
        Component: SubCategoriesPage,
      },
      {
        path: "/categories/deck/:id",
        Component: CardsPage,
      },
    ],
  },
]);

export default applicationRoutes;
