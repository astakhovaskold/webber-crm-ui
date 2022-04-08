/**
 * Created by ASTAKHOV A.A. on 28.03.2022
 */

import {Tag} from 'antd';
import {FC, memo, useMemo} from 'react';

import {STATUS, StatusDTO} from './types';

interface StatusProps {
    item: StatusDTO;
}

const Status: FC<StatusProps> = memo(({item}): JSX.Element | null => {
    const {status, status_name} = item;

    const {color} = useMemo(() => {
        switch (status) {
            case STATUS.NEW:
                return {color: 'green'};

            case STATUS.SCHEDULED:
                return {color: 'blue'};

            case STATUS.WORKING:
                return {color: 'geekblue'};

            case STATUS.TESTING:
                return {color: 'yellow'};

            case STATUS.REVERSED:
                return {color: 'volcano'};

            case STATUS.DONE:
                return {color: 'darkgreen'};

            default:
                return {color: 'lightgray'};
        }
    }, [status]);

    return <Tag color={color}>{status_name.toUpperCase()}</Tag>;
});

export default Status;
