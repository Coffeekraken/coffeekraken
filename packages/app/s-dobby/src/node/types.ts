import type {
    ISDobbyConfig,
    ISDobbyTaskMetas,
    ISDobbyTaskResult,
} from '../shared/types';

export interface ISDobbySettings {
    uid?: string;
    adapter: ISDobbyAdapter;
}

export interface ISDobbyTask {
    settingsSpecs: any;
    metas: ISDobbyTaskMetas;
    run(): Promise<ISDobbyTaskResult>;
}

export interface ISDobbyStartParams {
    uid?: string;
}

export interface ISDobbySaveConfigResult {}

export interface ISDobbySessionResult {}

export interface ISDobbyAdapter {
    loadConfig(uid: string): Promise<ISDobbyConfig>;
    saveConfig(
        uid: string,
        config: ISDobbyConfig,
    ): Promise<ISDobbySaveConfigResult>;
}

export interface ISDobbyAdapterSettings {}

export interface ISDobbyFsAdapterSettings extends ISDobbyAdapterSettings {
    rootDir: string;
    uid: string;
}
