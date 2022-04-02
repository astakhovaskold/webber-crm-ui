import {DeleteOutlined, UndoOutlined} from '@ant-design/icons';
import {Button, message} from 'antd';
import {FC, memo, useCallback, useContext} from 'react';

import {useMutation, useQueryClient} from 'react-query';

import $api from '../../http';
import API from '../../libs/API';

import {Context} from './Context';
import {TaskDTO} from './types';

const ArchiveButton: FC = memo(() => {
    const {item} = useContext(Context);

    const queryClient = useQueryClient();

    const {mutate: save, isLoading} = useMutation<TaskDTO, unknown, Pick<TaskDTO, 'is_active'>>(
        ({is_active}) => $api.patch(API.tasks(item.id), {is_active}).then(response => response.data),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(['tasks', {id: item.id}]);
            },
            onError: () => {
                message.error('Ошибка архивации/восстановления');
            },
        },
    );

    const toggle = useCallback(() => {
        save({is_active: !item.is_active});
    }, [item, save]);

    return (
        <>
            {item.is_active ? (
                <Button
                    htmlType="button"
                    icon={<DeleteOutlined />}
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
