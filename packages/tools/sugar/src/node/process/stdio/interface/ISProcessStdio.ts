// @ts-nocheck

import ISPromise from '../../promise/interface/ISPromise';
import ILog from '../../log/interface/ILog';
export interface ISProcessStdioSettings {
  something?: string;
}

export interface ISProcessStdioCtor {
  new (
    source: ISPromise | ISPromise[],
    settings: ISProcessStdioSettings
  ): ISProcessStdio;
}

export interface ISProcessStdioLog extends ILog {}

export interface ISProcessStdioLogFn {
  (...logs: ISProcessStdioLog): void;
}

export default interface ISProcessStdio {
  _settings: ISProcessStdioSettings;
  _sources: ISPromise[];
  log: ISProcessStdioLogFn;
}
