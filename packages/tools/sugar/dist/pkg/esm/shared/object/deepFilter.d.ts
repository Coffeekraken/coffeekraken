
export interface IDeepFilterSettings {
    cloneFirst?: boolean;
    array?: boolean;
}
export interface IDeepFilterFilter {
    (item: IDeepFilterItem): undefined | boolean;
}
export interface IDeepFilterItem {
    key: string;
    value: any;
    isObject: boolean;
}
export default function __deepFilter(object: any, filter: IDeepFilterFilter, settings?: Partial<IDeepFilterSettings>): any;
