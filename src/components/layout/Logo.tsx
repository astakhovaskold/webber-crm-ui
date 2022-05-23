import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {FC, memo} from 'react';

interface LogoProps {
    dark?: boolean;
}

const logoPadding = css`
    padding: 0.375rem 0;
`;

const Title = styled.span`
    --color: #fff;

    position: relative;
    color: var(--color);
    font-weight: bold;
    font-size: 14px;
    line-height: 1;
    text-transform: uppercase;
    user-select: none;
    display: flex;
    flex-direction: column;
    ${logoPadding};

    &[data-prefix]::before {
        content: attr(data-prefix);
        font-size: 8px;
        font-weight: lighter;
    }

    &[data-postfix]::after {
        content: attr(data-postfix);
        font-size: 8px;
        font-weight: lighter;
    }

    & + & {
        border-left: 1px solid var(--color);
        margin-left: 0.5rem;
        padding-left: 0.5rem;
    }
`;

const Container = styled.div<LogoProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;
    flex-shrink: 0;

    ${({dark}) =>
        dark &&
        css`
            height: 64px;
            padding: 0 0 1rem;

            & ${Title} {
                --color: var(--color-text-dark);
            }
        `};
`;

const Logo: FC<LogoProps> = memo(({dark = false}) => {
    return (
        <Container dark={dark}>
            <Title data-postfix="CRM">WEBBER</Title>
        </Container>
    );
});

export default Logo;
