import { ISPromise } from '../../promise/SPromise';

export interface ISFileSettings {
  id?: string;
  checkExistence?: boolean;
  cwd?: string;
}

export interface ISFileReadSettings {
  encoding?: string;
  flag?: string;
}

export interface ISFileWriteSettings {
  encoding?: string;
  mode?: number;
  flag?: string;
  cast?: boolean;
  path?: string;
}

export interface ISFileToObjectFn {
  (): Object;
}
export interface ISFileUpdateFn {
  (): void;
}

export interface ISFileReadFn {
  (settings?: ISFileReadSettings): Promise<string>;
}

export interface ISFileReadSyncFn {
  (settings?: ISFileReadSettings): string;
}

export interface ISFileWriteFn {
  (data: string, settings?: ISFileWriteSettings): Promise<any>;
}
export interface ISFileWriteSyncFn {
  (data: string, settings?: ISFileWriteSettings): any;
}
export interface ISFileCtor {
  new (filepath: string, settings?: ISFileSettings): ISFile;
}

export default interface ISFile extends ISPromise {
  name: string;
  path: string;
  rootDir: string;
  relPath: string;
  dirPath: string;
  extension: string;
  size: number;
  sizeInBytes: number;
  exists: boolean;
  content: string;
  toObject: ISFileToObjectFn;
  update(): void;
  startWatch(): void;
  stopWatch(): void;
  read: ISFileReadFn;
  readSync: ISFileReadSyncFn;
  write: ISFileWriteFn;
  writeSync: ISFileWriteSyncFn;
}
