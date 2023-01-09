export interface IPostcssSugarPluginSettings {
    outDir: string;
    target?: 'development' | 'production' | 'vite';
}
declare const plugin: {
    (settings?: IPostcssSugarPluginSettings): {
        postcssPlugin: string;
        Once(root: any): Promise<void>;
        OnceExit(root: any): Promise<void>;
    };
    postcss: boolean;
};
export declare const postcss = true;
export default plugin;
