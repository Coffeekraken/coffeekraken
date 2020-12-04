import ISProcess, { ISProcessCtor, ISProcessSettings } from './ISProcess';

export interface ISCliProcessSettings extends ISProcessSettings {}

export interface ISCliProcessCtor {
  new (command: string, settings?: ISCliProcessSettings): ISCliProcess;
}

export default interface ISCliProcess extends ISProcess {
  command?: string;
}
