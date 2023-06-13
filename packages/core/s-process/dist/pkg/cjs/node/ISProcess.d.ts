import type { ISClass } from '@coffeekraken/s-class';
import type { ISDurationObject } from '@coffeekraken/s-duration';
import type { ISInterface } from '@coffeekraken/s-interface';
import type { ISLog } from '@coffeekraken/s-log';
import type { ISStdio } from '@coffeekraken/s-stdio';
import type { ISpawnSettings } from '@coffeekraken/sugar/process';
export interface ISCommandProcessSettings extends ISProcessSettings {
    spawnSettings: Partial<ISpawnSettings>;
}
export interface ISCommandProcessParams extends ISProcessParams {
    command: string;
}
export interface ISProcessNotificationSettings {
    enable: boolean;
}
export interface ISProcessProcessObj extends ISDurationObject {
    state: string;
    stdout: any[];
    stderr: any[];
    value: any;
    params: any;
    settings: Partial<ISProcessSettings>;
}
export interface ISProcessResultObject extends ISProcessProcessObj {
}
export interface ISProcessSettings {
    killOnError: boolean;
    emitErrorAsEvent: boolean;
    stdio: ISStdio;
    throw: boolean;
    silent: boolean;
    collectStdout: boolean;
    collectStderr: boolean;
    runAsChild: boolean;
    interface: ISInterface;
    processPath: string;
    before: Function;
    after: Function;
    notification: ISProcessNotificationSettings;
    env: Record<string, unknown>;
    spawn: Record<string, unknown>;
    decorators: boolean;
    spawnSettings: ISpawnSettings;
    exitAtEnd: boolean;
}
export interface ISProcessParams {
    help: boolean;
    [key: string]: any;
}
export interface ISProcessCtor {
    new (params: Record<string, unknown>, settings: ISProcessSettings): ISProcess;
}
export interface ISProcessInternal extends ISClass {
    run(paramsOrStringArgs: Record<string, unknown> | string, settings: ISProcessSettings): any;
    kill(data: any): void;
    log(...logs: ISLog[]): void;
    error(...errors: ISLog[]): void;
}
export interface ISProcess extends ISProcessInternal {
    process(params: Record<string, unknown>, settings?: any): any;
}
