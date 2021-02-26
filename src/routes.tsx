import React, { useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';

import { useStore } from 'effector-react';

import { Home } from 'pages/home';
import { NotFound } from 'pages/notFound';
import { Plans } from 'pages/plans';
import { Subscriptions } from 'pages/subscriptions';
import { $connected } from 'models/wallet';

export const makeRoutes = (isAuth: boolean): RouteConfig[] =>
  [
    {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      path: `/plans`,
      exact: true,
      needAuth: true,
      component: Plans,
    },
    {
      path: `/subscriptions`,
      exact: true,
      needAuth: true,
      component: Subscriptions,
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
