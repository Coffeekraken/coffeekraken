// @ts-nocheck

import ISPromise from '../../promise/interface/ISPromise';
import ILog from '../../log/interface/ILog';
export interface ISProcessOutputSettings {
  something?: string;
}

export interface ISProcessOutputCtor {
  new (
    source: ISPromise | ISPromise[],
    settings: ISProcessOutputSettings
  ): ISProcessOutput;
}

export interface ISProcessOutputLog extends ILog {}

export interface ISProcessOutputLogFn {
  (...logs: ISProcessOutputLog): void;
}

export default interface ISProcessOutput {
  _settings: ISProcessOutputSettings;
  _sources: ISPromise[];
  log: ISProcessOutputLogFn;
}
