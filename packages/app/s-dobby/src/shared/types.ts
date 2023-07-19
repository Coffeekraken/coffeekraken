import type { ISDurationObject } from '@coffeekraken/s-duration';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SDobby from '../node/exports';

export interface ISDobbySettings {
    uid?: string;
    pool: ISDobbyPool;
}

export interface ISDobbyTask {
    settingsSpecs: any;
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
    settings: ISDobbyLocalPoolSettings | ISDobbyP2pPoolSettings;
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
    settings: ISDobbyLighhouseTaskSettings | ISDobbyResponseTimeTaskSettings;
}

export interface ISDobbyTaskResult {
    duration: ISDurationObject;
    time: number;
    status: 'success' | 'warning' | 'error';
    logs?: string[];
    task: ISDobbyTaskMetas;
    pool: ISDobbyPoolMetas;
}

export interface ISDobbyLighthouseTaskSettings {}
export interface ISDobbyLighthouseTaskResult extends ISDobbyTaskResult {}

export interface ISDobbyResponseTimeTaskSettings {
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
