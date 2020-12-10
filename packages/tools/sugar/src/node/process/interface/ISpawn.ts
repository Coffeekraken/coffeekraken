import ISPromise from '../../promise/interface/ISPromise';
import { SpawnOptions } from 'child_process';

export interface ISpawnSettings extends SpawnOptions {
  ipc?: boolean;
  [key: string]: any;
}

export default interface ISpawn {
  (command: string, args: string[], settings: ISpawnSettings): ISPromise;
}
