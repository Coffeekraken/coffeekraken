export interface ICssVarsStackItem {
    type: string;
    value: string;
}
export interface ICssVarsStackItemMetas {
    type?: string;
}
export default class CssVars {
    _stack: ICssVarsStackItem[];
    static excludedTypes: string[];
    static excludeByTypes(types: string[]): void;
    static excludedCodeTypes: string[];
    static excludeCodeByTypes(types: string[]): void;
    static excludedCommentTypes: string[];
    static excludeCommentByTypes(types: string[]): void;
    constructor();
    comment(str: string | Function, metas?: ICssVarsStackItemMetas): this;
    code(str: string | Function, metas?: ICssVarsStackItemMetas): this;
    toString(): string;
}
