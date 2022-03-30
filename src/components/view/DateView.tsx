import {Typography} from 'antd';
import moment, {Moment} from 'moment';
import {FC, memo, useMemo} from 'react';

import {BASE_FORMAT} from '../../libs/date';
import {INVALID_DATE, NO_DATA_SHORT} from '../../libs/text';

export type valueDateView = string | Moment | Date;

export interface DateViewProps {
    date: valueDateView;
    parse?: string;
    format?: string;
    fromNow?: boolean;
    utc?: boolean;
}

export function toMoment(date: valueDateView, parse?: string, utc = false): Moment | null {
    if (typeof date === 'string') {
        return utc ? moment.utc(date, parse) : moment(date, parse);
    }

    if (moment.isMoment(date)) return date;

    if (date instanceof Date) return moment(date);

    return null;
}

const {Text} = Typography;

const DateView: FC<DateViewProps> = memo(({date, parse, format, fromNow, utc}) => {
    const d = useMemo<Moment | null>(() => {
        return toMoment(date, parse, utc);
    }, [date, parse, utc]);

    const isValid = useMemo(() => d?.isValid() ?? true, [d]);

    const res = useMemo<string>(() => {
        return d && isValid ? d.format(format) : NO_DATA_SHORT;
    }, [isValid, d, format]);

    const fromNowText = useMemo<string | null>(() => {
        return fromNow && d && isValid ? d.fromNow() : null;
    }, [isValid, d, fromNow]);

    if (!isValid)
        return (
            <Text type="danger">
                <span role="img" aria-label="Bad date">
                    ⚠️
                </span>
                &nbsp;
                {INVALID_DATE}
            </Text>
        );

    return (
        <>
            {res}
            &nbsp;
            {fromNowText ? <Text type="secondary">({fromNowText})</Text> : null}
        </>
    );
});

DateView.defaultProps = {
    parse: undefined,
    format: BASE_FORMAT,
    fromNow: false,
    utc: false,
};

export default DateView;
