import {LinkOutlined} from '@ant-design/icons';
import {ColumnsType} from 'antd/es/table';
import {FC, memo} from 'react';

import {Link} from 'react-router-dom';

import PaginationTable from '../../components/PaginationTable/PaginationTable';
import {WIDTH} from '../../components/PaginationTable/types';
import DateView from '../../components/view/DateView';
import URLFormatted from '../../components/view/URLFormatted';
import API from '../../libs/API';

import {DASH} from '../../libs/text';

import Status from './Status';
import {TaskDTO} from './types';

const columns: ColumnsType<TaskDTO> = [
    {
        dataIndex: 'num',
        title: '#',
        width: WIDTH.XS,
        sorter: true,
    },
    {
        dataIndex: 'title',
        title: 'Задача',
        width: WIDTH.MD,
    },
    {
        dataIndex: 'customer._id',
        title: 'Клиент',
        render: (_, {customer}) => (customer?.name ? customer.name : DASH),
        width: WIDTH.SM,
    },
    {
        dataIndex: 'project',
        title: 'Проект',
        render: (_, {project}) => (project ? <URLFormatted url={project} icon={<LinkOutlined />} /> : DASH),
        width: WIDTH.SM,
    },
    {
        dataIndex: 'status',
        title: 'Статус',
        render: (_, {status}) => <Status item={status} />,
        width: WIDTH.SM,
    },
    {
        dataIndex: 'deadline',
        title: 'Срок выполнения',
        render: (_, {deadline}) => (deadline ? <DateView date={deadline} /> : DASH),
        width: WIDTH.SM,
        sorter: true,
    },
    {
        key: 'id',
        align: 'right',
        render: (_, {_id}) => <Link to={`${_id}`}>Открыть</Link>,
    },
];

const Pagination: FC = memo((): JSX.Element | null => {
    return <PaginationTable<TaskDTO> url={API.tasks()} columns={columns} queryKey="tasks" />;
});

export default Pagination;
