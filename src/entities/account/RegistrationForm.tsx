import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input} from 'antd';

import {FC, memo, useCallback} from 'react';

import {useDispatch} from 'react-redux';

import useStateRequest from '../../hooks/useStateRequest';
import {validateMessagesSimple} from '../../libs/validateMessages';
import {register} from '../../store/account/actions';
import {AuthData, TYPES} from '../../store/account/types';

const {Item} = Form;
const {Password} = Input;

const LoginForm: FC = memo(() => {
    const dispatch = useDispatch();

    const request = useStateRequest(TYPES.AUTH);

    const submit = useCallback(
        (data: AuthData) => {
            dispatch(register(data));
        },
        [dispatch],
    );

    return (
        <Card>
            <h2>Регистрация</h2>

            <Form layout="vertical" colon={false} onFinish={submit} validateMessages={validateMessagesSimple}>
                <Item name="email" rules={[{required: true, type: 'email'}]}>
                    <Input prefix={<UserOutlined />} placeholder="Имя пользователя" size="large" autoComplete="email" />
                </Item>

                <Item name="password" rules={[{required: true}]}>
                    <Password prefix={<LockOutlined />} placeholder="Пароль" size="large" autoComplete="password" />
                </Item>

                <Button htmlType="submit" type="primary" block loading={request}>
                    Зарегистрироваться
                </Button>
            </Form>
        </Card>
    );
});

export default LoginForm;
