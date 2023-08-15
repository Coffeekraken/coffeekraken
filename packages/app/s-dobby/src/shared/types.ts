import type { ISDurationObject } from '@coffeekraken/s-duration';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SDobby from '../node/exports';

export interface ISDobbySettings {
    pools?: Record<string, ISDobbyPoolMetas>;
    feeder?: ISDobbyFeederMetas;
}
export interface ISDobbyTaskStatic {
    settingsSpecs: any;
}

export interface ISDobbyTask {
    metas: ISDobbyTaskMetas;
    run(): Promise<ISDobbyTaskResult>;
}

// config
export interface ISDobbySaveConfigResult {}

// pool
export interface ISDobbyPoolStartParams {}
export interface ISDobbyPoolEvent {
    pool: ISDobbyPoolMetas;
}
export interface ISDobbyPool {
    tasks: Record<string, ISDobbyTaskMetas>;
    uid: string;
    started: boolean;
    dobby: __SDobby;
    events: __SEventEmitter;
    metas: ISDobbyPoolMetas;
    start(): Promise<void | ISDobbyError>;
    executeTask(
        taskMetasOrUid: String | ISDobbyTaskMetas,
    ): Promise<ISDobbyTaskResult>;
    loadTasks(): void;
    getTask(uid: string): ISDobbyTaskMetas;
    getTasks(): Record<string, ISDobbyTaskMetas>;
    addTask(taskMetas: ISDobbyTaskMetas): Promise<void | ISDobbyError>;
    removeTask(taskUid: string): Promise<void | ISDobbyError>;
}
export interface ISDobbyPoolMetas {
    uid: string;
    name: string;
}
export interface ISDobbyPocketbasePoolMetas extends ISDobbyPoolMetas {
    type: 'pocketbase';
    settings: ISDobbyPocketbasePoolSettings;
}
export interface ISDobbyPocketbasePoolSettings extends ISDobbyPoolSettings {
    url: string;
    collection: string;
}
export interface ISDobbyFsPoolMetas extends ISDobbyPoolMetas {
    type: 'fs';
    settings: ISDobbyFsPoolSettings;
}
export interface ISDobbyPoolSettings {}
export interface ISDobbyFsPoolSettings extends ISDobbyPoolSettings {
    folder: string;
}

// client sdk
export interface ISDobbyClientSettings {
    host: string;
    port: number;
}

// reporter
export interface ISDobbyPocketbaseReporterSettings {
    url: string;
    collection: string;
}
export interface ISDobbyReporterMetas {
    uid: string;
    type: 'pocketbase';
    name: string;
    settings: ISDobbyPocketbaseReporterSettings;
}
export interface ISDobbyReporter extends ISDobbyReporterMetas {
    report(data: ISDobbyTaskResult): Promise<ISDobbyTaskResult>;
}

// task
export interface ISDobbyTaskMetas {
    uid: string;
    name: string;
    type: 'lighthouse' | 'responseTime';
    state: 'active' | 'paused';
    status: 'running' | 'idle' | 'error';
    schedule: string;
    poolUid: string;
    distributed: boolean;
    reporter: ISDobbyReporterMetas;
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
    result: any;
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
export interface ISDobbyEcoIndexTaskSettings {
    url: string;
}
export interface IEcoIndexResult {
    width: number;
    height: number;
    url: string;
    size: number;
    nodes: number;
    requests: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
    score: number;
    ges: number;
    water: number;
    ecoindex_version: string;
    date: string;
    page_type: string;
}
export interface ISDobbyEcoIndexTaskResult extends ISDobbyTaskResult {
    ecoindex: IEcoIndexResult;
}

export interface ISDobbyError {
    message: string;
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
