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
    adapter: {
        type: 'fs' | 'contentful';
        settings: ISherlockSpaceFsAdapter | ISherlockSpaceContentfulAdapter;
    };
}

export interface ISherlockSpaceFsAdapter {
    folder: string;
}

export interface ISherlockSpaceContentfulAdapter {
    space: string;
    accessToken: string;
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
    status: 'idle' | 'running' | 'error';
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
