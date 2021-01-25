import __deepMerge from '../../object/deepMerge';
import __SStdio from '../SStdio';

import { ISEventEmitter } from '../../event/SEventEmitter';

/**
 * @name            STerminalStdio
 * @namespace       sugar.node.stdio.terminal
 * @type            Class
 *
 * This class represent a "terminal" strandard in out interface.
 *
 * @param         {SEventEmitter[]}            sources           An array of sources to display with this Stdio instance
 * @param         {Object}              [settings={}]     The settings object to configure your SStdio
 *
 * @example         js
 * import STerminalStdio from '@coffeekraken/sugar/node/stdio/terminal';
 * const terminal = new STerminalStdio(mySource);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISTerminalStdioCtorSettings {
  terminalStdio?: ISTerminalStdioOptionalSettings;
}

export interface ISTerminalStdioOptionalSettings {}
export interface ISTerminalStdioSettings {}

export interface ISTerminalStdio {}

class STerminalStdio extends __SStdio implements ISTerminalStdio {
  /**
   * @name      terminalStdioSettings
   * @type      ISTerminalStdioSettings
   * @get
   *
   * Access the stdio settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get terminalStdioSettings(): ISTerminalStdioSettings {
    return (<any>this._settings).terminalStdio;
  }

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    sources: ISEventEmitter | ISEventEmitter[],
    settings: ISTerminalStdioCtorSettings
  ) {
    super(
      sources,
      __deepMerge(
        {
          terminalStdio: {}
        },
        settings || {}
      )
    );
  }

  /**
   * @name          _log
   * @type          Function
   * @private
   *
   * Method that actually log the passed log object with the passed component
   *
   * @param         {ILog}        logObj            The log object to log
   * @param         {ISStdioComponent}      component       The component to use for logging
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _log(logObj, component) {
    console.log('COCO');
    return component.render(logObj);
  }
}

import __defaultTerminalStdioComponent from './components/defaultTerminalStdioComponent';

STerminalStdio.registerComponent(__defaultTerminalStdioComponent);

export default STerminalStdio;
