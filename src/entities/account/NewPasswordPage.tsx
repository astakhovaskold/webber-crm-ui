import {FC, memo} from 'react';

import {AuthFormWrapper, FullScreenContainer} from '../../components/containers';
import {PageProps} from '../../router/types';

import NewPasswordForm from './NewPasswordForm';

const NewPasswordPage: FC<PageProps> = memo(() => {
    return (
        <FullScreenContainer>
            <AuthFormWrapper>
                <NewPasswordForm />
            </AuthFormWrapper>
        </FullScreenContainer>
    );
});

export default NewPasswordPage;
