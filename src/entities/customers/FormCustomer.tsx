import styled from '@emotion/styled';
import {Button, Drawer, Form, Input, InputNumber, Select} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import {ValidatorRule} from 'rc-field-form/lib/interface';
import {FC, memo, useCallback, useContext, useMemo, useState} from 'react';

import {useMutation, useQueryClient} from 'react-query';

import {BaseDrawerProps} from '../../components/BaseProps';
import $api from '../../http';
import API from '../../libs/API';

import {Context} from './Context';
import {CustomerDTO, CustomerFormValues} from './types';

const {Item} = Form;

const Number = styled(InputNumber)`
    width: 100%;
`;

const FormCustomer: FC = memo((): JSX.Element | null => {
    const [visible, setVisible] = useState(false);
    const {item} = useContext(Context);

    const queryClient = useQueryClient();

    const isCreate = !item?._id;

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    const projectsValidator = useMemo<ValidatorRule>(
        () => ({
            validator(_, value: Array<string>) {
                return new Promise((resolve, reject) => {
                    try {
                        const result = value.every(v => (v.includes('http') ? new URL(v) : true));

                        if (result) {
                            resolve('');
                        } else {
                            reject(new Error('Вводите только URL-адреса или название проекта'));
                        }
                    } catch (e) {
                        reject(new Error('Вводите только корректные URL-адреса'));
                    }
                });
            },
        }),
        [],
    );

    const {mutate: save, isLoading} = useMutation<CustomerDTO, void, CustomerFormValues>(
        customer =>
            new Promise((resolve, reject) => {
                try {
                    if (isCreate) {
                        return resolve($api.post(API.customers(), customer).then(response => response.data));
                    }

                    return resolve($api.patch(API.customers(item._id), customer).then(response => response.data));
                } catch (e) {
                    reject(new Error('Непредвиденная ошибка'));
                }
            }),
        {
            onSuccess: async () => {
                setVisible(false);
                await queryClient.invalidateQueries(API.customers());
            },
        },
    );

    const initialValues = useMemo(() => {
        return {
            ...item,
            service: item.service?._id,
        };
    }, [item]);

    const ButtonStyle = useMemo(
        () =>
            isCreate
                ? {}
                : {
                      width: '100%',
                  },
        [isCreate],
    );

    return (
        <>
            <Button type="primary" style={ButtonStyle} onClick={() => setVisible(true)}>
                {isCreate ? 'Новый клиент' : 'Изменить'}
            </Button>

            <Drawer
                {...BaseDrawerProps}
                visible={visible}
                closable={!isLoading}
                maskClosable={!isLoading}
                onClose={onClose}
                destroyOnClose
                footer={
                    <Button loading={isLoading} block type="primary" htmlType="submit" form="formCustomer">
                        Сохранить
                    </Button>
                }
                title={isCreate ? 'Новый клиент' : 'Изменить клиента'}
            >
                <Form name="formCustomer" colon={false} layout="vertical" initialValues={initialValues} onFinish={save}>
                    <Item name="name" label="Наименование" rules={[{required: true}, {type: 'string', max: 64}]}>
                        <Input autoComplete="name" />
                    </Item>

                    <Item name="price" label="Цена (руб./ч)" rules={[{required: true}, {type: 'number', min: 0}]}>
                        <Number step={0.25} min={0} />
                    </Item>

                    <Item name="projects" label="Проекты" rules={[{required: true}, projectsValidator]}>
                        <Select<CustomerDTO['projects']> mode="tags" placeholder="Проекты" />
                    </Item>
                </Form>
            </Drawer>
        </>
    );
});

export default FormCustomer;
