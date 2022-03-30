/**
 * Created by ASTAKHOV A.A. on 28.03.2022
 */

import {SettingOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import {CSSProperties, FC, memo, useMemo} from 'react';

import {STATUS, TaskStatus} from './types';

const textStyle: CSSProperties = {whiteSpace: 'nowrap'};

const Status: FC<TaskStatus> = memo(({status, status_name}): JSX.Element | null => {
    const {color} = useMemo(() => {
        switch (status) {
            case STATUS.NEW:
                return {color: '#69F0AE'};

            case STATUS.SCHEDULED:
                return {color: '#4CAF50'};

            case STATUS.WORKING:
                return {color: '#2E7D32'};

            case STATUS.TESTING:
                return {color: '#3F51B5'};

            case STATUS.REVERSED:
                return {color: '#F57C00'};

            case STATUS.DONE:
                return {color: '#D84315'};

            default:
                return {color: '#9E9E9E'};
        }
    }, [status]);

    return (
        <Tag style={textStyle} color={color} icon={status === STATUS.REVERSED ? <SettingOutlined /> : undefined}>
            {status_name}
        </Tag>
    );
});

export default Status;
