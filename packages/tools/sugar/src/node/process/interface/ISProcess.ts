import { interface } from '../../npm/SNpmBinProcess';
import ISProcessSettings, { ISProcessSettings } from './ISProcessSettings';

export interface ISProcessObject {
  state: string;
  startTime: number;
  endTime: number;
  duration: number;
  stdout: string[];
  stderr: string[];
  value: any;
}

export default interface ISProcess {
  new (settings: ISProcessSettings): ISProcess;
  toObject(): ISProcessObject;
  bindSPromise();
}
