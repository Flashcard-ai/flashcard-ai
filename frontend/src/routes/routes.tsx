import { createBrowserRouter } from "react-router";
import { CategoriesPage } from "../pages/categories";
import { RegisterAndLoginPage } from "../pages/register-and-login";
import { PrivateRouter } from "./private-router";


const applicationRoutes = createBrowserRouter([
  {
    path: '/auth',
    Component: RegisterAndLoginPage
  },
  {
    path: '/',
    Component: PrivateRouter, 
    children: [
      {
        path: '/categories', 
        Component: CategoriesPage
      },
    ]
  }
])

export default applicationRoutes;