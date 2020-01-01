import React from 'react'
import Loadable from 'react-loadable';

const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <div></div>;
    }
  };
  
const AsyncLogin = Loadable({
  loader: () => import('../page/login/login.js'),
  loading: MyLoadingComponent
});

  
const routes = [
    {
        path: '/',
        exact: true,
        component: AsyncLogin,
        requiresAuth: false,
    }
];

export default routes;