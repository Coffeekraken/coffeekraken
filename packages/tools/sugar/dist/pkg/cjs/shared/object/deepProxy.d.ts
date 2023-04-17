export interface IDeepProxyActionObj {
    object: any;
    target: string;
    key: string;
    path: string;
    action: 'set' | 'get' | 'delete';
    fullAction: string;
    oldValue: any;
    value: any;
}
export interface IDeepProxySettings {
    deep: boolean;
    handleSet: boolean;
    handleGet: boolean;
    handleDelete: boolean;
    domElements: boolean;
}
export default function __deepProxy(object: any, handlerFn: any, settings?: Partial<IDeepProxySettings>): any;
