import {Button, Drawer, Form, Input} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {FC, memo, useCallback, useContext, useMemo, useState} from 'react';

import {useMutation} from 'react-query';

import $api from '../../http';
import API from '../../libs/API';

import {Context} from './Context';
import {TaskDTO} from './types';

const {Item} = Form;

const FormTask: FC = memo((): JSX.Element | null => {
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useContext(Context);

    const isCreate = !item?.id;

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    const {mutate: save, isLoading} = useMutation(
        (task: TaskDTO) => {
            const url = isCreate ? API.tasks() : API.tasks(item.id);

            return isCreate ? $api.post(url, task) : $api.patch(url, task).then(response => response.data);
        },
        {
            onSuccess: data => {
                setItem(data);
                setVisible(false);
            },
        },
    );

    const initialValues = useMemo(() => ({...item}), [item]);

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                {isCreate ? 'Создать задачу' : 'Изменить'}
            </Button>

            <Drawer
                width={400}
                visible={visible}
                closable={!isLoading}
                maskClosable={!isLoading}
                onClose={onClose}
                destroyOnClose
                footer={
                    <Button loading={isLoading} block type="primary" htmlType="submit" form="formTask">
                        Сохранить
                    </Button>
                }
            >
                <Form name="formTask" colon={false} layout="vertical" initialValues={initialValues} onFinish={save}>
                    <Item name="title" label="Название задачи" rules={[{required: true}, {type: 'string', max: 64}]}>
                        <Input autoComplete="title" />
                    </Item>

                    <Item name="description" label="Описание" rules={[{required: true}, {type: 'string'}]}>
                        <TextArea />
                    </Item>
                </Form>
            </Drawer>
        </>
    );
});

export default FormTask;
