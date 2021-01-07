import ISProcess, { ISProcessCtor } from './ISProcess';

export interface ISProcessPipeSettings {
  processes?: Object;
  stdio?: any;
  [key: string]: any;
}

export interface ISProcessPipeObject {
  settings?: Object;
  params?: Object;
  process: ISProcessCtor;
}

export interface ISProcessPipeCtor {
  new (
    processes: Array<ISProcessPipeObject | ISProcessCtor | Function>,
    settings: ISProcessPipeSettings
  );
}

export default interface ISProcessPipe {
  _settings: ISProcessPipeSettings;
  _processes?: Array<ISProcessPipeObject | ISProcessCtor | Function>;
  stdio?: any;
  // run(params?: any, settings?: ISProcessPipeSettings): any;
}
