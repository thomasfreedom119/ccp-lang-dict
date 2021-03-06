import React from 'react';
import {
  Route, Routes
} from "react-router-dom";
import { Layout, Search } from '../pages/home';

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path={process.env.PUBLIC_URL} element={<Layout />}>
        <Route index element={<Search />} />
      </Route>
    </Routes>
  )
}
