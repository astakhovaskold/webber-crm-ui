import {FC, memo} from 'react';
import {useRoutes} from 'react-router-dom';

import all from './routes';

const Router: FC = memo((): JSX.Element | null => {
    return useRoutes(all);
});

export default Router;
