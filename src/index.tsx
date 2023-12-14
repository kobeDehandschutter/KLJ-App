/* eslint-disable no-console */
import { PrimeReactProvider } from 'primereact/api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import routes from './main.routes';
import {UserContextProvider} from "./contexts/userContext"

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <UserContextProvider>
      <RouterProvider router={router} />
      </UserContextProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
);
