import {CheckCircleOutlined} from '@ant-design/icons';
import {Button, message} from 'antd';
import {FC, memo, useCallback, useContext} from 'react';

import {useMutation, useQueryClient} from 'react-query';

import useParamsPagination from '../../hooks/pagination/useParamsPagination';
import $api from '../../http';
import API from '../../libs/API';

import {Context} from './Context';
import {TaskDTO, TaskFormValues} from './types';

const ButtonStyle = {
    width: '100%',
};

const ArchiveButton: FC = memo(() => {
    const {item} = useContext(Context);

    const [{page}] = useParamsPagination(API.tasks());

    const queryClient = useQueryClient();

    const {mutate: save, isLoading} = useMutation<TaskDTO, unknown, Pick<TaskFormValues, 'is_done'>>(
        ({is_done}) => $api.patch(API.tasks(item._id), {is_done}),
        {
            onSuccess: async () => {
                message.success('Задача выполнена');

                await Promise.all([
                    queryClient.invalidateQueries([API.tasks(), {page}]),
                    queryClient.invalidateQueries([API.tasks(), {id: item._id}]),
                ]);
            },
        },
    );

    const toggle = useCallback(() => {
        save({is_done: true});
    }, [save]);

    return (
        <>
            {!item.is_done && (
                <Button
                    htmlType="button"
                    icon={<CheckCircleOutlined />}
                    style={ButtonStyle}
                    disabled={isLoading}
                    onClick={toggle}
                    loading={isLoading}
                >
                    Выполнить
                </Button>
            )}
        </>
    );
});

export default ArchiveButton;
