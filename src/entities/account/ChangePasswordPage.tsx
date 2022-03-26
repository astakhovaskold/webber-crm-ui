import {Col, Row} from 'antd';
import {FC, memo} from 'react';

import PageContainer from '../../components/view/PageContainer';
import {PageProps} from '../../router/types';

import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordPage: FC<PageProps> = memo(() => {
    return (
        <PageContainer>
            <Row>
                <Col span={12} offset={6}>
                    <ChangePasswordForm />
                </Col>
            </Row>
        </PageContainer>
    );
});

export default ChangePasswordPage;
