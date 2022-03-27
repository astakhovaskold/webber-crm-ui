import {Space} from 'antd';
import {FC, memo} from 'react';

import {Link} from 'react-router-dom';

import {AuthFormWrapper, FullSize} from '../../components/containers';
import {PageProps} from '../../router/types';

import LoginForm from './LoginForm';

const LoginPage: FC<PageProps> = memo(() => {
    return (
        <FullSize>
            <Space size="large" direction="vertical" align="center">
                <AuthFormWrapper>
                    <LoginForm />
                </AuthFormWrapper>

                <div>
                    Нет аккаунта?&nbsp;
                    <Link to="/register">Зарегистрироваться</Link>
                </div>
            </Space>
        </FullSize>
    );
});

export default LoginPage;
