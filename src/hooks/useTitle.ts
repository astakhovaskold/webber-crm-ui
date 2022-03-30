/**
 * Created by ASTAKHOV A.A. on 29.03.2022
 */

import {useLocation} from 'react-router-dom';

function useTitle(): string {
    const location = useLocation();

    return location.pathname;
}

export default useTitle;
