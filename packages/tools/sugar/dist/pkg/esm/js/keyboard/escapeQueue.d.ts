import __SPromise from '@coffeekraken/s-promise';

export interface IEscapeQueueSettings {
    rootNode?: HTMLElement | Document | HTMLElement[] | Document[];
}
export interface IEscapeQueueItem {
    callback?: Function;
    resolve: Function;
}
export default function escapeQueue(callback?: Function, settings?: IEscapeQueueSettings): __SPromise;
