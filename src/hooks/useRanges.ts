/**
 * Created by VIATKIN A.A. on 21.01.2021
 */

import {RangePickerProps} from 'antd/es/date-picker';
import moment from 'moment';
import {useMemo} from 'react';

function useRanges(): RangePickerProps['ranges'] {
    const endOfDay = useMemo(() => moment().endOf('day'), []);

    const ranges = useMemo<RangePickerProps['ranges']>(() => {
        const startOfDay = endOfDay.clone().startOf('day');
        return {
            'За неделю': [startOfDay.clone().subtract(1, 'w'), endOfDay],
            'За месяц': [startOfDay.clone().subtract(1, 'M'), endOfDay],
            'За квартал': [startOfDay.clone().subtract(1, 'quarter'), endOfDay],
            'За год': [startOfDay.clone().subtract(1, 'y'), endOfDay],
        };
    }, [endOfDay]);

    return ranges;
}

export default useRanges;
