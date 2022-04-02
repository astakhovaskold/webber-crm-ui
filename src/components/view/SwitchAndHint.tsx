import {Space, Switch, SwitchProps, Typography} from 'antd';
import {FC, memo} from 'react';

interface SwitchHintProps extends SwitchProps {
    title: string;
}

const {Text} = Typography;

const SwitchHint: FC<SwitchHintProps> = memo(({title, ...props}) => {
    return (
        <Space>
            <Switch {...props} />
            <Text>{title}</Text>
        </Space>
    );
});

export default SwitchHint;
