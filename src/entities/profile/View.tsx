import {Descriptions, Space} from 'antd';
import {FC, memo, useContext, useMemo} from 'react';

import {SpaceFull} from '../../components/containers';

import NameFormatted from '../../components/view/NameFormatted';
import useHasAccess from '../../hooks/useHasAccess';

import {PROFILE_VIEW} from '../../permissions';

import {Context} from './Context';
import FormProfile from './FormProfile';
import Role from './Role';

const View: FC = memo(() => {
    const {item} = useContext(Context);
    const {first_name, last_name, middle_name, email, role, is_active} = item;
    const canEdit = useHasAccess(PROFILE_VIEW);

    const name = useMemo(() => ({first_name, last_name, middle_name}), [first_name, last_name, middle_name]);

    return (
        <SpaceFull direction="vertical" size="middle">
            <Descriptions layout="vertical" column={1} colon={false} size="small">
                <Descriptions.Item label="Имя">
                    <NameFormatted name={name} />
                </Descriptions.Item>

                <Descriptions.Item label="E-mail">{email}</Descriptions.Item>

                <Descriptions.Item label="Роль">
                    <Role item={role} />
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
