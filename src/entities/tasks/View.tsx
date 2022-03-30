import {Alert, Descriptions, Space} from 'antd';
import {FC, memo, useContext} from 'react';

import {SpaceFull} from '../../components/containers';

import useHasAccess from '../../hooks/useHasAccess';

import {NO_DATA_SHORT} from '../../libs/text';
import {TASK_EDIT} from '../../permissions';

import {Context} from './Context';
import DeleteButton from './DeleteButton';
import FormTask from './FormTask';

const View: FC = memo(() => {
    const {item} = useContext(Context);
    const {title, description, is_active} = item;
    const canEdit = useHasAccess(TASK_EDIT);

    return (
        <SpaceFull direction="vertical" size="middle">
            {is_active ? (
                <Descriptions layout="vertical" column={1} colon={false} size="small">
                    <Descriptions.Item label="Название">{title}</Descriptions.Item>

                    <Descriptions.Item label="Описание">{description ?? NO_DATA_SHORT}</Descriptions.Item>
                </Descriptions>
            ) : (
                <Alert message="Задача удалена" type="error" />
            )}

            {canEdit && (
                <Space>
                    <FormTask item={item} />
                    <DeleteButton item={item} />
                </Space>
            )}
        </SpaceFull>
    );
});

export default View;
