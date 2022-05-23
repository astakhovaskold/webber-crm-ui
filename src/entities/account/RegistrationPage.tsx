import {Space} from 'antd';
import {FC, memo} from 'react';

import {Link} from 'react-router-dom';

import {AuthFormWrapper, FullScreenContainer} from '../../components/containers';
import {PageProps} from '../../router/types';

import RegistrationForm from './RegistrationForm';

const RegistrationPage: FC<PageProps> = memo(() => {
    return (
        <FullScreenContainer>
            <Space size="large" direction="vertical" align="center">
                <AuthFormWrapper>
                    <RegistrationForm />
                </AuthFormWrapper>

                <div>
                    Уже зарегистрированы?&nbsp;
                    <Link to="/login">Войти</Link>
                </div>
            </Space>
        </FullScreenContainer>
    );
});

export default RegistrationPage;
