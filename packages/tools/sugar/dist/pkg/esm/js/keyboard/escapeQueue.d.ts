import __SPromise from '@coffeekraken/s-promise';

export interface IEscapeQueueSettings {
    id?: string;
    rootNode?: HTMLElement | Document | HTMLElement[] | Document[];
}
export interface IEscapeQueueItem {
    id: string;
    callback?: Function;
    resolve: Function;
}
export default function escapeQueue(callback?: Function, settings?: IEscapeQueueSettings): __SPromise;
