/**
 * Created by ASTAKHOV A.A. on 15.04.2022
 */

import {Badge, Card, Col, Space} from 'antd';
import {FC, memo} from 'react';
import {useQuery} from 'react-query';

import {Link} from 'react-router-dom';

import $api from '../../../http';
import API from '../../../libs/API';
import {NO_DATA_SHORT} from '../../../libs/text';
import {TaskDTO} from '../../tasks/types';
import {CardData} from '../types';

const Tasks: FC = memo((): JSX.Element | null => {
    const {data: tasks} = useQuery<CardData<Pick<TaskDTO, '_id' | 'title'>>>(['dashboard', {type: 'tasks'}], () =>
        $api.get(API.dashboard('tasks')).then(response => response.data),
    );

    if (!tasks) return null;

    const {list, badge} = tasks;

    return (
        <Col span={8}>
            <Card
                title="Задачи"
                extra={
                    badge ? (
                        <Space>
                            <span>Новые задачи</span>
                            <Badge count={badge} />
                        </Space>
                    ) : undefined
                }
            >
                {typeof list !== 'undefined' && list.length > 0
                    ? list.map(task => (
                          <p key={task._id}>
                              <Link to={`/tasks/${task._id}`}>{task.title}</Link>
                          </p>
                      ))
                    : NO_DATA_SHORT}
            </Card>
        </Col>
    );
});

export default Tasks;
