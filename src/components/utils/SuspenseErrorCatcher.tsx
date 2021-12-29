import styled from '@emotion/styled';
import {Component} from 'react';

import {unregister} from '../../sevice-worker/unregister';

import BodyPortal from './BodyPortal';

interface State {
    isChunkError: boolean;
    error?: Error;
}

const Code = styled.pre`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    margin: 0;
    padding: 1rem;
    background-color: darkred;
    color: #ffffff;
    z-index: 2000;
`;

class SuspenseErrorCatcher extends Component<Record<string, unknown>, State> {
    constructor(props: Record<string, unknown>) {
        super(props);

        this.state = {
            isChunkError: false,
            error: undefined,
        };
    }

    static getDerivedStateFromError(error: Error) {
        const isChunkError = error.name === 'ChunkLoadError';
        if (isChunkError && navigator.onLine) {
            unregister().then(() => {
                window.location.reload();
            });
        }
        return {error, isChunkError};
    }

    render() {
        const {children} = this.props;
        const {isChunkError, error} = this.state;

        if (error && !isChunkError) {
            return (
                <BodyPortal>
                    <Code>{error.toString()}</Code>
                </BodyPortal>
            );
        }

        return children;
    }
}

export default SuspenseErrorCatcher;
