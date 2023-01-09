import type { ISConfigEnvObj } from '@coffeekraken/s-config';
import type { ISConfigAdapterSettings } from '@coffeekraken/s-config-adapter';
import __SConfigAdapter from '@coffeekraken/s-config-adapter';

export interface ISConfigInlineAdapterSettings extends ISConfigAdapterSettings {
}
export default class SConfigInlineAdapter extends __SConfigAdapter {
    _json: any;
    constructor(json: any, settings: Partial<ISConfigInlineAdapterSettings>);
    integrity(): Promise<any>;
    load(clearCache: boolean, env: ISConfigEnvObj, configObj: any): Promise<any>;
}
