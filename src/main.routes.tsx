import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from './pages/home';

const IkDrink = () => <h1>ikDrink</h1>;
const WijDrinken = () => <h1>WijDrinken</h1>;
const Rekening = () => <h1>Rekening</h1>;
const Settings = () => <h1>Settings</h1>;
const NotFound = () => <h1>NotFound</h1>;

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/ikDrink',
    element: <IkDrink />,
  },
  {
    path: '/wijDrinken',
    element: <WijDrinken />,
  },
  {
    path: '/rekening',
    element: <Rekening />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
];

export default routes;
