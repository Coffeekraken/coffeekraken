export interface IStorageSystemConfig {
    tmpDir: string;
}
export interface IStoragePackageConfig {
    rootDir: string;
    localDir: string;
    cacheDir: string;
    tmpDir: string;
    nodeModulesDir: string;
}
export interface IStorageConfig {
    system: IStorageConfig;
    package: IStoragePackageConfig;
}
export default function (api: any): IStorageConfig;
