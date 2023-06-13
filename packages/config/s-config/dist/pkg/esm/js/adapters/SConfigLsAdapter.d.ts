import type { ISConfigAdapterSettings } from '@coffeekraken/s-config-adapter';
import __SConfigAdapter from '@coffeekraken/s-config-adapter';

export interface ISConfigLsAdapterSettings extends ISConfigAdapterSettings {
}
declare class SConfigLsAdapter extends __SConfigAdapter {
    get configLsAdapterSettings(): ISConfigLsAdapterSettings;
    constructor(settings: ISConfigLsAdapterSettings);
    load(): any;
    save(newConfig?: {}): boolean;
}
export default SConfigLsAdapter;
