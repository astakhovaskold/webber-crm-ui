import {FC, memo} from 'react';

import {AuthFormWrapper, FullSize} from '../../components/containers';
import {PageProps} from '../../router/types';

import NewPasswordForm from './NewPasswordForm';

const NewPasswordPage: FC<PageProps> = memo(() => {
    return (
        <FullSize>
            <AuthFormWrapper>
                <NewPasswordForm />
            </AuthFormWrapper>
        </FullSize>
    );
});

export default NewPasswordPage;
