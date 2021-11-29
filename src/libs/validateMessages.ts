import {ConfigProviderProps} from 'antd/es/config-provider';

export const validateMessagesSimple: Required<ConfigProviderProps>['form']['validateMessages'] = {
    required: 'Обязательное поле',
    whitespace: 'Пробелы недопустимы',
};

const validateMessages: Required<ConfigProviderProps>['form']['validateMessages'] = {
    required: 'Обязательное поле',
    whitespace: 'Пробелы недопустимы',

    string: {
        min: '«${label}» не менее ${min} символов',
        max: '«${label}» не более ${max} символов',
        range: '«${label}» от ${min} до ${max} символов',
        len: '«${label}» состоит из ${len} символов',
    },
};

export default validateMessages;
