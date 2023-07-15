export interface ISherlockImage {
    title?: string
    alt?: string
    url: string
}

export interface ISherlockSpace {
    uid: string
    name: string
    description: string
    image: ISherlockImage
    adapter: 'fs' | 'gun'
}

export interface ISherlockClient {
    uid: string
    name: string
    description: string
    space?: string
}

export interface ISherlockService {
    uid: string
    name: string
    description: string
    url: string
    client?: string
}

export interface ISherlockUiClientState {
    sidebar: boolean
}

export interface ISherlockUiClientStates {
    [key: string]: ISherlockUiClientState
}
