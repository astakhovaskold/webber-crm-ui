import {CheckCircleOutlined} from '@ant-design/icons';
import {Button, message} from 'antd';
import {FC, memo, useCallback, useContext} from 'react';

import {useMutation, useQuery, useQueryClient} from 'react-query';

import {PaginationResult} from '../../components/PaginationTable/types';
import useParamsPagination from '../../hooks/pagination/useParamsPagination';
import $api from '../../http';
import API from '../../libs/API';

import {Context} from './Context';
import {StatusDTO, TaskDTO} from './types';

const ButtonStyle = {
    width: '100%',
};

const ArchiveButton: FC = memo(() => {
    const {item} = useContext(Context);

    const [{page}] = useParamsPagination(API.tasks());

    const queryClient = useQueryClient();

    const {data: statusDone} = useQuery<PaginationResult<StatusDTO>>(['status', {id: item.id}], () =>
        $api.get(API.directory('status'), {params: {status: 'DONE'}}).then(response => response.data),
    );

    const {mutate: save, isLoading} = useMutation<
        TaskDTO,
        unknown,
        Pick<TaskDTO, 'is_done'> & {status: StatusDTO['_id']}
    >(({is_done, status}) => $api.patch(API.tasks(item.id), {is_done, status}).then(response => response.data), {
        onSuccess: async () => {
            message.success('Задача выполнена');
            await queryClient.invalidateQueries([API.tasks(), {page}]);
            await queryClient.invalidateQueries([API.tasks(), {id: item.id}]);
        },
    });

    const toggle = useCallback(() => {
        save({is_done: !item.is_done, status: statusDone!.content[0]._id});
    }, [item.is_done, save, statusDone]);

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
