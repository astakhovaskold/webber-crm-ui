import {Col, Form, Row} from 'antd';
import {FC, memo, useCallback} from 'react';

import SwitchAndHint from '../../components/view/SwitchAndHint';
import useFilterPagination from '../../hooks/pagination/useFilterPagination';
import useHasAccess from '../../hooks/useHasAccess';
import API from '../../libs/API';

import {TASK_EDIT} from '../../permissions';

import FormTask from './FormTask';
import {TaskFilter} from './types';

const {Item} = Form;

const Filter: FC = memo((): JSX.Element | null => {
    const canEdit = useHasAccess(TASK_EDIT);

    const [filter, setFilter] = useFilterPagination<TaskFilter>(API.tasks());

    const onChange = useCallback(
        changed => {
            setFilter(changed);
        },
        [setFilter],
    );

    return (
        <Row gutter={[8, 8]}>
            {canEdit && (
                <Col>
                    <FormTask />
                </Col>
            )}
            <Col>
                <Form onValuesChange={onChange} initialValues={filter}>
                    <Item name="is_active" valuePropName="checked">
                        <SwitchAndHint title="Все задачи" />
                    </Item>
                </Form>
            </Col>
        </Row>
    );
});

export default Filter;
