/**
 * Created by ASTAKHOV A.A. on 28.03.2022
 */

import {Common, Timestamps} from '../../../typings/common';

export interface CustomerDTO extends Common, Timestamps {
    name: string;
    projects: Array<string>;
    price: number;
}
