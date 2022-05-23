import {ExclamationCircleOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import {Button, Col, DatePicker, Drawer, Form, Input, InputNumber, Row, Select, Switch} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import {FC, memo, useCallback, useContext, useMemo, useState} from 'react';

import {useMutation, useQueryClient} from 'react-query';

import {BaseDrawerProps} from '../../components/BaseProps';
import {PaginationResult} from '../../components/PaginationTable/types';
import Request from '../../components/utils/Request';
import useDateUtils from '../../hooks/useDateUtils';
import $api from '../../http';
import API from '../../libs/API';

import {CustomerDTO} from '../customers/types';

import {Context} from './Context';
import {StatusDTO, TaskDTO, TaskFormValues} from './types';

const {Item} = Form;

const Number = styled(InputNumber)`
    width: 100%;
`;

const FormTask: FC = memo((): JSX.Element | null => {
    const [visible, setVisible] = useState(false);
    const {item} = useContext(Context);

    const {minToday, baseDatePickerProps} = useDateUtils();

    const queryClient = useQueryClient();

    const isCreate = !item?._id;

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    const {mutate: save, isLoading} = useMutation<TaskDTO, void, TaskFormValues>(
        task =>
            new Promise((resolve, reject) => {
                try {
                    if (isCreate) {
                        return resolve($api.post(API.tasks(), task).then(response => response.data));
                    }

                    return resolve($api.patch(API.tasks(item._id), task).then(response => response.data));
                } catch (e) {
                    reject(new Error('Непредвиденная ошибка'));
                }
            }),
        {
            onSuccess: async () => {
                setVisible(false);
                await queryClient.invalidateQueries(API.tasks());
            },
        },
    );

    const initialValues = useMemo(() => {
        return {
            ...item,
            status: item.status?._id,
            customer: item.customer?._id,
            deadline: item.deadline ? moment(item.deadline) : undefined,
        };
    }, [item]);

    const ButtonStyle = useMemo(
        () =>
            isCreate
                ? {}
                : {
                      width: '100%',
                  },
        [isCreate],
    );

    return (
        <>
            <Button type="primary" style={ButtonStyle} onClick={() => setVisible(true)}>
                {isCreate ? 'Создать задачу' : 'Изменить'}
            </Button>

            <Drawer
                {...BaseDrawerProps}
                visible={visible}
                closable={!isLoading}
                maskClosable={!isLoading}
                onClose={onClose}
                destroyOnClose
                footer={
                    <Button loading={isLoading} block type="primary" htmlType="submit" form="formTask">
                        Сохранить
                    </Button>
                }
                title="Новая задача"
            >
                <Form name="formTask" colon={false} layout="vertical" initialValues={initialValues} onFinish={save}>
                    <Item name="title" label="Название задачи" rules={[{required: true}, {type: 'string', max: 64}]}>
                        <Input autoComplete="title" />
                    </Item>

                    <Item name="description" label="Описание" rules={[{type: 'string', max: 1024}]}>
                        <TextArea size="large" />
                    </Item>

                    <Request
                        url={API.customers()}
                        queryKey={['customers', {id: item._id}]}
                        render={(res: PaginationResult<CustomerDTO>) => {
                            return (
                                <Item name="customer" label="Клиент" rules={[{required: true}]}>
                                    <Select
                                        placeholder="Клиент"
                                        disabled={!res}
                                        loading={!res}
                                        options={res?.content.map(({_id: value, name: label}) => ({
                                            value,
                                            label,
                                        }))}
                                    />
                                </Item>
                            );
                        }}
                    />

                    <Item
                        noStyle
                        shouldUpdate={(prevValues: TaskFormValues, nextValues: TaskFormValues) =>
                            prevValues.customer !== nextValues.customer
                        }
                    >
                        {({getFieldValue}) => {
                            const customer = getFieldValue('customer');

                            if (!customer) return null;

                            return (
                                <Request
                                    url={API.customers(customer)}
                                    queryKey={['customers', {id: customer}]}
                                    render={(res: CustomerDTO) => {
                                        return (
                                            <Item name="project" label="Проект">
                                                <Select
                                                    placeholder="Проект"
                                                    disabled={!res}
                                                    loading={!res}
                                                    options={res?.projects?.map(p => ({
                                                        value: p,
                                                        label: new URL(p).hostname,
                                                    }))}
                                                />
                                            </Item>
                                        );
                                    }}
                                />
                            );
                        }}
                    </Item>

                    {!isCreate && (
                        <Request
                            url={API.directory('status')}
                            queryKey={['status', {id: item._id}]}
                            render={(res: PaginationResult<StatusDTO>) => {
                                return (
                                    <Item name="status" label="Статус" rules={[{required: true}]}>
                                        <Select
                                            placeholder="Статус задачи"
                                            disabled={!res}
                                            loading={!res}
                                            options={res?.content.map(({_id: value, status_name: label}) => ({
                                                value,
                                                label,
                                            }))}
                                        />
                                    </Item>
                                );
                            }}
                        />
                    )}

                    <Item label="Срок выполнения" name="deadline" validateFirst>
                        <DatePicker {...baseDatePickerProps} disabledDate={minToday} allowClear />
                    </Item>

                    <Item noStyle>
                        <Row gutter={[8, 8]} wrap={false}>
                            <Col flex="auto">
                                <Item label="Оценка (ч)" name="estimate" rules={[{type: 'number', min: 0}]}>
                                    <Number step={0.25} min={0} />
                                </Item>
                            </Col>

                            <Col flex="auto">
                                <Item label="Учёт времени (ч)" name="actually" rules={[{type: 'number', min: 0}]}>
                                    <Number step={0.25} min={0} />
                                </Item>
                            </Col>
                        </Row>
                    </Item>

                    <Item
                        name="is_fixed_price"
                        label="Фиксированная стоимость"
                        tooltip={{
                            icon: <ExclamationCircleOutlined />,
                            title: 'Когда выключено, стоимость считается автоматически',
                        }}
                        valuePropName="checked"
                    >
                        <Switch />
                    </Item>

                    <Item
                        noStyle
                        shouldUpdate={(prevValues: TaskFormValues, nextValues: TaskFormValues) =>
                            prevValues.is_fixed_price !== nextValues.is_fixed_price
                        }
                    >
                        {({getFieldValue}) => {
                            const is_fixed_price: TaskFormValues['is_fixed_price'] = getFieldValue('is_fixed_price');

                            if (!is_fixed_price && isCreate) return null;

                            return (
                                <Item name="price" label="Стоимость задачи" rules={[{type: 'number'}]}>
                                    <Number step={100} min={0} readOnly={!is_fixed_price} prefix="₽" />
                                </Item>
                            );
                        }}
                    </Item>
                </Form>
            </Drawer>
        </>
    );
});

export default FormTask;
