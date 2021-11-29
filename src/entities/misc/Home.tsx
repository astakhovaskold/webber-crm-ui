import {memo, FC, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';

import {PageProps} from '../../router/types';

const Home: FC<PageProps> = memo((): JSX.Element | null => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, [navigate]);

    return null;
});

export default Home;
