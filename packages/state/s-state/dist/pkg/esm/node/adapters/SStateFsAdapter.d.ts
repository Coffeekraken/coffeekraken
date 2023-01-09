import type { ISStateAdapter } from '../../shared/SState';

export interface ISStateFsAdapterSettings {
    folder: string;
}
export default class SStateFsAdapter implements ISStateAdapter {
    async: boolean;
    _id: any;
    _statesDir: any;
    _stateFile: any;
    _settings: any;
    constructor(id: string, settings?: Partial<ISStateFsAdapterSettings>);
    _init(): Promise<void>;
    save(state: any): Promise<void>;
    load(): Promise<any>;
}
