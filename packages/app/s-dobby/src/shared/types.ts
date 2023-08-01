import type { ISDurationObject } from '@coffeekraken/s-duration';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SDobby from '../node/exports';

export interface ISDobbySettings {
    uid?: string;
    pool: ISDobbyPool;
}
export interface ISDobbyTaskStatic {
    settingsSpecs: any;
}

export interface ISDobbyTask {
    metas: ISDobbyTaskMetas;
    run(): Promise<ISDobbyTaskResult>;
}

export interface ISDobbyPoolStartParams {}

export interface ISDobbySaveConfigResult {}

export interface ISDobbySessionResult {}

export interface ISDobbyPoolEvent {
    pool: ISDobbyPoolMetas;
    config: ISDobbyPoolConfig;
}

export interface ISDobbyPool {
    config: ISDobbyPoolConfig;
    uid: string;
    dobby: __SDobby;
    events: __SEventEmitter;
    metas: ISDobbyPoolMetas;
    start(): Promise<void | ISDobbyError>;
    executeTask(
        taskMetasOrUid: String | ISDobbyTaskMetas,
    ): Promise<ISDobbyTaskResult>;
    getTask(uid: string): ISDobbyTaskMetas;
    addTask(taskMetas: ISDobbyTaskMetas): Promise<void | ISDobbyError>;
    removeTask(taskUid: string): Promise<void | ISDobbyError>;
    loadConfig(): Promise<ISDobbyPoolConfig>;
    saveConfig(): Promise<ISDobbySaveConfigResult>;
}

export interface ISDobbyClientSettings {
    host: string;
    port: number;
}

export interface ISDobbyPoolMetas {
    uid: string;
    type: 'fs' | 'p2p';
    name: string;
    settings: ISDobbyFsPoolSettings | ISDobbyP2pPoolSettings;
}

export interface ISDobbyPoolSettings {
    uid: string;
}

export interface ISDobbyFsPoolSettings extends ISDobbyPoolSettings {
    rootDir: string;
}

export interface ISDobbyP2pPoolSettings extends ISDobbyPoolSettings {
    key: string;
    pub: string;
    priv: string;
    eprub: string;
    epriv: string;
}

export interface ISDobbyTaskMetas {
    uid: string;
    name: string;
    type: 'lighthouse' | 'responseTime';
    state: 'active' | 'paused';
    status: 'running' | 'idle';
    schedule: string;
    poolUid: string;
    settings: ISDobbyLighthouseTaskSettings | ISDobbyResponseTimeTaskSettings;
}

export interface ISDobbyTaskResult {
    uid: string;
    duration: ISDurationObject;
    time: number;
    status: 'success' | 'warning' | 'error';
    geo: {
        country: {
            iso: string;
            name: string;
        };
        city: {
            postal: string;
            name: string;
        };
        timezone: string;
        lat: number;
        lng: number;
    };
    logs?: string[];
    task: ISDobbyTaskMetas;
    pool: ISDobbyPoolMetas;
}

export interface ISDobbyLighthouseTaskSettings {}
export interface ISDobbyLighthouseTaskResult extends ISDobbyTaskResult {
    lighthouseVersion: string;
    requestedUrl: string;
    userAgent: string;
    audits: Record<
        string,
        {
            id: string;
            title: string;
            description: string;
            score: number;
            displayValue: string;
        }
    >;
    categories: Record<
        string,
        {
            title: string;
            score: number;
            audits: string[];
        }
    >;
    entities: {
        name: string;
        origins: string[];
        homepage: string;
        category: string;
    }[];
    screenshot: {
        data: string;
        width: number;
        height: number;
    };
}

export interface ISDobbyResponseTimeTaskSettings {
    url: string;
    timeout: number;
}
export interface ISDobbyResponseTimeTaskResult extends ISDobbyTaskResult {
    responseTime: number;
}

export interface ISDobbyError {
    message: string;
}

export interface ISDobbyPoolConfig {
    tasks: Record<string, ISDobbyTaskMetas>;
}

export type ISDobbyClientAction =
    | {
          type: 'task.start';
          poolUid: string;
          taskUid: string;
      }
    | {
          type: 'task.pause';
          poolUid: string;
          taskUid: string;
      }
    | {
          type: 'task.resume';
          poolUid: string;
          taskUid: string;
      };
