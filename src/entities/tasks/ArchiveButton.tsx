import {InboxOutlined, UndoOutlined} from '@ant-design/icons';
import {Button, message} from 'antd';
import {FC, memo, useCallback, useContext} from 'react';

import {useMutation, useQueryClient} from 'react-query';

import useParamsPagination from '../../hooks/pagination/useParamsPagination';
import $api from '../../http';
import API from '../../libs/API';

import {Context} from './Context';
import {TaskDTO} from './types';

const ArchiveButton: FC = memo(() => {
    const {item} = useContext(Context);

    const [{page}] = useParamsPagination(API.tasks());

    const queryClient = useQueryClient();

    const {mutate: save, isLoading} = useMutation<TaskDTO, unknown, Pick<TaskDTO, 'is_archive'>>(
        ({is_archive}) => $api.patch(API.tasks(item.id), {is_archive}).then(response => response.data),
        {
            onSuccess: async () => {
                message.success('Задача в архиве');
                await queryClient.invalidateQueries([API.tasks(), {page}]);
                await queryClient.invalidateQueries([API.tasks(), {id: item.id}]);
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
