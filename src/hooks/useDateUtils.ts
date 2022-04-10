import {DatePickerProps, RangePickerProps} from 'antd/es/date-picker';
import {RuleRender} from 'antd/es/form';
import moment, {Moment, unitOfTime} from 'moment';
import {CSSProperties, useCallback, useMemo} from 'react';

import {BASE_FORMAT, BASE_FORMAT_WITH_TIME} from '../libs/date';

import useRanges from './useRanges';

interface UseDateUtils {
    maxToday(value: Moment): boolean;

    maxTodayRule: RuleRender;
    maxTodayRuleRange: RuleRender;

    minToday(value: Moment): boolean;

    minTodayRule: RuleRender;

    baseDatePickerProps: Omit<Partial<DatePickerProps>, 'picker'>;
    baseRangePickerProps: Omit<Partial<RangePickerProps>, 'picker'>;
}

interface UseDateUtilsWithTime extends UseDateUtils {
    withTimeDatePickerProps: Omit<Partial<DatePickerProps>, 'picker'>;
    withTimeRangePickerProp: Omit<Partial<RangePickerProps>, 'picker'>;
}

const fullWidth: CSSProperties = {width: '100%'};

type granularities = Extract<unitOfTime.StartOf, 'minute' | 'day'>;

const isMinute = (obj: UseDateUtils | UseDateUtilsWithTime, unit: granularities): obj is UseDateUtilsWithTime =>
    unit === 'minute';

function useDateUtils<T extends granularities>(unit?: T): T extends 'minute' ? UseDateUtilsWithTime : UseDateUtils {
    const granularity: granularities = unit || 'day';

    const maxToday: UseDateUtils['maxToday'] = useCallback(
        value => {
            return value.isAfter(moment(), granularity);
        },
        [granularity],
    );

    const maxTodayRule = useCallback<RuleRender>(
        () => ({
            validator(rule, value: Moment) {
                return new Promise((resolve, reject) => {
                    if (!value || value.isSameOrBefore(moment(), granularity)) {
                        resolve('');
                    } else {
                        reject(new Error('Не может быть больше текущей даты'));
                    }
                });
            },
        }),
        [granularity],
    );

    const minToday: UseDateUtils['minToday'] = useCallback(
        value => {
            return value.isBefore(moment(), granularity);
        },
        [granularity],
    );

    const minTodayRule = useCallback<RuleRender>(
        () => ({
            validator(rule, value: Moment) {
                return new Promise((resolve, reject) => {
                    if (!value || value.isSameOrAfter(moment(), granularity)) {
                        resolve('');
                    } else {
                        reject(new Error('Не может быть меньше текущей даты'));
                    }
                });
            },
        }),
        [granularity],
    );

    const maxTodayRuleRange = useCallback<RuleRender>(
        () => ({
            validator(rule, value: [Moment, Moment]) {
                return new Promise((resolve, reject) => {
                    const [startDate] = value ?? [];

                    if (!startDate || startDate.isSameOrBefore(moment(), granularity)) {
                        resolve('');
                    } else {
                        reject(new Error('Начальная дата не может быть больше текущей даты'));
                    }
                });
            },
        }),
        [granularity],
    );

    const baseDatePickerProps = useMemo<Omit<Partial<DatePickerProps>, 'picker'>>(
        () => ({
            allowClear: false,
            showTime: false,
            showSecond: false,
            format: BASE_FORMAT,
            style: fullWidth,
        }),
        [],
    );

    const withTimeDatePickerProps = useMemo<Omit<Partial<DatePickerProps>, 'picker'>>(
        () => ({
            ...baseDatePickerProps,
            showTime: {
                defaultValue: moment(),
            },
            format: BASE_FORMAT_WITH_TIME,
        }),
        [baseDatePickerProps],
    );

    const ranges = useRanges();

    const baseRangePickerProps = useMemo<Omit<Partial<RangePickerProps>, 'picker'>>(
        () => ({
            allowClear: true,
            showSecond: false,
            format: BASE_FORMAT,
            showTime: false,
            style: fullWidth,
            ranges,
        }),
        [ranges],
    );

    const withTimeRangePickerProp = useMemo<Omit<Partial<RangePickerProps>, 'picker'>>(
        () => ({
            ...baseRangePickerProps,
            showTime: {
                hideDisabledOptions: true,
                defaultValue: [moment().startOf('day'), moment().endOf('day')],
            },
            format: BASE_FORMAT_WITH_TIME,
        }),
        [baseRangePickerProps],
    );

    const baseProps = useMemo<UseDateUtils>(
        () => ({
            maxToday,
            maxTodayRule,
            minToday,
            minTodayRule,
            baseDatePickerProps,
            baseRangePickerProps,
            maxTodayRuleRange,
        }),
        [baseDatePickerProps, baseRangePickerProps, maxToday, maxTodayRule, maxTodayRuleRange, minToday, minTodayRule],
    );

    const basePropsWithTime = useMemo<UseDateUtilsWithTime>(
        () => ({
            ...baseProps,
            withTimeDatePickerProps,
            withTimeRangePickerProp,
        }),
        [baseProps, withTimeDatePickerProps, withTimeRangePickerProp],
    );

    return isMinute(baseProps, granularity) ? baseProps : basePropsWithTime;
}

export default useDateUtils;
