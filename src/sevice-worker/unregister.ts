import {logError, logSW} from '../libs/log';

export function unregister(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .getRegistrations()
                .then(registrations => {
                    return Promise.all(registrations.map(registration => registration.unregister()));
                })
                .then(() => {
                    logSW('Un-registered');
                    resolve(true);
                })
                .catch(err => {
                    logError('Un-registration is failed:%s', err.message);
                    reject(new Error(`Un-registration is failed ${err.message}`));
                });
        } else {
            logSW('Not supported');
            resolve(false);
        }
    });
}
