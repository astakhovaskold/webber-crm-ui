import {DeleteOutlined} from '@ant-design/icons';
import {Button, message, Popconfirm} from 'antd';
import {FC, memo, useCallback, useContext} from 'react';

import {useMutation, useQueryClient} from 'react-query';

import {useNavigate} from 'react-router-dom';

import $api from '../../http';
import API from '../../libs/API';

import {Context} from './Context';

const ArchiveButton: FC = memo(() => {
    const {item} = useContext(Context);
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {mutate: remove, isLoading} = useMutation(() => $api.delete(API.tasks(item.id)), {
        onSuccess: async () => {
            navigate('/tasks');

            message.success('Задача удалена');
            await queryClient.invalidateQueries('tasks');
        },
    });

    const toggle = useCallback(() => {
        remove();
    }, [remove]);

    return (
        <>
            {item && (
                <Popconfirm
                    title="Вы уверены, что хотите удалить задачу?"
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

export default ArchiveButton;
