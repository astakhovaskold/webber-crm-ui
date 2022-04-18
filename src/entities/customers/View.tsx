import {Alert, Descriptions, Space} from 'antd';
import {FC, memo, useContext} from 'react';

import {SpaceFull} from '../../components/containers';

import PriceFormatted from '../../components/view/PriceFormatted';
import URLFormatted from '../../components/view/URLFormatted';
import useHasAccess from '../../hooks/useHasAccess';

import {DASH} from '../../libs/text';
import {CUSTOMER_EDIT} from '../../permissions';

import ArchiveButton from './ArchiveButton';
import {Context} from './Context';
import DeleteButton from './DeleteButton';
import FormCustomer from './FormCustomer';

const View: FC = memo(() => {
    const {item} = useContext(Context);
    const {name, price, is_active, is_archive, projects} = item;
    const canEdit = useHasAccess(CUSTOMER_EDIT);

    return (
        <SpaceFull direction="vertical" size="middle">
            {is_archive && <Alert message="Клиент в архиве" type="info" />}

            <Descriptions layout="vertical" column={1} colon={false} size="small">
                <Descriptions.Item label="Наименование">{name}</Descriptions.Item>

                <Descriptions.Item label="Цена">{price ? <PriceFormatted price={price} /> : DASH}</Descriptions.Item>

                <Descriptions.Item label="Проекты">
                    {projects && projects.length > 0
                        ? projects.map(project => (
                              <>
                                  <URLFormatted url={project} />
                                  &nbsp;&nbsp;&nbsp;
                              </>
                          ))
                        : DASH}
                </Descriptions.Item>

                {canEdit && (
                    <Descriptions.Item>
                        <Space direction="vertical">
                            {is_active && !is_archive && <FormCustomer />}
                            <Space>
                                <DeleteButton />
                                <ArchiveButton />
                            </Space>
                        </Space>
                    </Descriptions.Item>
                )}
            </Descriptions>
        </SpaceFull>
    );
});

export default View;
