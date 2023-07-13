import type { ISDurationObject } from '@coffeekraken/s-duration';

export interface ISDobbySettings {
    uid?: string;
    adapter: ISDobbyAdapter;
}

export interface ISDobbyTaskMetas {
    uid: string;
    name: string;
    type: 'lighthouse' | 'responseTime';
    schedule: string;
    settings: ISDobbyLighhouseTaskSettings | ISDobbyResponseTimeTaskSettings;
}

export interface ISDobbyTask {
    settingsSpecs: any;
    metas: ISDobbyTaskMetas;
    run(): Promise<ISDobbyTaskResult>;
}

export interface ISDobbyTaskMetas {}
export interface ISDobbyTaskResult {
    duration: ISDurationObject;
    status: 'success' | 'error';
    logs?: string[];
}

export interface ISDobbyResponseTimeTaskSettings {
    timeout: number;
}
export interface ISDobbyResponseTimeTaskMetas extends ISDobbyTaskMetas {}
export interface ISDobbyResponseTimeTaskResult extends ISDobbyTaskResult {
    responseTime: number;
}

export interface ISDobbyError {
    message: string;
}

export interface ISDobbyConfig {
    tasks: Record<string, ISDobbyTaskMetas>;
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
