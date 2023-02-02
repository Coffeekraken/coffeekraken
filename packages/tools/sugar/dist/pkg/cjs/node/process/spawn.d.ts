
import type { ISPromise } from '@coffeekraken/s-promise';
import __SPromise from '@coffeekraken/s-promise';
import { SpawnOptions } from 'child_process';

export interface ISpawnSettings extends SpawnOptions {
    pipeEvents: boolean;
    returnValueOnly: boolean;
    silent: boolean;
    [key: string]: any;
}
export interface ISpawn {
    (command: string, args?: string[], settings?: Partial<ISpawnSettings>): ISPromise;
}
export default function spawn(command: string, args?: string[], settings?: Partial<ISpawnSettings>): __SPromise;
