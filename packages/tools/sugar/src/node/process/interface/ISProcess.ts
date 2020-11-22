import { ISLogObj } from '../../log/interface/ISLog';
import ISPromise from '../../promise/interface/ISPromise';
import ISProcessOutput from './ISProcessOutput';

export interface ISProcessObject {
  state: string;
  startTime: number;
  endTime: number;
  duration: number;
  stdout: string[];
  stderr: string[];
  value: any;
}

export interface ISProcessNotification {
  title: string;
  message: string;
  icon: string;
}
export interface ISProcessNotificationSettings {
  enable: boolean;
  start: ISProcessNotification;
  success: ISProcessNotification;
  error: ISProcessNotification;
}

export interface ISProcessSettings {
  id?: string;
  name?: string;
  output?: ISProcessOutput;
  runAsChild?: boolean;
  definitionObj?: object;
  processPath?: string | null;
  notifications?: ISProcessNotificationSettings;
  env?: object;
}

export default interface ISProcess {
  new (settings: ISProcessSettings): ISProcess;
  toObject(): ISProcessObject;
  bindSPromise(promise: ISPromise): void;
  run(
    paramsOrStringArgs: object | string,
    settings: ISProcessSettings
  ): Promise<any>;
  kill(): void;
  log(...logs: ISLogObj[]): void;
  error(...errors: ISLogObj[]): void;
}
