import type { ISConfigAdapterSettings } from '../../shared/adapters/SConfigAdapter';
import __SConfigAdapter from '../../shared/adapters/SConfigAdapter';

export interface ISConfigLsAdapterSettings extends ISConfigAdapterSettings {
}
declare class SConfigLsAdapter extends __SConfigAdapter {
    get configLsAdapterSettings(): ISConfigLsAdapterSettings;
    constructor(settings: ISConfigLsAdapterSettings);
    load(): any;
    save(newConfig?: {}): boolean;
}
export default SConfigLsAdapter;
