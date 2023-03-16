import type { ISLog, ISLogAsk } from '@coffeekraken/s-log';
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
    
    _currentLogId: string;
    _lastLogLinesCountStack: any[];
    _lastLogObj: any;
    _loggedGroups: any;
    _logsStack: ISStdioBasicAdapterLogsContainer[];
    log(logObj: ISLog): any;
    _getPromptClass(BasePromptClass: any): any;
    
    ask(askObj: ISLogAsk): __SPromise;
}
