import SPromise from '../../promise/SPromise';

export interface IWatchSettings {
  SFile?: boolean;
  [key: string]: any;
}

export default interface IWatch {
  (paths: string | string[], settings?: IWatchSettings): SPromise;
}
