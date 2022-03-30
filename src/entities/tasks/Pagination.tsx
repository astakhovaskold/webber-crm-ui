import {ColumnsType} from 'antd/es/table';
import {FC, memo} from 'react';

import {Link} from 'react-router-dom';

import PaginationTable from '../../components/PaginationTable/PaginationTable';
import API from '../../libs/API';

import Status from './Status';
import {TaskDTO} from './types';

const columns: ColumnsType<TaskDTO> = [
    {
        dataIndex: 'title',
        title: 'Задача',
    },
    {
        dataIndex: 'status',
        title: 'Статус',
        render: (_, {status}) => <Status status={status.status} status_name={status.status_name} />,
    },
    {
        key: 'id',
        align: 'right',
        render: (_, {id}) => <Link to={`${id}`}>Открыть</Link>,
    },
];

const Pagination: FC = memo((): JSX.Element | null => {
    return <PaginationTable<TaskDTO> url={API.tasks()} columns={columns} />;
});

export default Pagination;
