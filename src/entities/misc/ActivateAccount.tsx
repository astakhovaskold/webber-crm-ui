/**
 * Created by ASTAKHOV A.A. on 05.06.2022
 */

import {Alert} from 'antd';
import {FC, memo} from 'react';

import useAccount from '../../hooks/useAccount';

const ActivateAccount: FC = memo((): JSX.Element | null => {
    const {account} = useAccount();

    if (account?.user.is_active) return null;

    return (
        <Alert
            type="info"
            message="Аккаунт не активирован. Для активации перейдите по ссылке из нашего письма на E-mail."
        />
    );
});

export default ActivateAccount;
