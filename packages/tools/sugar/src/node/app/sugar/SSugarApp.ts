// @ts-nocheck

import __deepMerge from '../../object/deepMerge';
import __SPromise from '../../promise/SPromise';
import __sugarConfig from '../../config/sugar';
import __SSugarAppProcess from './SSugarAppProcess';
import __SSugarAppTerminalUi from './SSugarAppTerminalUi';

/**
 * @name            SSugarApp
 * @namespace       sugar.node.ui.sugar
 * @type            Class
 * @extends         SPromise
 * @wip
 *
 * This class represent the main sugar ui one. His work it to:
 * - Aggregate all the wanted modules registered through the ```sugar-app.config.js``` file
 * - Instantiate all the modules like frontend server, build scss, etc...
 * - Configure the frontend server to serve all the needed files like js or css ones, etc...
 * - Open a socket connection to allow the front modules parts to talk with the back parts easily
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @param       {Object}              [settings={}]           An object of settings to configure your sugar ui:
 * -
 *
 * @example         js
 * import SSugarApp from @coffeekraken/sugar/node/ui/sugar/SSugarApp';
 * const sugarUi = new SSugarApp();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarApp extends __SPromise {
  /**
   * @name          state
   * @type          String
   * @values        loading,ready,running,error
   * @default       loading
   *
   * Store the module state
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  // _state = 'loading';
  // get state() {
  //   return this._state;
  // }
  // set state(value) {
  //   this._setState(value);
  // }
  // _setState(value) {
  //   if (['loading', 'ready', 'error'].indexOf(value) === -1) {
  //     throw new __SError(
  //       `Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${__toString(
  //         value
  //       )}</magenta>" of your "<cyan>${
  //         this.constructor.name
  //       }</cyan>" class can contain only one of these values: ${[
  //         'loading',
  //         'ready',
  //         'error'
  //       ]
  //         .map((i) => {
  //           return `"<green>${i}</green>"`;
  //         })
  //         .join(', ')}`
  //     );
  //   }

  //   // trigger an event
  //   this.trigger('state', value);
  //   this._state = value;
  // }

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(stringArgs, settings = {}) {
    settings = __deepMerge(
      {
        id: 'SSugarApp',
        name: 'Sugar App'
      },
      settings
    );

    super(settings);

    this._process = new __SSugarAppProcess({
      stdio: __SSugarAppTerminalUi
    });
    this._process.run(stringArgs);
  }
}
