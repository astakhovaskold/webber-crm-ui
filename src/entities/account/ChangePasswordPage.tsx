import {Col, Row} from 'antd';
import {FC, memo} from 'react';

import {PageProps} from '../../router/types';

import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordPage: FC<PageProps> = memo(() => {
    return (
        <Row>
            <Col span={12} offset={6}>
                <ChangePasswordForm />
            </Col>
        </Row>
    );
});

export default ChangePasswordPage;
