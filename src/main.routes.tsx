import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from './pages/home';
import IkDrink from './pages/ikDrink';
import Rekening from './pages/rekening';
import Settings from './pages/settings';
import WijDrinken from './pages/wijDrinken';
import MainLayout from './layouts/mainLayout';

const NotFound = () => <h1>NotFound</h1>;

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout><Home /></MainLayout>,
  },
  {
    path: '/ikDrink',
    element: <MainLayout><IkDrink /></MainLayout>,
  },
  {
    path: '/wijDrinken',
    element: <MainLayout><WijDrinken /></MainLayout>,
  },
  {
    path: '/rekening',
    element: <MainLayout><Rekening /></MainLayout>,
  },
  {
    path: '/settings',
    element: <MainLayout><Settings /></MainLayout>,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
];

export default routes;
