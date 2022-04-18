/**
 * Created by ASTAKHOV A.A. on 18.04.2022
 */

import {FC, memo} from 'react';

import {CURRENCY} from '../../libs/text';

interface PriceFormattedProps {
    price: number;
    currency?: CURRENCY;
}

const PriceFormatted: FC<PriceFormattedProps> = memo(({price, currency}): JSX.Element | null => {
    return (
        <>
            {price} {currency}
        </>
    );
});

PriceFormatted.defaultProps = {
    currency: CURRENCY.RUB,
};

export default PriceFormatted;
