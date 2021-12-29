import {ReactPortal, memo, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const BodyPortal = memo(({children}): ReactPortal | null => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted ? ReactDOM.createPortal(children, document.getElementsByTagName('body')[0]) : null;
});

export default BodyPortal;
