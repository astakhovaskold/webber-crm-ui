import {Button, Card, Form, Input, message} from 'antd';
import {FC, memo, useCallback} from 'react';

import {useMutation} from 'react-query';

import $api from '../../http';
import API from '../../libs/API';
import {UserDTO} from '../../store/account/types';

const {Item, useForm} = Form;

const ResetPasswordForm: FC = memo(() => {
    const [form] = useForm();

    const {mutate, isLoading} = useMutation(
        (email: Pick<UserDTO, 'email'>) => {
            return $api.post(API.reset('reset-password'), email);
        },
        {
            onSuccess: () => {
                message.success('Письмо для сброса пароля отправлено на Email');
                form.resetFields();
            },
        },
    );

    const submit = useCallback(
        ({email}: Pick<UserDTO, 'email'>) => {
            mutate({email});
        },
        [mutate],
    );

    return (
        <Card>
            <h2>Сбросить пароль</h2>

            <Form layout="vertical" onFinish={submit} colon={false} form={form}>
                <Item label="Введите E-mail вашего аккаунта" name="email" rules={[{required: true, type: 'email'}]}>
                    <Input type="email" placeholder="Email" size="large" autoComplete="email" />
                </Item>

                <Button htmlType="submit" type="primary" loading={isLoading}>
                    Сбросить пароль
                </Button>
            </Form>
        </Card>
    );
});

export default ResetPasswordForm;
