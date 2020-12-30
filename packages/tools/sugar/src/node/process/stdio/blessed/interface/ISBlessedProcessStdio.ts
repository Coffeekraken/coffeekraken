// @ts-nocheck

/**
 * @wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */

import ISPromise from '../../../../promise/interface/ISPromise';
import ISProcessStdio, {
  ISProcessStdioSettings
} from '../../../interface/ISProcessStdio';
import ILog from '../../../../log/interface/ILog';

export interface ISBlessedProcessStdioSettings extends ISProcessStdioSettings {
  filter?: Function;
  maxItems?: number;
  maxItemsByGroup?: number;
  stacks?: string[];
}

export interface ISBlessedProcessStdioLog extends ILog {}

export interface ISBlessedProcessStdioLogFn {
  (...log: ISBlessedProcessStdioLog): void;
}

export interface ISBlessedProcessStdioCtor {
  new (
    source: ISPromise | ISPromise[],
    settings: ISBlessedProcessStdioSettings
  ): ISBlessedProcessStdio;
}

export default interface ISBlessedProcessStdio extends ISProcessStdio {
  log(): ISBlessedProcessStdioLogFn;
}
