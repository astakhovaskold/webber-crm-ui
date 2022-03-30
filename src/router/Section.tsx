import styled from '@emotion/styled';
import {Card} from 'antd';
import {FC, memo, useEffect, useMemo} from 'react';

import {NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom';

import PageContainer from '../components/view/PageContainer';
import useAccount from '../hooks/useAccount';
import Utils from '../libs/Utils';

import {PageProps} from './types';

export const SectionLink = styled(NavLink)`
    position: relative;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.85);

    &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        bottom: -1rem;
        height: 2px;
        border-radius: 2px;
        transition: background-color 0.1s;
    }

    &.active {
        color: var(--main-color);

        ::after {
            background-color: var(--main-color);
        }
    }
`;

export const SectionNavigation = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    flex-wrap: nowrap;
    column-gap: 2rem;
`;

const Section: FC<PageProps> = memo(({path: parentPath, title: parentTitle, child}): JSX.Element | null => {
    const {account} = useAccount();
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const links = useMemo(() => child?.filter(({roles}) => Utils.hasAccess(account, roles)) ?? [], [account, child]);

    const [first] = links;

    useEffect(() => {
        if (pathname === `/${parentPath}` && first?.path) {
            navigate(first.path, {replace: true});
        }
    }, [pathname, parentPath, first, navigate]);

    return (
        <PageContainer>
            <Card
                title={
                    first ? (
                        <SectionNavigation>
                            {links.map(({path, title}) =>
                                path ? (
                                    <SectionLink key={path} to={path}>
                                        {title}
                                    </SectionLink>
                                ) : null,
                            )}
                        </SectionNavigation>
                    ) : (
                        parentTitle
                    )
                }
            >
                <Outlet />
            </Card>
        </PageContainer>
    );
});

export default Section;
