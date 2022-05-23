import {Drawer, Spin} from 'antd';
import {FC, memo, useCallback} from 'react';

import {useQuery} from 'react-query';
import {useNavigate, useParams} from 'react-router-dom';

import {BaseDrawerProps} from '../../components/BaseProps';
import $api from '../../http';
import API from '../../libs/API';

import {PageProps} from '../../router/types';

import {Context} from './Context';
import {TaskDTO} from './types';
import View from './View';

const Page: FC<PageProps> = memo((): JSX.Element | null => {
    const navigate = useNavigate();
    const {id} = useParams();

    const {data: task} = useQuery<unknown, unknown, TaskDTO>(
        [API.tasks(), {id}],
        () =>
            new Promise((resolve, reject) => {
                if (id) {
                    return resolve($api.get(API.tasks(id)).then(response => response.data));
                }

                reject(new Error('Задача не найдена'));
            }),
    );

    const onClose = useCallback(() => {
        navigate('..');
    }, [navigate]);

    if (!task)
        return (
            <Drawer {...BaseDrawerProps} visible onClose={onClose} title="Задача">
                <Spin />
            </Drawer>
        );

    return (
        <Context.Provider value={{item: task}}>
            <Drawer {...BaseDrawerProps} visible onClose={onClose} title={`Задача #${task.num}`}>
                <View />
            </Drawer>
        </Context.Provider>
    );
});

export default Page;
