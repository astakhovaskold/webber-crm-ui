import {UserOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import {Avatar, Button, Col, Divider, Popover, Row, Typography} from 'antd';
import {FC, memo} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import {_DEFAULT_NAME} from '../../globals';
import useAccount from '../../hooks/useAccount';
import {logout} from '../../store/account/actions';

const {Title, Text} = Typography;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 320px;

    & .ant-divider-horizontal {
        margin: 0.75rem 0;
        margin-left: -1rem;
        width: calc(100% + 2rem); //don't ask why
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    flex-shrink: 0;
    font-size: 20px;
    color: #fff;

    &:hover {
        background-color: var(--main-color);
    }
`;

const UserInfo = styled.div`
    margin-left: 1rem;
    line-height: 1;
`;

const ProfileButton: FC = memo(() => {
    const {account} = useAccount();
    const dispatch = useDispatch();

    return (
        <Popover
            content={
                <Content>
                    <Title level={4}>Профиль пользователя</Title>

                    <Divider />

                    <Row align="middle">
                        <Avatar shape="square" icon={<UserOutlined />} />

                        <UserInfo>
                            <Text>{account?.user.name.first ?? _DEFAULT_NAME}</Text>

                            <br />

                            <Text type="secondary">{account?.user.email}</Text>
                        </UserInfo>
                    </Row>

                    <Divider />

                    <Row align="middle" justify="end" gutter={8} wrap={false}>
                        <Col>
                            <Link to="change-password">Сменить пароль</Link>
                        </Col>

                        <Col>
                            <Button type="primary" onClick={() => dispatch(logout())}>
                                Выход
                            </Button>
                        </Col>
                    </Row>
                </Content>
            }
            align={{
                offset: [5, -10],
            }}
            trigger="hover"
            placement="bottomLeft"
            mouseEnterDelay={0}
            mouseLeaveDelay={0.2}
        >
            <Container>
                <UserOutlined />
            </Container>
        </Popover>
    );
});

export default ProfileButton;
