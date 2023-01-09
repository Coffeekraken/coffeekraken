
export interface IGetExtendsStackSettings {
    includeBaseClass?: boolean;
}
export interface IGetExtendsStackResult {
    [key: string]: any;
}
export interface IGetExtendsStack {
    (cls: any, settings?: IGetExtendsStackSettings): IGetExtendsStackResult;
}
declare const fn: IGetExtendsStack;
export default fn;
