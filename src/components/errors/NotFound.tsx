import {Layout, Row, Space} from 'antd';
import {Content} from 'antd/es/layout/layout';
import {FC, memo} from 'react';
import {Link} from 'react-router-dom';

import {ERROR_404} from '../../libs/text';
import {ContainerCentered} from '../containers';

const NotFound: FC = memo((): JSX.Element => {
    return (
        <Layout>
            <ContainerCentered>
                <Content className="site-layout">
                    <Row justify="center" align="middle">
                        <Space direction="vertical" align="center">
                            <h1>{ERROR_404}</h1>
                            <Link to="/">На главную</Link>
                        </Space>
                    </Row>
                </Content>
            </ContainerCentered>
        </Layout>
    );
});

export default NotFound;
