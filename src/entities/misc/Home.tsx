import {Card, Col, Layout, Row} from 'antd';
import {memo, FC, useEffect} from 'react';

import {Link, useNavigate} from 'react-router-dom';

import {v4 as uuid} from 'uuid';

import {Container} from '../../components/containers';
import useAuth from '../../hooks/useAuth';
import {PageProps} from '../../router/types';

const {Content, Footer} = Layout;

const styledContent = {
    paddingTop: 60,
};

const randomName = () => {
    return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
};

const CardData = Array.from({length: 5}, () => ({
    id: uuid(),
    name: randomName(),
    badge: Math.floor(Math.random() * 100),
}));

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
                        {CardData.map(({id, name}) => (
                            <Col span={8} key={id}>
                                <Card title={name} extra={<Link to={'/tasks/' + id}>Подробнее</Link>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Col>
                        ))}
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
