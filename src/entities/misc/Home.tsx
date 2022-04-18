import {Layout, Row} from 'antd';
import {memo, FC, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';

import {Container} from '../../components/containers';
import useAuth from '../../hooks/useAuth';
import {PageProps} from '../../router/types';

import Tasks from './DashboardCards/Tasks';

const {Content, Footer} = Layout;

const styledContent = {
    paddingTop: 60,
};

const Home: FC<PageProps> = memo((): JSX.Element | null => {
    const navigate = useNavigate();
    const isAuth = useAuth();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    return (
        <Layout>
            <Container>
                <Content className="site-layout" style={styledContent}>
                    <Row gutter={[16, 24]}>
                        <Tasks />
                    </Row>
                </Content>
            </Container>
            <Footer style={{textAlign: 'center'}}>
                Webber CRM ©{new Date().toLocaleDateString('ru-RU', {year: 'numeric'})} Created by Askold Astakhov
            </Footer>
        </Layout>
    );
});

export default Home;
