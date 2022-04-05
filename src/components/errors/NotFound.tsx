import {Button, Result} from 'antd';
import {FC, memo} from 'react';

import {useNavigate} from 'react-router-dom';

import {ERROR_404} from '../../libs/text';

const NotFound: FC = memo((): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title={ERROR_404}
            extra={
                <Button onClick={() => navigate('..')} type="primary">
                    На главную
                </Button>
            }
        />
    );
});

export default NotFound;
