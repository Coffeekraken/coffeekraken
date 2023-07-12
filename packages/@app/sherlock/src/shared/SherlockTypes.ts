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
    clients?: ISherlockClient[];
}

export interface ISherlockClient {
    uid: string;
    name: string;
    description: string;
    space?: ISherlockSpace;
    services?: ISherlockService[];
}

export interface ISherlockService {
    uid: string;
    name: string;
    description: string;
    url: string;
    client?: ISherlockClient;
}

export interface ISherlockUiClientState {
    sidebar: boolean;
}

export interface ISherlockUiClientStates {
    [key: string]: ISherlockUiClientState;
}