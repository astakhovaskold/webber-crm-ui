import {Global, css} from '@emotion/react';
import {Col, Row} from 'antd';
import {memo} from 'react';

import {FullSize} from './components/containers';
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

const App = memo(() => {
    return (
        <>
            <Global styles={globalStyle} />
            <Row gutter={8}>
                <Col span={24}>
                    <Header />
                </Col>
            </Row>
            <FullSize>
                <Row gutter={8}>
                    <Col span={24}>
                        <Router />
                    </Col>
                </Row>
            </FullSize>
        </>
    );
});

export default App;
