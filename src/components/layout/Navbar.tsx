import styled from '@emotion/styled';
import {FC, memo} from 'react';
import {NavLink} from 'react-router-dom';

import routes from '../../router/routes';

const NavLinkStyled = styled(NavLink)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1rem 1rem;
    transition: background-color 0.1s;

    &,
    &:active,
    &:focus,
    &:visited {
        color: #fff;
        opacity: 0.7;
        text-decoration: none;
    }

    &.active,
    &:hover {
        opacity: 1;
        color: #fff;
    }
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0 1rem;
    flex: 1 1 auto;
`;

const Navbar: FC = memo(() => {
    return (
        <Nav>
            {routes.map(({path, title, navigation = true}) => (
                <>
                    {path && navigation && (
                        <NavLinkStyled key={path || title} to={path}>
                            {title}
                        </NavLinkStyled>
                    )}
                </>
            ))}
        </Nav>
    );
});

export default Navbar;
