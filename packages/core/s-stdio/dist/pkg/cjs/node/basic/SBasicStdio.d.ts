import type { ISEventEmitter } from '@coffeekraken/s-event-emitter';
import type { ISLog } from '@coffeekraken/s-log';
import __SStdio from '../../shared/SStdio';

export interface ISBasicStdioLogsContainer {
}
export interface ISBasicStdioSettings {
}
export interface ISBasicStdio {
}
declare class SBasicStdio extends __SStdio implements ISBasicStdio {
    
    constructor(id: string, sources: ISEventEmitter | ISEventEmitter[], settings?: ISBasicStdioSettings);
    clear(): void;
    _getGroupObj(group: any, log?: boolean): any;
    
    _currentLogId: string;
    _lastLogLinesCountStack: any[];
    _lastLogObj: any;
    _loggedGroups: any;
    _logsStack: ISBasicStdioLogsContainer[];
    _log(logObj: ISLog, component: any): void;
    _addPrefix(string: string): string;
    _removePrefix(string: string): string;
    _getPromptClass(BasePromptClass: any): any;
    
    _ask(askObj: any): any;
}
export default SBasicStdio;
