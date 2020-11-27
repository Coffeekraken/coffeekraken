// @ts-nocheck

import ISProcess, {
  ISProcessObject,
  ISProcessSettings
} from '../../process/interface/ISProcess';

export interface ISCompileTsProcessParams {
  config: string[];
}

export interface ISCompileTsProcessCtor {
  new (settings?: ISCompileTsProcessSettings): ISCompileTsProcess;
}

export type ISCompileTsProcessSettings = ISProcessSettings;

export default interface ISCompileTsProcess extends ISProcess {
  process(
    params?: ISCompileTsProcessParams,
    settings?: ISCompileTsProcessSettings
  ): Promise<any>;
}
