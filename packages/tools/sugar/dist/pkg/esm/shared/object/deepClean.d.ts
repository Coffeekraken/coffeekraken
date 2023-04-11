
export interface IDeepCleanSettings {
    array?: boolean;
    cloneFirst?: boolean;
}
export default function __deepClean(objectOrArray: any, cleaner?: Function, settings?: IDeepCleanSettings): any;
