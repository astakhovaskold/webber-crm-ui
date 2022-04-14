import {Col, Form, Row, Space, Switch} from 'antd';
import {FC, memo, useCallback, useMemo} from 'react';

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

    const initialValues = useMemo(
        () => ({
            ...filter,
            is_archive: false,
            is_done: false,
        }),
        [filter],
    );

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
                <Form onValuesChange={onChange} initialValues={initialValues}>
                    <Item noStyle>
                        <Space size="large">
                            <Item noStyle>
                                <Space direction="horizontal" align="center">
                                    <Item noStyle name="is_archive" valuePropName="checked">
                                        <Switch />
                                    </Item>

                                    <span>Показать архив</span>
                                </Space>
                            </Item>

                            <Item noStyle>
                                <Space direction="horizontal" align="center">
                                    <Item noStyle name="is_done" valuePropName="checked">
                                        <Switch />
                                    </Item>

                                    <span>Показать выполненные</span>
                                </Space>
                            </Item>
                        </Space>
                    </Item>
                </Form>
            </Col>
        </Row>
    );
});

export default Filter;
