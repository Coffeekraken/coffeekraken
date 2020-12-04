export interface ISFileSettings {
  id?: string;
  checkExistence?: boolean;
  rootDir?: string;
}

export interface ISFileReadSettings {
  encoding?: string;
  flag?: string;
}

export interface ISFileWriteSettings {
  encoding?: string;
  mode?: number;
  flag: string;
  cast?: boolean;
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

export default interface ISFile {
  name: string;
  path: string;
  rootDir: string;
  relPath: string;
  dirPath: string;
  extension: string;
  size: number;
  sizeInBytes: number;
  exists: boolean;
  toObject: ISFileToObjectFn;
  update: ISFileUpdateFn;
  read: ISFileReadFn;
  readSync: ISFileReadSyncFn;
  write: ISFileWriteFn;
  writeSync: ISFileWriteSyncFn;
}
