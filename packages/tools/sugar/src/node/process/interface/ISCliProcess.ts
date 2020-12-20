import ISProcess, { ISProcessCtor, ISProcessSettings } from './ISProcess';
import { ISpawnSettings } from './ISpawn';

export interface ISCliProcessSettings extends ISProcessSettings {
  spawnSettings?: ISpawnSettings;
  stdio?: ISpawnSettings['stdio'];
}

export interface ISCliProcessCtor {
  new (command: string, settings?: ISCliProcessSettings): ISCliProcess;
}

export default interface ISCliProcess extends ISProcess {
  command?: string;
}
