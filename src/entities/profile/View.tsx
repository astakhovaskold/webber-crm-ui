import {Descriptions, Space} from 'antd';
import {FC, memo, useContext} from 'react';

import {SpaceFull} from '../../components/containers';

import NameFormatted from '../../components/view/NameFormatted';
import useHasAccess from '../../hooks/useHasAccess';

import {PROFILE_VIEW} from '../../permissions';

import {Context} from './Context';
import FormProfile from './FormProfile';

const View: FC = memo(() => {
    const {item} = useContext(Context);
    const {name, is_active} = item;
    const canEdit = useHasAccess(PROFILE_VIEW);

    return (
        <SpaceFull direction="vertical" size="middle">
            <Descriptions layout="vertical" column={1} colon={false} size="small">
                <Descriptions.Item label="Наименование">
                    <NameFormatted name={name} />
                </Descriptions.Item>

                {canEdit && (
                    <Descriptions.Item>
                        <Space direction="vertical">{is_active && <FormProfile />}</Space>
                    </Descriptions.Item>
                )}
            </Descriptions>
        </SpaceFull>
    );
});

export default View;
