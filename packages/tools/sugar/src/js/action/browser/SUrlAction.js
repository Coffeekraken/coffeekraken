import __SAction from '../SAction';
import __isBrowser from '../../is/browser';
import __toQueryString from '../../object/toQueryString';

/**
 * @name              SUrlAction
 * @namespace         sugar.js.action.browser
 * @type              Class
 *
 * This class represent an URL action that let you change the user page
 * with multiple settings like if you want the url to be opened in a popup,
 * after a timeout, etc...
 *
 * @TODO        Better documentation
 *
 * @param       {Object}        descriptorObj       The action descriptor object
 * - target (_self) {String}: Specify how you want to go to the url. Can be ```_self```, ```_blank``` or ```_popup```
 * - url (null) {String}: Specify the url where you want to send the user
 * - name (null) {String}: Specify the name of the new window. Same as the ```window.open``` name parameter
 * - specs ({}) {Object}: Specify the window specs that you want if your target is ```_blank``` or ```_popup```. Accept all the parameters that the ```window.open``` specs parameter accept in object format
 * - timeout (0) {Number}: Specify a timeout between the time you call the ```run``` method, and the time the user is actually redirected
 * @param       {Object}        [settings={}]       An object of settings to configure your action. See the ```SAction``` class documentation for more info
 *
 * @example       js
 * import SUrlAction from '@coffeekraken/sugar/js/action/browser/SUrlAction';
 * const myAction = new SUrlAction({
 *    url: 'https://google.com',
 *    target: '_popup'
 * });
 * myAction.run();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SUrlAction extends __SAction {
  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(descriptorObj, settings = {}) {
    super(descriptorObj, settings);
  }

  /**
   * @name            run
   * @type            Function
   * @override
   *
   * Process to the action execution.
   *
   * @return      {SPromise}      An SPromise instance on which you can subscribe for this particular run execution process events
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run() {
    const promise = super.run();

    if (!__isBrowser())
      throw new Error(
        `SUrlAction: This action is meant to be used in a browser environment which seems to not be the case...`
      );

    setTimeout(() => {
      // switch on the target
      switch (this._descriptorObj.target) {
        case '_blank':
        case '_popup':
          const specs = this._descriptorObj.specs || {};
          let specsString = __toQueryString(specs)
            .slice(1)
            .split('&')
            .join(',');
          window.open(
            this._descriptorObj.url,
            this._descriptorObj.name || '_blank',
            specsString || this._descriptorObj.target === '_popup'
              ? 'width=1000,height=1000'
              : '',
            this._descriptorObj.replace || false
          );
          break;
        case '_self':
        default:
          document.location = this._descriptorObj.url;
          break;
      }

      // complete
      promise.complete();
    }, this._descriptorObj.timeout || 0);

    return promise;
  }
}
