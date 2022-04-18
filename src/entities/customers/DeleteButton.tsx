import {DeleteOutlined} from '@ant-design/icons';
import {Button, message, Popconfirm} from 'antd';
import {FC, memo, useCallback, useContext} from 'react';

import {useMutation, useQueryClient} from 'react-query';

import {useNavigate} from 'react-router-dom';

import useParamsPagination from '../../hooks/pagination/useParamsPagination';
import $api from '../../http';
import API from '../../libs/API';

import {Context} from './Context';

const DeleteButton: FC = memo(() => {
    const {item} = useContext(Context);
    const navigate = useNavigate();

    const [{page}] = useParamsPagination(API.customers());

    const queryClient = useQueryClient();

    const {mutate: remove, isLoading} = useMutation(() => $api.delete(API.customers(item._id)), {
        onSuccess: async () => {
            navigate('/customers');

            message.success('Клиент удален');
            await Promise.all([
                queryClient.invalidateQueries([API.customers(), {page}]),
                queryClient.removeQueries([API.customers(), {id: item._id}]),
            ]);
        },
    });

    const toggle = useCallback(() => {
        remove();
    }, [remove]);

    return (
        <>
            {item && (
                <Popconfirm
                    title="Удалить клиента?"
                    onConfirm={toggle}
                    okType="danger"
                    okText="Удалить"
                    placement="top"
                >
                    <Button htmlType="button" icon={<DeleteOutlined />} danger disabled={isLoading} loading={isLoading}>
                        Удалить
                    </Button>
                </Popconfirm>
            )}
        </>
    );
});

export default DeleteButton;
