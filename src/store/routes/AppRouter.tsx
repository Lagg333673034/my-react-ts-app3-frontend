import React, { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import {notAuthRoutes, AuthRoutes } from "./routes";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';


const AppRouter = () => {
    const {userAuth} = useSelector((state: RootState) => state.siteReducer);
    return (
        <Routes>
            {!userAuth && notAuthRoutes && notAuthRoutes.map((route, index) =>
                <Route
                    key={index}
                    path={route.path}
                    element={route.component}>
                </Route>
            )}
            {userAuth && AuthRoutes && AuthRoutes.map((route, index) =>
                <Route
                    key={index}
                    path={route.path}
                    element={route.component}>
                </Route>
            )}
        </Routes>
    );
};

export default AppRouter;
