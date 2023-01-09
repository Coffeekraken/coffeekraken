export interface IDeepProxySettings {
    deep: boolean;
    handleSet: boolean;
    handleGet: boolean;
    handleDelete: boolean;
    domElements: boolean;
}
export default function __deepProxy(object: any, handlerFn: any, settings?: Partial<IDeepProxySettings>): any;
