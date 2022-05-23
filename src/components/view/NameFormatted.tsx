import {FC, memo, useMemo} from 'react';

interface UserName {
    first_name: string;
    last_name?: string;
    middle_name?: string;
}

interface NameFormattedProps {
    name: UserName;
}

const NameFormatted: FC<NameFormattedProps> = memo(({name}) => {
    const {first_name, last_name, middle_name} = name;

    const nameToFormat = useMemo(
        () => (middle_name ? [last_name, first_name, middle_name] : [first_name, last_name]),
        [first_name, last_name, middle_name],
    );

    return <>{nameToFormat.join(' ')}</>;
});

export default NameFormatted;
