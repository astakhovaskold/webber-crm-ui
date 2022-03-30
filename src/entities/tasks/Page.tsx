import {Drawer, Spin} from 'antd';
import {FC, memo, useCallback, useState} from 'react';

import {useQuery} from 'react-query';
import {useNavigate, useParams} from 'react-router-dom';

import $api from '../../http';
import API from '../../libs/API';

import {PageProps} from '../../router/types';

import {Context} from './Context';
import {TaskDTO} from './types';
import View from './View';

const Page: FC<PageProps> = memo((): JSX.Element | null => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [item, setItem] = useState<TaskDTO | undefined>(undefined);

    useQuery<unknown, unknown, TaskDTO>(
        'task',
        () => {
            return id ? $api.get(API.tasks(id), {params: {is_active: true}}).then(response => response.data) : null;
        },
        {
            cacheTime: 0,
            staleTime: 0,
            onSuccess: data => {
                setItem(data);
            },
        },
    );

    const onClose = useCallback(() => {
        navigate('..');
    }, [navigate]);

    if (!item)
        return (
            <Drawer visible onClose={onClose} width={400} title="Задача">
                <Spin />
            </Drawer>
        );

    return (
        <Context.Provider value={[item, setItem]}>
            <Drawer visible onClose={onClose} width={400} title="Задача">
                <View />
            </Drawer>
        </Context.Provider>
    );
});

export default Page;
