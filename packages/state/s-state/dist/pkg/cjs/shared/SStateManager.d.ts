import __SClass from '@coffeekraken/s-class';
import type { ISStateSettings } from './SState';
import __SState from './SState';

export interface ISStateManagerSettings {
    id: string;
    save: boolean;
}
export default class SStateManager extends __SClass {
    
    constructor(settings?: Partial<ISStateManagerSettings>);
    
    define(id: string, state: any, settings?: Partial<ISStateSettings>): __SState;
}
