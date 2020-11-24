// @ts-nocheck

/**
 * @wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */

import ISPromise from '../../../promise/interface/ISPromise';
import ISProcessOutput, {
  ISProcessOutputSettings
} from '../../interface/ISProcessOutput';

export interface ISBlessedProcessOutputSettings
  extends ISProcessOutputSettings {
  filter?: Function;
  maxItems?: number;
  maxItemsByGroup?: number;
  stacks?: string[];
}

export interface ISBlessedProcessOutputCtor {
  new (
    source: ISPromise | ISPromise[],
    settings: ISBlessedProcessOutputSettings
  ): ISBlessedProcessOutput;
}

export default interface ISBlessedProcessOutput extends ISProcessOutput {}
