import {DeleteOutlined} from '@ant-design/icons';
import {Button, message, Popconfirm} from 'antd';
import {FC, memo, useCallback, useContext} from 'react';

import {useMutation, useQueryClient} from 'react-query';

import {useNavigate} from 'react-router-dom';

import useParamsPagination from '../../hooks/pagination/useParamsPagination';
import $api from '../../http';
import API from '../../libs/API';

import {Context} from './Context';

const ArchiveButton: FC = memo(() => {
    const {item} = useContext(Context);
    const navigate = useNavigate();

    const [{page}] = useParamsPagination(API.tasks());

    const queryClient = useQueryClient();

    const {mutate: remove, isLoading} = useMutation(() => $api.delete(API.tasks(item._id)), {
        onSuccess: async () => {
            navigate('/tasks');

            message.success('Задача удалена');
            await Promise.all([
                queryClient.invalidateQueries([API.tasks(), {page}]),
                queryClient.removeQueries([API.tasks(), {id: item._id}]),
            ]);
        },
    });

    const toggle = useCallback(() => {
        remove();
    }, [remove]);

    return (
        <>
            {item && (
                <Popconfirm title="Удалить задачу?" onConfirm={toggle} okType="danger" okText="Удалить" placement="top">
                    <Button htmlType="button" icon={<DeleteOutlined />} danger disabled={isLoading} loading={isLoading}>
                        Удалить
                    </Button>
                </Popconfirm>
            )}
        </>
    );
});

export default ArchiveButton;
