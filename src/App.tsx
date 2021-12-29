import {Global, css} from '@emotion/react';
import {memo} from 'react';

import Header from './components/layout/Header';
import Router from './router/Router';

const globalStyle = css`
    :root {
        --main-color: #fff;
        --color-dark: #0d6efd;
        --color-text-dark: #000;
    }

    #app {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .ant-page-header {
        padding-top: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }

    .ant-descriptions-item-container {
        .ant-descriptions-item {
            &-label {
                color: rgba(0, 0, 0, 0.45);
            }

            &-content {
                color: rgba(0, 0, 0, 0.65);
            }
        }
    }
`;

const isAuth = false;

const App = memo(() => {
    return (
        <>
            <Global styles={globalStyle} />
            {isAuth && <Header />}

            <Router />
        </>
    );
});

export default App;
