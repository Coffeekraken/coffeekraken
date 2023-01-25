export interface IPostcssSugarPluginLodSettings {
    enabled: boolean;
    method: 'class' | 'file';
}
export interface IPostcssSugarPluginCleanSettings {
    variables: boolean;
}
export interface IPostcssSugarPluginCompressSettings {
    variables: boolean;
}
export interface IPostcssSugarPluginSettings {
    outDir: string;
    lod: IPostcssSugarPluginLodSettings;
    clean: Partial<IPostcssSugarPluginCleanSettings>;
    compress: Partial<IPostcssSugarPluginCompressSettings>;
    excludeByTypes?: string[];
    excludeCommentByTypes?: string[];
    excludeCodeByTypes?: string[];
    inlineImport?: boolean;
    target?: 'development' | 'production' | 'vite';
    partials: boolean;
    verbose: boolean;
    plugins: any[];
}
export declare function getFunctionsList(): any;
export declare function getMixinsList(): any;
export declare function getMixinsOrFunctionsList(what: 'mixins' | 'functions'): any;
declare const plugin: {
    (settings?: IPostcssSugarPluginSettings): {
        postcssPlugin: string;
        Once(root: any, ...args: any[]): Promise<void>;
        OnceExit(root: any): Promise<void>;
        AtRule(atRule: any, postcssApi: any): Promise<void>;
        Declaration(decl: any): Promise<void>;
    };
    postcss: boolean;
};
export declare const postcss = true;
export default plugin;
