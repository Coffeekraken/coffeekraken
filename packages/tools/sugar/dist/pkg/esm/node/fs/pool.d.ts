
export interface IPoolSettings {
    SFile: boolean;
    cwd: string;
    exclude: string[];
    watch: boolean;
    chokidar: Partial<IChokidarSettings>;
    [key: string]: any;
}
export interface IChokidarSettings {
    persistent: boolean;
    ignored: string;
    ignoreInitial: boolean;
    followSymlinks: boolean;
    cwd: string;
    disableGlobbing: boolean;
    usePolling: boolean;
    interval: number;
    binaryInterval: number;
    alwaysStat: boolean;
    depth: number;
    awaitWriteFinish: any;
    ignorePermissionErrors: boolean;
    atomic: boolean;
}
export default function __pool(input: any, settings?: Partial<IPoolSettings>): any;
