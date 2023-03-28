import __SClass from '@coffeekraken/s-class';

export interface ISMonorepoSettings {
    packagesGlob: string;
}
export interface ISMonorepoRunParams {
    command: string;
    packagesGlob: string;
}
export interface ISMonorepoRunResult {
}
export interface ISMonorepoListParams {
    packagesGlob: string;
    asJson: boolean;
    publish: undefined | boolean;
    independent: boolean;
}
export interface ISMonorepoListResult {
    name: string;
    version: string;
    private: boolean;
    independent: boolean;
    path: string;
    relPath: string;
}
export interface ISMonorepoPublishParams {
    packagesGlob: string;
    yes: boolean;
}
export interface ISMonorepoPublishResult {
    published: boolean;
    error?: Error;
}
export interface ISMonorepoDevParams {
    packagesGlob: string;
    build: boolean;
    buildInitial: boolean;
    test: boolean;
    testInitial: boolean;
    format: boolean;
    formatInitial: boolean;
}
export interface ISMonorepoDevResult {
}
export interface ISMonorepoUpgradeParams {
    packagesGlob: string;
    files: string[];
    fields: string[];
}
export interface ISMonorepoUpgradeResult {
    upgraded: boolean;
}
export default class SMonorepo extends __SClass {
    
    private _rootDir;
    
    constructor(rootDir?: string, settings?: Partial<ISMonorepoSettings>);
    
    checkDependencies(): Promise<boolean>;
    
    exec(params: Partial<ISMonorepoRunParams>): Promise<ISMonorepoRunResult>;
    
    list(params: Partial<ISMonorepoListParams>): Promise<ISMonorepoListResult[]>;
    
    publish(params: Partial<ISMonorepoPublishParams>): Promise<ISMonorepoPublishResult[] | false>;
    
    dev(params: Partial<ISMonorepoDevParams>): Promise<ISMonorepoListResult[] | void>;
    
    upgrade(params?: ISMonorepoUpgradeParams): Promise<ISMonorepoUpgradeResult | boolean>;
}
