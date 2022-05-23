/**
 * Created by ASTAKHOV A.A. on 23.05.2022
 */

import {Tag} from 'antd';
import {FC, memo, useMemo} from 'react';

import {ROLE, RoleDTO} from '../../store/account/types';

interface RoleProps {
    item: RoleDTO;
}

const Role: FC<RoleProps> = memo(({item}): JSX.Element | null => {
    const {role, role_name} = item;

    const {color} = useMemo(() => {
        switch (role) {
            case ROLE.USER:
                return {color: 'green'};

            case ROLE.ADMIN:
                return {color: 'blue'};

            default:
                return {color: 'lightgray'};
        }
    }, [role]);

    return <Tag color={color}>{role_name.toUpperCase()}</Tag>;
});

export default Role;
