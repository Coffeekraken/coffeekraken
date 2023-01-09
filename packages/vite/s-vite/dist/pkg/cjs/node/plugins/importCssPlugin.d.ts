
export interface IimportCssPluginRewrite {
    match: RegExp;
    rewrite(src: string, id: string): string;
}
declare const _default: {
    name: string;
    apply: string;
    enforce: string;
    transform(src: any, id: any): {
        code: any;
        map: any;
    };
    load(id: any): void;
};
export default _default;
