import {Button, Drawer, Form, Input} from 'antd';
import {FC, memo, useCallback, useContext, useMemo, useState} from 'react';

import {useMutation, useQueryClient} from 'react-query';

import {BaseDrawerProps} from '../../components/BaseProps';
import $api from '../../http';
import API from '../../libs/API';

import {UserDTO} from '../../store/account/types';

import {Context} from './Context';
import {FormProfileValues} from './types';

const {Item} = Form;

const FormProfile: FC = memo((): JSX.Element | null => {
    const [visible, setVisible] = useState(false);
    const {item} = useContext(Context);

    const queryClient = useQueryClient();

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    const {mutate: save, isLoading} = useMutation<UserDTO, void, FormProfileValues>(
        customer =>
            new Promise((resolve, reject) => {
                try {
                    return resolve($api.patch(API.profile(), customer).then(response => response.data));
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
        };
    }, [item]);

    const ButtonStyle = useMemo(
        () => ({
            width: '100%',
        }),
        [],
    );

    return (
        <>
            <Button type="primary" style={ButtonStyle} onClick={() => setVisible(true)}>
                Изменить
            </Button>

            <Drawer
                {...BaseDrawerProps}
                visible={visible}
                closable={!isLoading}
                maskClosable={!isLoading}
                onClose={onClose}
                destroyOnClose
                footer={
                    <Button loading={isLoading} block type="primary" htmlType="submit" form="FormProfile">
                        Сохранить
                    </Button>
                }
                title="Новый клиент"
            >
                <Form name="FormProfile" colon={false} layout="vertical" initialValues={initialValues} onFinish={save}>
                    <Item name="name" label="Имя" rules={[{required: true}, {type: 'string', max: 64}]}>
                        <Input autoComplete="name" />
                    </Item>
                </Form>
            </Drawer>
        </>
    );
});

export default FormProfile;
