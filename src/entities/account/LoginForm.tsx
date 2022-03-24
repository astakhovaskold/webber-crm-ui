import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input} from 'antd';

import axios, {AxiosResponse} from 'axios';
import {FC, memo, useCallback} from 'react';

import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';

import {useNavigate} from 'react-router-dom';

import API from '../../libs/API';
import {validateMessagesSimple} from '../../libs/validateMessages';
import {login} from '../../store/account/actions';
import {AccountDTO, PasswordData, UserDTO} from '../../store/account/types';

const {Item} = Form;
const {Password} = Input;

interface LoginProps {
    username: UserDTO['username'] | UserDTO['email'];
    password: PasswordData['password'];
}

const LoginForm: FC = memo(() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const exec = useCallback(async (data: LoginProps) => {
        const {data: account} = await axios.post<unknown, AxiosResponse<AccountDTO>>(API.auth('login'), data);
        return account;
    }, []);

    const {mutate} = useMutation(exec, {
        onSuccess: account => {
            const {access_token, refresh_token} = account;

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            dispatch(login(account));
            navigate('/');
        },
    });

    const submit = useCallback(
        data => {
            mutate(data);
        },
        [mutate],
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
