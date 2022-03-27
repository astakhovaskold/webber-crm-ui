import {Card, Col, Layout, Row} from 'antd';
import {memo, FC, useEffect} from 'react';

import {useQuery} from 'react-query';
import {Link, useNavigate} from 'react-router-dom';

import {Container} from '../../components/containers';
import useAuth from '../../hooks/useAuth';
import $api from '../../http';
import API from '../../libs/API';
import {PageProps} from '../../router/types';

interface CardData {
    id: string;
    name: string;
    badge: number;
}

const {Content, Footer} = Layout;

const styledContent = {
    paddingTop: 60,
};

const Home: FC<PageProps> = memo((): JSX.Element | null => {
    const navigate = useNavigate();
    const isAuth = useAuth();

    const {data: cardData} = useQuery<unknown, unknown, Array<CardData>>('cardData', () => {
        return $api.get(API.dashboard('cards')).then(response => response.data);
    });

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
                        {Array.isArray(cardData) &&
                            cardData.map(({id, name}) => (
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
