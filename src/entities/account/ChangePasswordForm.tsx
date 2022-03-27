import {Button, Card, Form, Input, message} from 'antd';
import {RuleRender} from 'antd/es/form';
import {FC, memo, useCallback} from 'react';

import {useMutation} from 'react-query';

import useAccount from '../../hooks/useAccount';
import $api from '../../http';
import API from '../../libs/API';
import {PasswordData} from '../../store/account/types';

const {Item, useForm} = Form;

const ChangePasswordForm: FC = memo(() => {
    const [form] = useForm();
    const {account} = useAccount();

    const {mutate, isLoading} = useMutation(
        (password: Pick<PasswordData, 'password'>) => {
            return $api.patch(account ? API.users(account?.user.id, 'change-password') : '', password);
        },
        {
            onSuccess: () => {
                message.success('Пароль изменён');
                form.resetFields();
            },
        },
    );

    const submit = useCallback(
        ({password}: PasswordData) => {
            mutate({password});
        },
        [mutate],
    );

    const compareValidator = useCallback<RuleRender>(
        ({getFieldsValue}) => ({
            validator() {
                const {password, confirmPassword}: PasswordData = getFieldsValue(['password', 'confirmPassword']);

                return new Promise((resolve, reject) => {
                    if (confirmPassword && password !== confirmPassword) {
                        reject(new Error('Пароли не совпадают'));
                    } else {
                        resolve('');
                    }
                });
            },
        }),
        [],
    );

    return (
        <Card>
            <h2>Смена пароля</h2>

            <Form layout="vertical" onFinish={submit} colon={false} form={form}>
                <Item
                    label="Новый пароль"
                    name="password"
                    rules={[{required: true, min: 8, max: 32}, compareValidator]}
                    dependencies={['confirmPassword']}
                    validateFirst
                >
                    <Input.Password placeholder="Пароль" size="large" autoComplete="new-password" />
                </Item>

                <Item
                    label="Подтверждение пароля"
                    name="confirmPassword"
                    rules={[{required: true}, compareValidator]}
                    dependencies={['password']}
                    validateFirst
                >
                    <Input.Password placeholder="Пароль" size="large" autoComplete="new-password" />
                </Item>

                <Button htmlType="submit" type="primary" loading={isLoading}>
                    Изменить
                </Button>
            </Form>
        </Card>
    );
});

export default ChangePasswordForm;
