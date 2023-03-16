import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
export interface ISViteSettings {
    processConfig: Function;
}
export interface ISViteTestParams {
    dir: string;
    watch: boolean;
}
export interface ISViteStartParams {
    host: string;
    port: number;
}
export interface ISViteBuildParams {
    input: string;
    noWrite: boolean;
    target: 'development' | 'production';
    watch: boolean;
    buildInitial: boolean;
    verbose: boolean;
    version: string;
    format: ('esm' | 'amd' | 'umd' | 'cjs' | 'iife')[];
    type: ('module' | 'modules' | 'lib' | 'bundle')[];
    chunks: boolean;
    bundle: boolean;
    lib: boolean;
    minify: boolean | 'esbuild' | 'terser';
    analyze: boolean;
}
export interface ISViteBuildResult {
    type: 'module' | 'modules' | 'lib' | 'bundle';
    format: 'esm' | 'amd' | 'umd' | 'cjs' | 'iife';
    files: ISViteBuildFileResult[];
}
export interface ISViteBuildFileResult {
    isEntry: boolean;
    format: 'esm' | 'amd' | 'umd' | 'cjs' | 'iife';
    fileName: string;
    outDir: string;
    code: string;
}
export interface ISViteBuildParamsInternal extends ISViteBuildParams {
    outputDir: string;
    outputAssetsDir: string;
    formats: string[];
}
export default class SVite extends __SClass {
    
    constructor(settings?: Partial<ISViteSettings>);
    
    start(params?: Partial<ISViteStartParams>): Promise<Function>;
    
    rebuildTimeoutByPath: {};
    build(params: ISViteBuildParams | String): Promise<unknown>;
    _handleBuildResult(buildResult: ISViteBuildResult, buildParams: ISViteBuildParamsInternal): Promise<ISViteBuildResult>;
    
    test(params: ISViteTestParams | String): __SPromise;
}
