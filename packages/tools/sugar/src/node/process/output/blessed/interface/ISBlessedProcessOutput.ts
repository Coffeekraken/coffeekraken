// @ts-nocheck

/**
 * @wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */

import ISPromise from '../../../../promise/interface/ISPromise';
import ISProcessOutput, {
  ISProcessOutputSettings
} from '../../../interface/ISProcessOutput';
import ILog from '../../../../log/interface/ILog';

export interface ISBlessedProcessOutputSettings
  extends ISProcessOutputSettings {
  filter?: Function;
  maxItems?: number;
  maxItemsByGroup?: number;
  stacks?: string[];
}

export interface ISBlessedProcessOutputLog extends ILog {}

export interface ISBlessedProcessOutputLogFn {
  (...log: ISBlessedProcessOutputLog): void;
}

export interface ISBlessedProcessOutputCtor {
  new (
    source: ISPromise | ISPromise[],
    settings: ISBlessedProcessOutputSettings
  ): ISBlessedProcessOutput;
}

export default interface ISBlessedProcessOutput extends ISProcessOutput {
  log(): ISBlessedProcessOutputLogFn;
}
