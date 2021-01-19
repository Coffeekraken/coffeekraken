// @ts-nocheck

import _deepMerge from '../../object/deepMerge';
import __SPromise, { ISPromise } from '../../promise/SPromise';
import __SClass, { ISClass } from '../../class/SClass';
import __SEventEmitter, { ISEventEmitter } from '../../event/SEventEmitter';

import { ILog } from '../../log/log';

export interface ISProcessStdioCtorSettings {
  processStdio?: ISProcessStdioSettings;
}

export interface ISProcessStdioOptionalSettings {}
export interface ISProcessStdioSettings {}

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

export interface ISProcessStdio extends ISClass {
  _sources: ISEventEmitter[];
  log: ISProcessStdioLogFn;
}

/**
 * @name          SProcessStdio
 * @namespace     sugar.node.process
 * @type          Class
 * @wip
 *
 * This class represent the base one for all the process "Stdio"
 * compatible setting.
 *
 * @param     {ISProcessStdioCtorSettings}     [settings={}]       Some settings to configure your Stdio
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SProcessStdio from '@coffeekraken/sugar/node/process/SProcessStdio';
 * class MyCoolProcessStdio extends SProcessStdio {
 *    constructor(mySource, settings = {}) {
 *      super(source, settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcessStdio extends __SClass implements ISProcessStdio {
  /**
   * @name      _sources
   * @type      Array<SPromise>
   * @private
   *
   * Store sources passed in the contructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _sources: ISEventEmitter[];

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    source: ISEventEmitter | ISEventEmitter[],
    settings: ISProcessStdioCtorSettings = {}
  ) {
    super(
      _deepMerge(
        {
          processStdio: {}
        },
        settings
      )
    );
    this._sources = Array.isArray(source) ? source : [source];
    this.expose(
      new __SEventEmitter({
        id: this.id
      }),
      {
        as: 'eventEmitter',
        props: ['on', 'off', 'emit']
      }
    );
  }
}

export default SProcessStdio;
