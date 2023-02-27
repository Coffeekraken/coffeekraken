import __SPromise from '@coffeekraken/s-promise';

export interface IExecPhpLogSettings {
    verbose: boolean;
}
export interface IExecPhpSettings {
    encryptParams: boolean;
    paramsThroughFile: boolean;
    log: Partial<IExecPhpLogSettings>;
}
export default function __execPhp(scriptPath: string, params: any, settings?: Partial<IExecPhpSettings>): __SPromise;
