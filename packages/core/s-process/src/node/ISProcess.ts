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
  asyncStart: boolean;
  killOnError: boolean;
  emitErrorAsEvent: boolean;
  stdio: ISStdio;
  throw: boolean;
  runAsChild: boolean;
  interface: ISInterface;
  processPath: string;
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
export interface ISProcessInternal extends __ISClass {
  run(
    paramsOrStringArgs: Record<string, unknown> | string,
    settings: ISProcessSettings
  ): any;
  kill(data: any): void;
  log(...logs: ILog[]): void;
  error(...errors: ILog[]): void;
}
export interface ISProcess extends ISProcessInternal {
  process(params: Record<string, unknown>, settings?: any);
}
