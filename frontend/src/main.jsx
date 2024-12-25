import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import KlassList from './pages/Klass/KlassList'
import AddKlass from './pages/Klass/AddKlass'
import UpdateKlass from './pages/Klass/UpdateKlass'



const router = createBrowserRouter([
  {
    path: "/admin/classes",
    element: <KlassList />
  },
  {
    path: "/admin/add-class",
    element: <AddKlass />
  },
  {
    path: "/admin/update-class/:klassId",
    element: <UpdateKlass />
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
