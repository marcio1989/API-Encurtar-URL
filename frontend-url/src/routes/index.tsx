import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import Home from '../pages/Home';
import MyUrls from '../pages/MyUrls';
import RedirectToURL from '../pages/Redirect';

export enum ENUM_ROUTES {
    Home = '/home/short-url',
    MyUrls = '/home/urls',
    Redirect = '/:code'
}

const Routes = () => {
    const { isSinged } = useAuthContext();
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path={ENUM_ROUTES.Home}
                    component={Home}
                />
                <Route
                    exact
                    path={ENUM_ROUTES.MyUrls}
                    render={(routeProps: any) => (
                        isSinged ?
                            <MyUrls {...routeProps} />
                            :
                            <Redirect to={ENUM_ROUTES.Home} />
                    )}
                />
                <Route
                    exact
                    path={ENUM_ROUTES.Redirect}
                    component={RedirectToURL}
                />

                <Route
                    path={'*'}
                >
                    <Redirect to={ENUM_ROUTES.Home} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;