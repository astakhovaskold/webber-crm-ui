import {Alert, Descriptions, Space} from 'antd';
import {FC, memo, useContext} from 'react';

import {SpaceFull} from '../../components/containers';

import DateView from '../../components/view/DateView';
import useHasAccess from '../../hooks/useHasAccess';

import {NO_DATA_SHORT} from '../../libs/text';
import {TASK_EDIT} from '../../permissions';

import ArchiveButton from './ArchiveButton';
import {Context} from './Context';
import DeleteButton from './DeleteButton';
import FormTask from './FormTask';
import Status from './Status';

const View: FC = memo(() => {
    const {item} = useContext(Context);
    const {title, description, is_active, status, deadline} = item;
    const canEdit = useHasAccess(TASK_EDIT);

    return (
        <SpaceFull direction="vertical" size="middle">
            {!is_active && <Alert message="Задача в архиве" type="info" />}

            <Descriptions layout="vertical" column={1} colon={false} size="small">
                <Descriptions.Item label="Название">{title}</Descriptions.Item>

                <Descriptions.Item label="Описание">{description ?? NO_DATA_SHORT}</Descriptions.Item>

                <Descriptions.Item label="Статус">
                    <Status item={status} />
                </Descriptions.Item>

                {typeof deadline !== 'undefined' && (
                    <Descriptions.Item label="Срок выполнения">
                        <DateView date={deadline} />
                    </Descriptions.Item>
                )}

                {canEdit && (
                    <Descriptions.Item>
                        <Space direction="vertical">
                            {is_active && <FormTask />}

                            <Space>
                                <DeleteButton />
                                <ArchiveButton />
                            </Space>
                        </Space>
                    </Descriptions.Item>
                )}
            </Descriptions>
        </SpaceFull>
    );
});

export default View;
