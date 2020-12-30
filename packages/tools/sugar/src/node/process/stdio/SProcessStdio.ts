// @ts-nocheck

import ISProcessStdio, {
  ISProcessStdioCtor,
  ISProcessStdioSettings
} from './interface/ISProcessStdio';
import ISPromise from '../../promise/interface/ISPromise';
import _deepMerge from '../../object/deepMerge';
import __SPromise from '../../promise/SPromise';

/**
 * @name          SProcessStdio
 * @namespace     sugar.node.process
 * @type          Class
 * @wip
 *
 * This class represent the base one for all the process "Stdio"
 * compatible setting.
 *
 * @param     {ISProcessStdioSettings}     [settings={}]       Some settings to configure your Stdio
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
const Cls: ISProcessStdioCtor = class SProcessStdio implements ISProcessStdio {
  /**
   * @name      _settings
   * @type      ISProcessStdioSettings
   * @private
   *
   * Store the process Stdio settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings: ISProcessStdioSettings = {};

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
  _sources: ISPromise[];

  /**
   * @name      _promise
   * @type      SPromise
   * @private
   *
   * Store an SPromise instance to allow trigger and subscribing to events
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _promise: undefined;

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
    source: ISPromise | ISPromise[],
    settings: ISProcessStdioSettings = {}
  ) {
    this._sources = Array.isArray(source) ? source : [source];
    this._settings = _deepMerge({}, settings);
    this._promise = new __SPromise();
  }

  /**
   * @name          trigger
   * @type          Function
   *
   * Trigger some "events" through the SPromise instance
   *
   * @param       {String}      stack         The stack (name) of the event
   * @param       {Any}         data          The data to pass along the event
   * @return      {SPromise}                  The SPromise instance to maintain chainability
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  trigger(stack, data) {
    this._promise.trigger(stack, data);
    return this._promise;
  }

  /**
   * @name          on
   * @type          Function
   *
   * Subscribe to some events emitted by the Stdio
   *
   * @param       {String}      stack         The stack (name) of the event
   * @param       {Function}     callback       The callback to call when the event is fired
   * @return      {SPromise}                  The SPromise instance to maintain chainability
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  on(stack, callback) {
    this._promise.on(stack, callback);
    return this._promise;
  }
};

export = Cls;
