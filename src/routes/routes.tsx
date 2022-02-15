/** Libs * */
import React, { lazy } from 'react';

/** Utils * */
import { withSuspense } from '../hoc/withSuspense';
import { IRouteType } from '../types';
/** Pages * */
// eslint-disable-next-line import/no-named-as-default
import Profile from '../components/Profile/Profile';
import { LoginPage } from '../pages/LoginPage/LoginPage';

/** Lazy Pages * */
const MessengerPage = lazy(() => import('../pages/MessengerPage/MessengerPage'));
const UsersPage = lazy(() => import('../pages/UsersPage/UsersPage'));
const HelpPage = lazy(() => import('../pages/HelpPage/HelpPage'));

export const publicRoutes: IRouteType[] = [
  {
    path: '/',
    exact: true,
    component: <LoginPage />,
  },
];

export const privateRoutes: IRouteType[] = [
  {
    path: '/users',
    exact: true,
    component: withSuspense(UsersPage),
  },
  {
    path: '/help',
    exact: true,
    component: withSuspense(HelpPage),
  },
  {
    path: '/messenger/:id?',
    exact: true,
    component: withSuspense(MessengerPage),
  },
  {
    path: '/:userId?',
    exact: true,
    component: <Profile />,
  },
];
