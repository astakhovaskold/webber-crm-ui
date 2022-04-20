import {SwapLeftOutlined} from '@ant-design/icons';
import {Button, Space} from 'antd';
import {FC, memo} from 'react';

import {Link} from 'react-router-dom';

import {AuthFormWrapper, FullScreenContainer} from '../../components/containers';
import {PageProps} from '../../router/types';

import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordPage: FC<PageProps> = memo(() => {
    return (
        <FullScreenContainer>
            <Space size="small" direction="vertical">
                <AuthFormWrapper>
                    <ResetPasswordForm />
                </AuthFormWrapper>

                <Link to="/login">
                    <Button type="link" icon={<SwapLeftOutlined />}>
                        Назад
                    </Button>
                </Link>
            </Space>
        </FullScreenContainer>
    );
});

export default ResetPasswordPage;
