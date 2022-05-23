import {Drawer, Spin} from 'antd';
import {FC, memo, useCallback} from 'react';

import {useQuery} from 'react-query';
import {useNavigate, useParams} from 'react-router-dom';

import {BaseDrawerProps} from '../../components/BaseProps';
import $api from '../../http';
import API from '../../libs/API';

import {PageProps} from '../../router/types';

import {Context} from './Context';
import {CustomerDTO} from './types';
import View from './View';

const Page: FC<PageProps> = memo((): JSX.Element | null => {
    const navigate = useNavigate();
    const {id} = useParams();

    const {data: customer} = useQuery<unknown, unknown, CustomerDTO>(
        [API.customers(), {id}],
        () =>
            new Promise((resolve, reject) => {
                if (id) {
                    return resolve($api.get(API.customers(id)).then(response => response.data));
                }

                reject(new Error('Задача не найдена'));
            }),
    );

    const onClose = useCallback(() => {
        navigate('..');
    }, [navigate]);

    if (!customer)
        return (
            <Drawer {...BaseDrawerProps} visible onClose={onClose} title="Клиент">
                <Spin />
            </Drawer>
        );

    return (
        <Context.Provider value={{item: customer}}>
            <Drawer {...BaseDrawerProps} visible onClose={onClose} title="Клиент">
                <View />
            </Drawer>
        </Context.Provider>
    );
});

export default Page;
