import {Global} from '@emotion/react';
import {Layout} from 'antd';
import {memo} from 'react';

import {Outlet} from 'react-router-dom';

import {Container} from './components/containers';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import useAuth from './hooks/useAuth';
import Router from './router/Router';
import {globalStyle} from './styles/styles';

const App = memo(() => {
    const isAuth = useAuth();

    return (
        <>
            <Global styles={globalStyle} />

            <Layout>
                {isAuth && <Header />}

                {isAuth ? (
                    <Container>
                        <Router />
                        <Outlet />
                    </Container>
                ) : (
                    <>
                        <Router />
                        <Outlet />
                    </>
                )}

                {isAuth && <Footer />}
            </Layout>
        </>
    );
});

export default App;
