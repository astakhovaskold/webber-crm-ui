import styled from '@emotion/styled';
import {Space} from 'antd';
import {SpaceProps} from 'antd/es';
import {FC} from 'react';

export const FullSize = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //background-color: var(--main-color);
    flex: 1;
`;

export const FullWidthSpace: FC<SpaceProps> = styled(Space)`
    width: 100%;
`;

export const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
`;

export const ContainerCentered = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
`;

export const AuthFormWrapper = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
