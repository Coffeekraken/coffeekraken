import type { ISLog, ISLogAsk } from '@coffeekraken/s-log';
import __SStdioAdapter from '../../shared/SStdioAdapter';

export interface ISStdioNotificationAdapterLogsContainer {
}
export interface ISStdioNotificationAdapterSettings {
}
export interface ISNotificationStdioAdapter {
}
export default class SStdioBasicAdapter extends __SStdioAdapter implements ISNotificationStdioAdapter {
    
    constructor(settings?: ISStdioNotificationAdapterSettings);
    clear(): void;
    
    log(logObj: ISLog): void;
    
    ask(askObj: ISLogAsk): any;
}
