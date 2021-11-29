import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input} from 'antd';

import {AxiosBasicCredentials} from 'axios';
import {FC, memo, useCallback} from 'react';

import {useDispatch} from 'react-redux';

import {validateMessagesSimple} from '../../libs/validateMessages';
import {auth} from '../../store/account/actions';

const {Item} = Form;
const {Password} = Input;

const LoginForm: FC = memo(() => {
    const dispatch = useDispatch();

    const submit = useCallback(
        (data: AxiosBasicCredentials) => {
            dispatch(auth(data));
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
                    <Password
                        prefix={<LockOutlined />}
                        placeholder="Пароль"
                        size="large"
                        autoComplete="current-password"
                    />
                </Item>

                <Button htmlType="submit" type="primary" block>
                    Войти
                </Button>
            </Form>
        </Card>
    );
});

export default LoginForm;
