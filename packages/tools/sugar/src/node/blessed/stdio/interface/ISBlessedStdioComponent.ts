import ISBlessedComponent, {
  ISBlessedComponentSettings,
  ISBlessedComponentCtor
} from '../../interface/ISBlessedComponent';

import { ILog } from '../../../log/log';

export interface ISBlessedStdioComponentSettings
  extends ISBlessedComponentSettings {}

export interface ISBlessedStdioComponentCtor {
  new (logObj: ILog, settings?: ISBlessedStdioComponentSettings);
  id?: string;
}

export default interface ISBlessedStdioComponent {
  logObj?: ILog;
}
