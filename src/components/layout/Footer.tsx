/**
 * Created by ASTAKHOV A.A. on 20.04.2022
 */

import styled from '@emotion/styled';
import {FC, memo} from 'react';

const FooterContainer = styled.footer`
    padding: 1.5rem;
    text-align: center;
`;

const Footer: FC = memo((): JSX.Element | null => {
    return (
        <FooterContainer>
            Webber CRM ©{new Date().toLocaleDateString('ru-RU', {year: 'numeric'})} Created by Askold Astakhov
        </FooterContainer>
    );
});

export default Footer;
