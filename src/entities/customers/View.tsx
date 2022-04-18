import {Descriptions} from 'antd';
import {FC, memo, useContext} from 'react';

import {SpaceFull} from '../../components/containers';

import PriceFormatted from '../../components/view/PriceFormatted';
import useHasAccess from '../../hooks/useHasAccess';

import {DASH} from '../../libs/text';
import {TASK_EDIT} from '../../permissions';

import {Context} from './Context';
import FormCustomer from './FormCustomer';

const View: FC = memo(() => {
    const {item} = useContext(Context);
    const {name, price, is_active, projects} = item;
    const canEdit = useHasAccess(TASK_EDIT);

    return (
        <SpaceFull direction="vertical" size="middle">
            <Descriptions layout="vertical" column={1} colon={false} size="small">
                <Descriptions.Item label="Наименование">{name}</Descriptions.Item>

                <Descriptions.Item label="Цена">{price ? <PriceFormatted price={price} /> : DASH}</Descriptions.Item>

                <Descriptions.Item label="Проекты">
                    {projects && projects.length > 0
                        ? projects.map(project => (
                              <>
                                  <a key={project} href={project} target="_blank" rel="noreferrer">
                                      {new URL(project).hostname}
                                  </a>
                                  &nbsp;&nbsp;&nbsp;
                              </>
                          ))
                        : DASH}
                </Descriptions.Item>

                {canEdit && <Descriptions.Item>{is_active && <FormCustomer />}</Descriptions.Item>}
            </Descriptions>
        </SpaceFull>
    );
});

export default View;
