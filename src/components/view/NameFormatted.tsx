import {FC, memo} from 'react';

import {UserName} from '../../store/account/types';

interface NameFormattedProps {
    name: UserName;
}

const NameFormatted: FC<NameFormattedProps> = memo(({name}) => {
    const {first, last} = name;
    return <>{[first, last].join(' ')}</>;
});

export default NameFormatted;
