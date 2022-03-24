import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input} from 'antd';

import axios, {AxiosBasicCredentials} from 'axios';
import {FC, memo, useCallback} from 'react';

import {useDispatch} from 'react-redux';

import API from '../../libs/API';
import {validateMessagesSimple} from '../../libs/validateMessages';
import {login} from '../../store/account/actions';
import {AccountDTO} from '../../store/account/types';

const {Item} = Form;
const {Password} = Input;

const LoginForm: FC = memo(() => {
    const dispatch = useDispatch();

    const submit = useCallback(
        (data: AxiosBasicCredentials) => {
            axios
                .post<AccountDTO>(API.auth('login'), data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(res => {
                    const account = res.data;
                    const {access_token, refresh_token} = account;

                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);

                    dispatch(login(account));
                });
        },
        [dispatch],
    );

    return (
        <Card>
            <Form layout="vertical" colon={false} onFinish={submit} validateMessages={validateMessagesSimple}>
                <Item name="username" rules={[{required: true}]}>
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Имя пользователя"
                        size="large"
                        autoComplete="username"
                    />
                </Item>

                <Item name="password" rules={[{required: true}]}>
                    <Password prefix={<LockOutlined />} placeholder="Пароль" size="large" autoComplete="password" />
                </Item>

                <Button htmlType="submit" type="primary" block>
                    Войти
                </Button>
            </Form>
        </Card>
    );
});

export default LoginForm;
