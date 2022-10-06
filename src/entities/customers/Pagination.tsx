import {ColumnsType} from 'antd/es/table';
import {FC, memo} from 'react';

import {Link} from 'react-router-dom';

import PaginationTable from '../../components/PaginationTable/PaginationTable';
import {WIDTH} from '../../components/PaginationTable/types';
import API from '../../libs/API';

import {CustomerDTO} from './types';

const columns: ColumnsType<CustomerDTO> = [
    {
        dataIndex: 'name',
        title: 'Наименование',
        width: WIDTH.MD,
    },
    {
        dataIndex: 'price',
        title: 'Цена (руб./ч)',
        width: WIDTH.SM,
    },
    {
        key: 'id',
        align: 'right',
        render: (_, {_id}) => <Link to={`${_id}`}>Открыть</Link>,
    },
];

const Pagination: FC = memo((): JSX.Element | null => {
    return <PaginationTable<CustomerDTO> url={API.customers()} columns={columns} queryKey="customers" />;
});

export default Pagination;
