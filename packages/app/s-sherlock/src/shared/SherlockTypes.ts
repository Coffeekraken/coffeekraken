import type { ISDobbyTaskMetas } from '@coffeekraken/s-dobby';

export interface ISherlockImage {
    title?: string;
    alt?: string;
    url: string;
}

export interface ISherlockSpace {
    uid: string;
    name: string;
    description: string;
    image: ISherlockImage;
    userInfo: ISherlockUserInfo;
    adapter:
        | {
              type: 'fs';
              settings: ISherlockFsAdapterSettings;
          }
        | {
              type: 'pocketbase';
              settings: ISherlockPocketbaseAdapterSettings;
          }
        | {
              type: 'contentful';
              settings: ISherlockContentfulAdapterSettings;
          };
    pools?: Record<string, ISherlockPool>;
}

export interface ISherlockPool {
    uid: string;
    type: 'fs' | 'pocketbase';
    name: string;
    settings: ISherlockFsPoolSettings | ISherlockPocketbasePoolSettings;
}

export interface ISherlockFsPoolSettings {
    folder: string;
}

export interface ISherlockPocketbasePoolSettings {
    url: string;
    tasksCollection: string;
    reportersCollection: string;
}

export interface ISherlockFsAdapterSettings {
    folder: string;
}

export interface ISherlockPocketbaseAdapterSettings {
    url: string;
}

export interface ISherlockContentfulAdapterSettings {
    space: string;
    accessToken: string;
    managementAccessToken: string;
}

export interface ISherlockUserInfo {
    username: string;
    fullname: string;
    email: string;
}

export interface ISherlockClient {
    uid: string;
    name: string;
    description: string;
}

export interface ISherlockService {
    uid: string;
    name: string;
    description: string;
    url: string;
    client?: string;
}

export interface ISherlockTask extends ISDobbyTaskMetas {
    serviceUid: string;
}

export interface ISherlockTaskState {
    details: boolean;
}

export interface ISherlockTaskResult {
    uid: string;
    taskUid: string;
    data: any;
}

export interface ISherlockUiClientState {
    sidebar: boolean;
}

export interface ISherlockUiClientStates {
    [key: string]: ISherlockUiClientState;
}
