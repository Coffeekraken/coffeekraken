import __SClass from '@coffeekraken/s-class';
export interface ISViteSettings {
}
export interface ISViteTestParams {
    dir: string;
    watch: boolean;
}
export interface ISViteStartParams {
}
export interface ISViteBuildParams {
    input: string;
    prod: boolean;
    noWrite: boolean;
    watch: boolean;
    buildInitial: boolean;
    verbose: boolean;
    target: string;
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
    
    constructor(settings?: ISViteSettings);
    
    start(params: Partial<ISViteStartParams>): any;
    
    rebuildTimeoutByPath: {};
    build(params: ISViteBuildParams | String): any;
    _handleBuildResult(buildResult: ISViteBuildResult, buildParams: ISViteBuildParamsInternal): Promise<ISViteBuildResult>;
    
    test(params: ISViteTestParams | String): any;
}
