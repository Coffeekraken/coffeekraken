import ISBlessedComponent, {
  ISBlessedComponentSettings,
  ISBlessedComponentCtor
} from '../../interface/ISBlessedComponent';

import ILog from '../../../log/interface/ILog';

export interface ISBlessedOutputComponentSettings
  extends ISBlessedComponentSettings {}

export interface ISBlessedOutputComponentCtor {
  new (logObj: ILog, settings?: ISBlessedOutputComponentSettings);
  id?: string;
}

export default interface ISBlessedOutputComponent {
  logObj?: ILog;
}
