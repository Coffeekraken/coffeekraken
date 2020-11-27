export interface ISFileSettings {
  id?: string;
  checkExistence?: boolean;
  rootDir?: string;
}

export interface ISFileCtor {
  new (filepath: string, settings: ISFileSettings): ISFile;
}

export interface ISFileToObjectFn {
  (): Object;
}
export interface ISFileUpdateFn {
  (): void;
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
}
