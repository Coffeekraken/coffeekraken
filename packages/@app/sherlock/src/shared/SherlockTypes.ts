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
    adapter:
        | {
              type: 'fs';
              settings: ISherlockFsAdapterSettings;
          }
        | {
              type: 'gun';
              settings: ISherlockGunAdapterSettings;
          }
        | {
              type: 'contentful';
              settings: ISherlockContentfulAdapterSettings;
          };
    pools?: Record<string, ISherlockPool>;
}

export interface ISherlockPool {
    uid: string;
    type: 'fs' | 'gun';
    name: string;
    settings: ISherlockFsPoolSettings | ISherlockGunPoolSettings;
}

export interface ISherlockGunPoolSettings {
    gunUid: string;
}

export interface ISherlockFsPoolSettings {
    folder: string;
}

export interface ISherlockFsAdapterSettings {
    folder: string;
}

export interface ISherlockPocketbaseAdapterSettings {
    url: string;
}

export interface ISherlockGunAdapterSettings {
    gunUid: string;
    privateKey?: string;
}

export interface ISherlockContentfulAdapterSettings {
    space: string;
    accessToken: string;
    managementAccessToken: string;
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
