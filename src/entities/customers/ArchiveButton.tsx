import {InboxOutlined, UndoOutlined} from '@ant-design/icons';
import {Button, message} from 'antd';
import {FC, memo, useCallback, useContext} from 'react';

import {useMutation, useQueryClient} from 'react-query';

import useParamsPagination from '../../hooks/pagination/useParamsPagination';
import $api from '../../http';
import API from '../../libs/API';

import {Context} from './Context';
import {CustomerDTO} from './types';

const ArchiveButton: FC = memo(() => {
    const {item} = useContext(Context);

    const [{page}] = useParamsPagination(API.customers());

    const queryClient = useQueryClient();

    const {mutate: save, isLoading} = useMutation<CustomerDTO, unknown, Pick<CustomerDTO, 'is_archive'>>(
        ({is_archive}) => $api.patch(API.customers(item._id), {is_archive}).then(response => response.data),
        {
            onSuccess: async (_, {is_archive}) => {
                const text = is_archive ? 'Клиент в архиве' : 'Клиент удален из архива';
                message.success(text);

                await Promise.all([
                    queryClient.invalidateQueries([API.customers(), {page}]),
                    queryClient.invalidateQueries([API.customers(), {id: item._id}]),
                ]);
            },
        },
    );

    const toggle = useCallback(() => {
        save({is_archive: !item.is_archive});
    }, [item, save]);

    return (
        <>
            {!item.is_archive ? (
                <Button
                    htmlType="button"
                    icon={<InboxOutlined />}
                    disabled={isLoading}
                    onClick={toggle}
                    loading={isLoading}
                >
                    Архивировать
                </Button>
            ) : (
                <Button
                    htmlType="button"
                    icon={<UndoOutlined />}
                    type="primary"
                    onClick={toggle}
                    disabled={isLoading}
                    loading={isLoading}
                >
                    Восстановить
                </Button>
            )}
        </>
    );
});

export default ArchiveButton;
