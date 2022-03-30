import {FC, memo} from 'react';

import {UserDTO} from '../../store/account/types';

interface NameFormattedProps {
    item: UserDTO;
}

const NameFormatted: FC<NameFormattedProps> = memo(({item}) => {
    const {
        name: {first, last},
    } = item;
    return <>{[first, last].join(' ')}</>;
});

export default NameFormatted;
