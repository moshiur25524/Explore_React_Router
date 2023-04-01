import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import ErrorPage from './error-page'
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact'
import EditContact, {
  action as editAction,
} from './routes/edit';
import { action as destroyAction } from "./routes/destroy";
import Index from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: '/contacts/:contactId',
            loader: contactLoader,
            action: contactAction,
            element: <Contact />
          },
          {
            path: '/contacts/:contactId/edit',
            loader: contactLoader,
            action: editAction,
            element: <EditContact />
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ]
      },
    ],
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
