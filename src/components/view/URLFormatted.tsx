/**
 * Created by ASTAKHOV A.A. on 18.04.2022
 */

import {FC, memo, ReactNode, useMemo} from 'react';

interface URLFormattedProps {
    url: string;
    format?: keyof Omit<URL, 'toString' | 'toJSON' | 'origin'>;
    link?: boolean;
    icon?: ReactNode;
}

const URLFormatted: FC<URLFormattedProps> = memo(
    ({url, format = 'hostname', link = true, icon}): JSX.Element | null => {
        const formatted = useMemo(() => new URL(url)[format], [format, url]);

        return (
            <>
                {link ? (
                    <a href={url} target="_blank" rel="noreferrer">
                        {formatted} {icon && icon}
                    </a>
                ) : (
                    formatted
                )}
            </>
        );
    },
);

URLFormatted.defaultProps = {
    format: 'hostname',
    link: true,
};

export default URLFormatted;
