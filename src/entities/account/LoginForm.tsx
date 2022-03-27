import {LockOutlined, UserOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import {Button, Card, Form, Input} from 'antd';

import {FC, memo, useCallback} from 'react';

import {useDispatch} from 'react-redux';

import {Link} from 'react-router-dom';

import useStateRequest from '../../hooks/useStateRequest';
import {validateMessagesSimple} from '../../libs/validateMessages';
import {auth} from '../../store/account/actions';
import {AuthData, TYPES} from '../../store/account/types';

const {Item} = Form;
const {Password} = Input;

const Info = styled.div`
    padding-top: 1rem;
`;

const LoginForm: FC = memo(() => {
    const dispatch = useDispatch();

    const request = useStateRequest(TYPES.AUTH);

    const submit = useCallback(
        (data: AuthData) => {
            dispatch(auth(data));
        },
        [dispatch],
    );

    return (
        <Card>
            <h2>Вход</h2>

            <Form layout="vertical" colon={false} onFinish={submit} validateMessages={validateMessagesSimple}>
                <Item name="email" rules={[{required: true}]}>
                    <Input prefix={<UserOutlined />} placeholder="Имя пользователя" size="large" autoComplete="email" />
                </Item>

                <Item name="password" rules={[{required: true}]}>
                    <Password prefix={<LockOutlined />} placeholder="Пароль" size="large" autoComplete="password" />
                </Item>

                <Button htmlType="submit" type="primary" block loading={request}>
                    Войти
                </Button>
            </Form>

            <Info>
                Забыли пароль?&nbsp;
                <Link to="/reset-password">Сбросить пароль</Link>
            </Info>
        </Card>
    );
});

export default LoginForm;
