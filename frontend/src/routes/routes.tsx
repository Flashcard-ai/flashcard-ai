import { createBrowserRouter } from "react-router";
import { CategoriesPage } from "../pages/categories/categories";
import { RegisterAndLoginPage } from "../pages/register-and-login/register-and-login";
import { PrivateRouter } from "./private-router";
import { SubCategoriesPage } from "../pages/subcategories/subcategories";
import { CardsPage } from "../pages/cards/cards";
import { CardsViewPage } from "../pages/cards-view/cards-view";

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
      {
        path: "/categories/deck-view/:id",
        Component: CardsViewPage,
      },
    ],
  },
]);

export default applicationRoutes;
