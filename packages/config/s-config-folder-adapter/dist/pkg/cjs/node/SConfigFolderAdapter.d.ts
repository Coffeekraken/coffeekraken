import type { ISConfigEnvObj } from '@coffeekraken/s-config';
import type { ISConfigAdapterSettings } from '@coffeekraken/s-config-adapter';
import __SConfigAdapter from '@coffeekraken/s-config-adapter';

export interface ISConfigFolderAdapterScopesSettings {
    default: string[];
    module: string[];
    repo: string[];
    package: string[];
    user: string[];
}
export interface ISConfigFolderAdapterSettings extends ISConfigAdapterSettings {
    fileName: string;
    folderName: string;
    scopes: ISConfigFolderAdapterScopesSettings;
    savingScope: string;
}
export default class SConfigFolderAdapter extends __SConfigAdapter {
    _scopedSettings: any;
    _scopedFoldersPaths: any;
    _foldersPaths: string[];
    constructor(settings: Partial<ISConfigFolderAdapterSettings>);
    integrity(): Promise<any>;
    _load(folderPaths: any, clearCache: boolean, env: ISConfigEnvObj, configObj: any): Promise<any>;
    load({ clearCache, env, config }: {
        clearCache: any;
        env: any;
        config: any;
    }): Promise<any>;
}
