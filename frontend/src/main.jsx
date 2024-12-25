import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import KlassList from './Klass/KlassList.jsx'
import AddKlass from './Klass/AddKlass.jsx'
import UpdateKlass from './Klass/UpdateKlass.jsx'


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
