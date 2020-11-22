import ISPromise from '../../promise/interface/ISPromise';
export interface ISProcessOutputSettings {
  something?: string;
}

export interface ISProcessOutputCtor {
  new (
    source: ISPromise | ISPromise[],
    settings: ISProcessOutputSettings
  ): ISProcessOutput;
}

export default interface ISProcessOutput {
  _settings: ISProcessOutputSettings;
  _sources: ISPromise[];
}
