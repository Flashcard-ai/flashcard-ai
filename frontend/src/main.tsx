import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { CategoriesPage } from './pages/categories'
import './index.css'

let router = createBrowserRouter([
  {
    path: '/',
    Component: CategoriesPage
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
