import type { ISClass } from '@coffeekraken/s-class';
import type { ISLog } from '@coffeekraken/s-log';
import type { ISpawnSettings } from '@coffeekraken/sugar/node/process/spawn';
import type { ISInterface } from '@coffeekraken/s-interface';
import type { ISStdio } from '@coffeekraken/s-stdio';
import type { ISDurationObject } from '@coffeekraken/s-duration';

export interface ISCommandProcessSettings {
    spawnSettings: Partial<ISpawnSettings>;
}
export interface ISCommandProcessCtorSettings extends ISProcessCtorSettings {
    commandProcess: Partial<ISCommandProcessSettings>;
}
export interface ISCommandProcessParams extends ISProcessParams {
    command: string;
}

export interface ISProcessNotificationSettings {
    enable: boolean;
}

export interface ISProcessCtorSettings {
    process?: Partial<ISProcessSettings>;
}

export interface ISProcessProcessObj extends ISDurationObject {
    state: string;
    stdout: any[];
    stderr: any[];
    value: any;
    params: any;
    settings: Partial<ISProcessSettings>;
}

export interface ISProcessResultObject extends ISProcessProcessObj {}

export interface ISProcessSettings {
    killOnError: boolean;
    emitErrorAsEvent: boolean;
    stdio: ISStdio;
    throw: boolean;
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
    new (
        params: Record<string, unknown>,
        settings: ISProcessSettings,
    ): ISProcess;
}
export interface ISProcessInternal extends ISClass {
    run(
        paramsOrStringArgs: Record<string, unknown> | string,
        settings: ISProcessSettings,
    ): any;
    kill(data: any): void;
    log(...logs: ISLog[]): void;
    error(...errors: ISLog[]): void;
}
export interface ISProcess extends ISProcessInternal {
    process(params: Record<string, unknown>, settings?: any);
}
