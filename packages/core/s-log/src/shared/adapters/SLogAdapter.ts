// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';

/**
 * @name                    SLogAdapter
 * @namespace               shared.adapters
 * @type                    Class
 * @extends                 SClass
 * @status              beta
 *
 * This class represent the base one that all the SLog adapters MUST extends.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import SLog, { SLogAdapter } from '@coffeekraken/s-log';
 * const logger = new SLog({
 *    adapters: [
 *      new SLogAdapter()
 *    ]
 * });
 * logger.log('Something cool happend...');
 *
 * @see       https://www.npmjs.com/package/fmt-obj
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISLogAdapterCtorSettings {
  logAdapter: Partial<ISLogAdapterSettings>;
}
export interface ISLogAdapterSettings {}

export default class SLogAdapter extends __SClass {
  /**
   * @name          logAdapterSettings
   * @type          ISLogAdapterSettings
   * @get
   *
   * Access the logAdapter settings
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get logAdapterSettings(): ISLogAdapterSettings {
    return (<any>this)._settings.logAdapter;
  }

  /**
   * @name          constructor
   * @type          Function
   *
   * Constructor
   *
   * @param         {Object}        [settings={}]           The settings object to configure your SLogAdapter instance. Here's the settings available:
   * - logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings?: Partial<ISLogAdapterCtorSettings>) {
    // extend settings
    super(
      __deepMerge(
        {
          logAdapter: {}
        },
        settings ?? {}
      )
    );

    // make sure the adapter implement a ```log``` method
    if (!this.log || typeof this.log !== 'function')
      throw new Error(
        `<red>[${this.constructor.name}]</red> Sorry but your SLog adapter MUST implement a "<yellow>log(lobObj)</yellow>" method.`
      );
  }
}
