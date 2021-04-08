import __inquirer from 'inquirer';
import { ISEventEmitter } from '@coffeekraken/s-event-emitter';
// import __SNotification from '../../notification/SNotification';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SStdio from '../../shared/SStdio';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';

/**
 * @name            STerminalStdio
 * @namespace       s-stdio.terminal
 * @type            Class
 *
 * This class represent a "terminal" strandard in out interface.
 *
 * @param         {SEventEmitter[]}            sources           An array of sources to display with this Stdio instance
 * @param         {Object}              [settings={}]     The settings object to configure your SStdio
 *
 * @todo        Integrate notifications
 *
 * @example         js
 * import STerminalStdio from '@coffeekraken/s-stdio';
 * const terminal = new STerminalStdio(mySource);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISTerminalStdioCtorSettings {
  terminalStdio?: Partial<ISTerminalStdioSettings>;
}

export interface ISTerminalStdioSettings {
  metas: boolean;
  actionPrefix: boolean;
}

export interface ISTerminalStdio {}

class STerminalStdio extends __SStdio implements ISTerminalStdio {
  // /**
  //  * @name      _notifier
  //  * @type      SNotification
  //  * @private
  //  *
  //  * Store the SNotification instance used in this class
  //  *
  //  * @since     2.0.0
  //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // _notifier: __SNotification;

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
    return (<any>this)._settings.terminalStdio;
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
            metas: true,
            actionPrefix: true,
            icons: true
          }
        },
        settings || {}
      )
    );

    // this._notifier = new __SNotification({
    //   adapters: ['node']
    // });
    // this.sources.forEach((source) => {
    //   source.on('notification', (notificationObj, metas) => {
    //     this._notifier.notify(notificationObj);
    //   });
    // });

    // "ask" event
    this.sources.forEach((source) => {
      source.on('ask', async (askObj, metas) => {
        switch (askObj.type.toLowerCase()) {
          case 'boolean':
            const res = await __inquirer.prompt({
              ...askObj,
              type: 'confirm',
              name: 'value'
            });
            return res.value;
            break;
        }
      });
    });

    this.display();
  }

  clear() {
    process.stdout.write('\x1Bc');
  }

  /**
   * @name          _log
   * @type          Function
   * @private
   *
   * Method that actually log the passed log object with the passed component
   *
   * @param         {ILog}        logObj            The log object to log
   * @param         {ISStdioComponent}      component       The component to use for logging
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _log(logObj, component) {
    // handle empty logs
    if (!logObj) return;
    // render the component
    let renderedStr = component.render(logObj, this._settings);
    // handle metas if needed
    if (this.terminalStdioSettings.metas && logObj.metas?.emitter) {
      const idStr = `<bg${__upperFirst(
        logObj.metas.emitter.metas.color || 'yellow'
      )}> </bg${__upperFirst(logObj.metas.emitter.metas.color || 'yellow')}><${
        logObj.metas.emitter.metas.color || 'yellow'
      }> ${logObj.metas.emitter.metas.id} │ </${
        logObj.metas.emitter.metas.color || 'yellow'
      }>`;
      renderedStr = `${idStr}${renderedStr}`;
    }
    // log the string
    try {
      console.log(__parseHtml(renderedStr));
    } catch (e) {}
  }
}

import __defaultTerminalStdioComponent from './components/defaultTerminalStdioComponent';
import __errorTerminalStdioComponent from './components/errorTerminalStdioComponent';
import __fileTerminalStdioComponent from './components/fileTerminalStdioComponent';
import __headingTerminalStdioComponent from './components/headingTerminalStdioComponent';
import __separatorTerminalStdioComponent from './components/separatorTerminalStdioComponent';
import __timeTerminalStdioComponent from './components/timeTerminalStdioComponent';
import __warningTerminalStdioComponent from './components/warningTerminalStdioComponent';

STerminalStdio.registerComponent(__defaultTerminalStdioComponent);
STerminalStdio.registerComponent(__separatorTerminalStdioComponent);
STerminalStdio.registerComponent(__headingTerminalStdioComponent);
STerminalStdio.registerComponent(__errorTerminalStdioComponent);
STerminalStdio.registerComponent(__fileTerminalStdioComponent);
STerminalStdio.registerComponent(__warningTerminalStdioComponent);
STerminalStdio.registerComponent(__timeTerminalStdioComponent);

export default STerminalStdio;
