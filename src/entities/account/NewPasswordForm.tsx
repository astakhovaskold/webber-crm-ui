import {Button, Card, Form, Input, message} from 'antd';
import {RuleRender} from 'antd/es/form';
import {FC, memo, useCallback} from 'react';

import {useMutation} from 'react-query';

import {useNavigate, useParams} from 'react-router-dom';

import $api from '../../http';
import API from '../../libs/API';
import {PasswordData} from '../../store/account/types';

const {Item, useForm} = Form;

const NewPasswordForm: FC = memo(() => {
    const [form] = useForm();

    const {token} = useParams();
    const navigate = useNavigate();

    const {mutate, isLoading} = useMutation(
        ({password}: Pick<PasswordData, 'password'>) => {
            return $api.post(API.reset('new-password'), {token, password});
        },
        {
            onSuccess: () => {
                message.success('Пароль изменён');
                form.resetFields();
                navigate('/login');
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
            <h2>Новый пароль</h2>

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

export default NewPasswordForm;
