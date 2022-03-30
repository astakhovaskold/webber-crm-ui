import {DeleteOutlined, UndoOutlined} from '@ant-design/icons';
import {Button, Popconfirm} from 'antd';
import {FC, memo, useCallback, useContext} from 'react';

import {useMutation} from 'react-query';

import $api from '../../http';
import API from '../../libs/API';

import {Context} from './Context';
import {TaskDTO} from './types';

const DeleteButton: FC = memo(() => {
    const [item, setItem] = useContext(Context);

    const {mutate: save, isLoading} = useMutation(
        ({is_active}: Pick<TaskDTO, 'is_active'>) => {
            return $api.patch(API.tasks(item.id), {is_active}).then(response => response.data);
        },
        {
            onSuccess: data => {
                // eslint-disable-next-line no-console
                console.log('data', data);
                setItem(data);
            },
        },
    );

    const toggle = useCallback(() => {
        save({is_active: !item.is_active});
    }, [item, save]);

    return (
        <>
            {item.is_active ? (
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

export default DeleteButton;
