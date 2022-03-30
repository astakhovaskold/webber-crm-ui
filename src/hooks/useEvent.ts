/**
 * Created by VIATKIN A.A. on 23.12.2019
 */

import {useCallback, useEffect, useRef} from 'react';

export const emitter = <T>(name: string, detail?: T): Promise<void> => {
    document.dispatchEvent(new CustomEvent(name, {detail}));
    return Promise.resolve();
};

function useEvent<TT>(name: string, fn?: (data: TT) => void, isActive = true): [(detail?: TT) => void] {
    const f = useRef(fn);

    useEffect(() => {
        f.current = fn;
    }, [fn]);

    useEffect(() => {
        if (isActive) {
            const handler = ({detail}: CustomEvent): void => {
                if (typeof f.current === 'function') {
                    f.current(detail);
                }
            };

            // @ts-ignore
            document.addEventListener(name, handler);

            // @ts-ignore
            return () => document.removeEventListener(name, handler);
        }
    }, [name, isActive]);

    const emit = useCallback(
        detail => {
            emitter(name, detail);
        },
        [name],
    );

    return [emit];
}

export default useEvent;
