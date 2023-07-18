export * from '../node/types.js';

import type { ISDurationObject } from '@coffeekraken/s-duration';

export interface SDobbyClientSettings {
    host: string;
    port: number;
}

export interface ISDobbyTaskMetas {
    uid: string;
    name: string;
    type: 'lighthouse' | 'responseTime';
    schedule: string;
    settings: ISDobbyLighhouseTaskSettings | ISDobbyResponseTimeTaskSettings;
}

export interface ISDobbyTaskResult {
    duration: ISDurationObject;
    time: number;
    status: 'success' | 'warning' | 'error';
    logs?: string[];
    task: ISDobbyTaskMetas;
}

export interface ISDobbyLighhouseTaskSettings {}

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
