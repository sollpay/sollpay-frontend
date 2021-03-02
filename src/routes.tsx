import React, { lazy, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';

import { useStore } from 'effector-react';

import { Home } from 'pages/home';
import { NotFound } from 'pages/notFound';
import { Select } from 'pages/select';
import { $connected } from 'models/wallet';

export const makeRoutes = (isAuth: boolean): RouteConfig[] =>
  [
    {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      path: `/select`,
      exact: true,
      needAuth: true,
      component: Select,
    },
    {
      path: `/subscribe/:planAddress`,
      exact: true,
      component: lazy(() => import('pages/subscribe')),
    },
    {
      path: `/customer`,
      exact: true,
      needAuth: true,
      component: () => <Redirect to="/customer/subscriptions" />,
    },
    {
      path: `/customer/plans`,
      exact: true,
      needAuth: true,
      component: lazy(() => import('pages/customer/plans')),
    },
    {
      path: `/customer/subscriptions`,
      exact: true,
      needAuth: true,
      component: lazy(() => import('pages/customer/subscriptions')),
    },
    {
      path: `/user`,
      exact: true,
      needAuth: true,
      component: () => <Redirect to="/user/subscriptions" />,
    },
    {
      path: `/user/subscriptions`,
      exact: true,
      needAuth: true,
      component: lazy(() => import('pages/user/subscriptions')),
    },
    {
      path: '*',
      component: NotFound,
    },
  ].map((route) => {
    if (route.needAuth && route.needAuth !== isAuth) {
      route.component = () => <Redirect to="/" />;
      return route;
    }

    return route;
  });

export const Pages = () => {
  // TODO: Cannot update a component (`Pages`) while rendering a different component
  const connected = useStore($connected);

  return useMemo(() => renderRoutes(makeRoutes(connected)), [connected]);
};
