import type { ISLog } from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SStdioAdapter from '../../shared/SStdioAdapter';

export interface ISStdioBasicAdapterLogsContainer {
}
export interface ISStdioBasicAdapterSettings {
}
export interface ISBasicStdioAdapter {
}
export default class SStdioBasicAdapter extends __SStdioAdapter implements ISBasicStdioAdapter {
    
    constructor(settings?: ISStdioBasicAdapterSettings);
    clear(): void;
    _getGroupObj(group: any, log?: boolean): any;
    
    _lastLogLinesCountStack: any[];
    _lastLogObj: any;
    _loggedGroups: any;
    _logsStack: ISStdioBasicAdapterLogsContainer[];
    log(logObj: ISLog): any;
    
    _ask(askObj: any): __SPromise;
}
