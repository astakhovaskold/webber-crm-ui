import {FC, memo, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {_SYSTEM} from '../../globals';

interface TitleProps {
    value: string;
}

const Title: FC<TitleProps> = memo(({value}): null => {
    const {pathname, search} = useLocation();

    useEffect(() => {
        document.title = value ? `${value} | ${_SYSTEM}` : _SYSTEM;
    }, [value, pathname, search]);

    return null;
});

export default Title;
