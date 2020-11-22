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

export interface ISCompileTsProcessSettings extends ISProcessSettings {}

export default interface ISCompileTsProcess {
  process(params?: object, settings?: ISCompileTsProcessSettings): Promise<any>;
}
