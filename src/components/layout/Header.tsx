import styled from '@emotion/styled';
import {Col, Row} from 'antd';
import {FC, memo} from 'react';

import Logo from './Logo';
import Navbar from './Navbar';

const HeaderContainer = styled.header`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    background-color: var(--color-dark);
    z-index: 50;
    flex-shrink: 0;
`;

const Header: FC = memo((): JSX.Element | null => {
    return (
        <Row gutter={8}>
            <Col span={24}>
                <HeaderContainer>
                    <Logo />
                    <Navbar />
                </HeaderContainer>
            </Col>
        </Row>
    );
});

export default Header;
