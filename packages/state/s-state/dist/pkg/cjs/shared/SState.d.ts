import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';

export interface ISStateSettings {
    id: string;
    save: boolean;
    adapter: ISStateAdapter;
    watchDeep: boolean;
    exclude: String[];
}
export interface ISStateAdapter {
    save(id: string, state: any): Promise<void> | void;
    load(id: string): Promise<any> | void;
}
export default class SState extends __SClass {
    
    _proxy: any;
    
    _eventEmitter: __SEventEmitter;
    
    constructor(object: any, settings?: Partial<ISStateSettings>);
}
