import {FC, memo} from 'react';

import {Link} from 'react-router-dom';

import {AuthFormWrapper, FullSize} from '../../components/containers';
import {PageProps} from '../../router/types';

import RegistrationForm from './RegistrationForm';

const RegistrationPage: FC<PageProps> = memo(() => {
    return (
        <FullSize>
            <AuthFormWrapper>
                <RegistrationForm />

                <div>
                    Уже зарегистрированы?&nbsp;
                    <Link to="/login">Войти</Link>
                </div>
            </AuthFormWrapper>
        </FullSize>
    );
});

export default RegistrationPage;
