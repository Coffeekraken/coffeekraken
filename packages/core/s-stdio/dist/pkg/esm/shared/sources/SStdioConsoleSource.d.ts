import type { ISStdioSource, ISStdioSourceSettings } from '../SStdioSource';
import __SStdioSource from '../SStdioSource';
export interface ISStdioConsoleSource extends ISStdioSource {
}
export interface ISStdioConsoleSourceSettings extends ISStdioSourceSettings {
}
export default class SStdioConsoleSource extends __SStdioSource implements ISStdioConsoleSource {
    _tmpPrintedLogs: any[];
    constructor(settings?: Partial<ISStdioConsoleSourceSettings>);
    
    _restoreNativeConsole(): void;
    
    _overrideNativeConsole(): void;
}
