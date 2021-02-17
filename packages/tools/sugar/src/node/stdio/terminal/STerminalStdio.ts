import __deepMerge from '../../object/deepMerge';
import __SStdio from '../SStdio';
import __SNotification from '../../notification/SNotification';

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
  terminalStdio?: Partial<ISTerminalStdioSettings>;
}

export interface ISTerminalStdioSettings {
  actionPrefix: boolean;
}

export interface ISTerminalStdio {}

class STerminalStdio extends __SStdio implements ISTerminalStdio {
  /**
   * @name      _notifier
   * @type      SNotification
   * @private
   *
   * Store the SNotification instance used in this class
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _notifier: __SNotification;

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
          terminalStdio: {
            actionPrefix: true,
            icons: true
          }
        },
        settings || {}
      )
    );

    this._notifier = new __SNotification({
      adapters: ['node']
    });
    this.sources.forEach((source) => {
      source.on('notification', (notificationObj, metas) => {
        this._notifier.notify(notificationObj);
      });
    });

    this.display();
  }

  clear() {
    process.stdout.write('\x1Bc');
    // console.log('clearing to be implemented');
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
    console.log(component.render(logObj, this._settings));
  }
}

import __defaultTerminalStdioComponent from './components/defaultTerminalStdioComponent';
import __headingTerminalStdioComponent from './components/headingTerminalStdioComponent';
import __separatorTerminalStdioComponent from './components/separatorTerminalStdioComponent';
import __errorTerminalStdioComponent from './components/errorTerminalStdioComponent';
import __fileTerminalStdioComponent from './components/fileTerminalStdioComponent';
import __warningTerminalStdioComponent from './components/warningTerminalStdioComponent';
import __timeTerminalStdioComponent from './components/timeTerminalStdioComponent';

STerminalStdio.registerComponent(__defaultTerminalStdioComponent);
STerminalStdio.registerComponent(__separatorTerminalStdioComponent);
STerminalStdio.registerComponent(__headingTerminalStdioComponent);
STerminalStdio.registerComponent(__errorTerminalStdioComponent);
STerminalStdio.registerComponent(__fileTerminalStdioComponent);
STerminalStdio.registerComponent(__warningTerminalStdioComponent);
STerminalStdio.registerComponent(__timeTerminalStdioComponent);

export default STerminalStdio;
