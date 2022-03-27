import {Global} from '@emotion/react';
import {memo} from 'react';

import {Outlet} from 'react-router-dom';

import Header from './components/layout/Header';
import useAuth from './hooks/useAuth';
import Router from './router/Router';
import {globalStyle} from './styles/styles';

const App = memo(() => {
    const isAuth = useAuth();

    return (
        <>
            <Global styles={globalStyle} />
            {isAuth && <Header />}

            <Router />
            <Outlet />
        </>
    );
});

export default App;
