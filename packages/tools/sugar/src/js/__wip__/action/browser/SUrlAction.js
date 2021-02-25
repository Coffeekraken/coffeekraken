// @ts-nocheck
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
 * @todo        Better documentation
 * @todo        tests
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
            throw new Error(`SUrlAction: This action is meant to be used in a browser environment which seems to not be the case...`);
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
                    window.open(this._descriptorObj.url, this._descriptorObj.name || '_blank', specsString || this._descriptorObj.target === '_popup'
                        ? 'width=1000,height=1000'
                        : '', this._descriptorObj.replace || false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1VybEFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNVcmxBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLFdBQVcsTUFBTSxrQkFBa0IsQ0FBQztBQUMzQyxPQUFPLGVBQWUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsU0FBUztJQUMvQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLGFBQWEsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN0QyxLQUFLLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEdBQUc7UUFDRCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFNUIsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLHdHQUF3RyxDQUN6RyxDQUFDO1FBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLHVCQUF1QjtZQUN2QixRQUFRLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUNsQyxLQUFLLFFBQVEsQ0FBQztnQkFDZCxLQUFLLFFBQVE7b0JBQ1gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO29CQUM5QyxJQUFJLFdBQVcsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO3lCQUNyQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3lCQUNSLEtBQUssQ0FBQyxHQUFHLENBQUM7eUJBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNiLE1BQU0sQ0FBQyxJQUFJLENBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFDcEMsV0FBVyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLFFBQVE7d0JBQ3BELENBQUMsQ0FBQyx3QkFBd0I7d0JBQzFCLENBQUMsQ0FBQyxFQUFFLEVBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLElBQUksS0FBSyxDQUNyQyxDQUFDO29CQUNGLE1BQU07Z0JBQ1IsS0FBSyxPQUFPLENBQUM7Z0JBQ2I7b0JBQ0UsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztvQkFDNUMsTUFBTTthQUNUO1lBRUQsV0FBVztZQUNYLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFckMsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGIn0=