import {Button, Drawer, Form, Input, message} from 'antd';
import {FC, memo, useCallback, useContext, useMemo, useState} from 'react';

import {useMutation, useQueryClient} from 'react-query';

import {useDispatch} from 'react-redux';

import {BaseDrawerProps} from '../../components/BaseProps';
import useAccount from '../../hooks/useAccount';
import $api from '../../http';
import API from '../../libs/API';

import {setAuth} from '../../store/account/actions';

import {UserDTO} from '../../store/account/types';

import {Context} from './Context';
import {FormProfileValues} from './types';

const {Item} = Form;

const FormProfile: FC = memo((): JSX.Element | null => {
    const [visible, setVisible] = useState(false);
    const {item} = useContext(Context);

    const {account} = useAccount();
    const dispatch = useDispatch();

    const queryClient = useQueryClient();

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    const {mutate: save, isLoading} = useMutation<UserDTO, void, FormProfileValues>(
        profile =>
            new Promise((resolve, reject) => {
                try {
                    return resolve($api.patch(API.profile(), profile).then(response => response.data));
                } catch (e) {
                    reject(new Error('Непредвиденная ошибка'));
                }
            }),
        {
            onSuccess: async user => {
                if (typeof account !== 'undefined') {
                    dispatch(setAuth({...account, user}));
                }

                message.success('Профиль обновлён');

                setVisible(false);
                await queryClient.invalidateQueries([API.profile()]);
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
                title="Профиль"
            >
                <Form name="FormProfile" colon={false} layout="vertical" initialValues={initialValues} onFinish={save}>
                    <Item name="first_name" label="Имя" rules={[{required: true}, {type: 'string', max: 64}]}>
                        <Input />
                    </Item>

                    <Item name="last_name" label="Фамилия" rules={[{type: 'string', max: 64}]}>
                        <Input />
                    </Item>

                    <Item name="middle_name" label="Отчество" rules={[{type: 'string', max: 64}]}>
                        <Input />
                    </Item>

                    <Item name="email" label="E-mail" rules={[{required: true}, {type: 'email', max: 64}]}>
                        <Input />
                    </Item>
                </Form>
            </Drawer>
        </>
    );
});

export default FormProfile;
