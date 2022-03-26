import {FC, memo, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {_SYSTEM_NAME} from '../../globals';

interface TitleProps {
    value: string;
}

const Title: FC<TitleProps> = memo(({value}): null => {
    const {pathname, search} = useLocation();

    useEffect(() => {
        document.title = value ? `${value} | ${_SYSTEM_NAME}` : _SYSTEM_NAME;
    }, [value, pathname, search]);

    return null;
});

export default Title;
