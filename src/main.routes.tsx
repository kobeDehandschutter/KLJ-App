import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from './pages/home';
import IkDrink from './pages/ikDrink';
import Rekening from './pages/rekening';
import Settings from './pages/settings';
import WijDrinken from './pages/wijDrinken';

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
