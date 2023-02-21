import type { ISEventEmitter } from '@coffeekraken/s-event-emitter';
import type { ISStdioSettings } from '../shared/SStdio';
import __SStdio from '../shared/SStdio';

export default class SStdio extends __SStdio {
    
    constructor(id: string, sources: ISEventEmitter | ISEventEmitter[], settings?: Partial<ISStdioSettings>);
}
