/* eslint-disable no-console */

function log(prefix: string, color: string, text: string, ...rest: Array<unknown>): void {
    const style = [`background: ${color}`, 'color: #fff', 'padding: 0px 4px', 'text-transform: uppercase'].join(';');
    const styleRest = ['padding: 0px 0px 0px 4px'].join(';');
    console.debug(`%c%s%c️${text}`, style, prefix, styleRest, ...rest);
}

export function logError(text: string, ...rest: Array<unknown>): void {
    log('ERROR', '#F44336', text, ...rest);
}

export function logApp(text: string, ...rest: Array<unknown>): void {
    log('APP', '#1976D2', text, ...rest);
}

export function logSW(text: string, ...rest: Array<unknown>): void {
    log('Service Worker', '#455A64', text, ...rest);
}

export function logWS(text: string, ...rest: Array<unknown>): void {
    log('Web Socket', '#512DA8', text, ...rest);
}

export function logGreeting(text: string): void {
    const style = [
        'background: #000',
        'color: #fff',
        'padding: 4px 12px',
        'line-height: 1rem',
        'border: 1px dotted #fff',
    ].join(';');
    console.log('%c%s', style, text);
}

export default log;
