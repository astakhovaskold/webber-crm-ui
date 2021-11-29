import {ConfigProvider} from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import moment from 'moment';

import ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import {_SYSTEM} from './globals';
import {logGreeting} from './libs/log';
import validateMessages from './libs/validateMessages';
import createStore from './store/store';

import 'antd/dist/antd.css';

moment.locale('ru');

const formConfig = {
    validateMessages,
};

const store = createStore();

logGreeting(`👋🏻 Welcome to ${_SYSTEM}`);

ReactDOM.render(
    <ReduxProvider store={store}>
        <ConfigProvider locale={ruRU} form={formConfig}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ConfigProvider>
    </ReduxProvider>,
    document.getElementById('app'),
);
