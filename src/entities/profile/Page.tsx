import {Spin} from 'antd';
import {FC, memo} from 'react';

import {useQuery} from 'react-query';

import $api from '../../http';
import API from '../../libs/API';

import {PageProps} from '../../router/types';

import {UserDTO} from '../../store/account/types';

import {Context} from './Context';
import View from './View';

const Page: FC<PageProps> = memo((): JSX.Element | null => {
    const {data: profile} = useQuery<unknown, unknown, UserDTO>([API.profile()], () =>
        $api.get(API.profile()).then(response => response.data),
    );

    if (!profile) return <Spin />;

    return (
        <Context.Provider value={{item: profile}}>
            <View />
        </Context.Provider>
    );
});

export default Page;
