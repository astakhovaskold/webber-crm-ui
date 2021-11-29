import styled from '@emotion/styled';
import {FC, memo} from 'react';

import {FullSize} from '../../components/containers';
import {PageProps} from '../../router/types';

import LoginForm from './LoginForm';

const FormWrapper = styled.div`
    width: 450px;
`;

const LoginPage: FC<PageProps> = memo(() => {
    return (
        <FullSize>
            <FormWrapper>
                <LoginForm />
            </FormWrapper>
        </FullSize>
    );
});

export default LoginPage;
