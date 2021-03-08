import { ISPromise } from '@coffeekraken/s-promise';

export interface IWatchSettings {
  SFile?: boolean;
  [key: string]: any;
}

export default interface IWatch {
  (paths: string | string[], settings?: IWatchSettings): ISPromise;
}
