// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @name                              when
 * @namespace           sugar.js.dom
 * @type                              Function
 * @stable
 *
 * Return a promise that will be resolved when the wanted status has been applied on the passed HTMLElement.
 * The status that can be requested are:
 * - attribute : Detect when a special attribute has been applied on the element
 * --- settings.attribute : Specify the attribute to check
 * --- settings.checkFn : An optional function to check the attribute. The promise is resolved when this function return true
 *
 * - inViewport : Detect when the element enter in the viewport
 * --- settings.offset : Specify an offset to detect the in viewport state
 *
 * - outOfViewport : Detect when the element exit the viewport
 * --- settings.offset : Specify an offset to detect the out viewport state
 *
 * - transitionEnd : Detect when the css transition is finished on the element
 * --- settings.callback : An optional callback function if you prefer instead of the promise
 *
 * - visible : Detect when the element become visible
 * --- settings.callback : An optional callback function if you prefer instead of the promise
 *
 * @param               {HTMLElement}                 $node               The HTMLElement to check
 * @param               {String}                      state               The state to check on the HTMLElement
 * @param               {Object}                      [settings={}]       The settings to configure the check process
 * @return              {Promise}                                         A promise that will be resolved when the state is detected
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import when from '@coffeekraken/sugar/js/dom/when';
 * when(myCoolNode, 'inViewport').then(() => {
 *    // do something...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function when($node, state, settings = {}) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        // check the state to detect
        let importPromise, args;
        switch (state) {
            case 'attribute':
                importPromise = import(
                /* webpackChunkName: "whenAttribute" */ /* webpackMode: "lazy" */ './whenAttribute');
                args = [$node, settings.attribute, settings.checkFn];
                break;
            case 'inViewport':
                importPromise = import(
                /* webpackChunkName: "whenInViewport" */ /* webpackMode: "lazy" */ './whenInViewport');
                args = [$node, settings.offset];
                break;
            case 'outOfViewport':
                importPromise = import(
                /* webpackChunkName: "whenOutOfViewport" */ /* webpackMode: "lazy" */ './whenOutOfViewport');
                args = [$node, settings.offset];
                break;
            case 'transitionEnd':
                importPromise = import(
                /* webpackChunkName: "whenTransitionEnd" */ /* webpackMode: "lazy" */ './whenTransitionEnd');
                args = [$node, settings.callback];
                break;
            case 'visible':
                importPromise = import(
                /* webpackChunkName: "whenVisible" */ /* webpackMode: "lazy" */ './whenVisible');
                args = [$node, settings.callback];
                break;
            default:
                resolve($node);
                return;
                break;
        }
        // wait until the module is loaded
        const module = yield importPromise;
        // call the when... function
        module.default.apply(null, args).then(() => {
            // resolve the promise
            resolve($node);
        });
    }));
}
export default when;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDRztBQUNILFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMzQyw0QkFBNEI7UUFDNUIsSUFBSSxhQUFhLEVBQUUsSUFBSSxDQUFDO1FBQ3hCLFFBQVEsS0FBSyxFQUFFO1lBQ2IsS0FBSyxXQUFXO2dCQUNkLGFBQWEsR0FBRyxNQUFNO2dCQUNwQix1Q0FBdUMsQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBaUIsQ0FDcEYsQ0FBQztnQkFDRixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JELE1BQU07WUFDUixLQUFLLFlBQVk7Z0JBQ2YsYUFBYSxHQUFHLE1BQU07Z0JBQ3BCLHdDQUF3QyxDQUFDLHlCQUF5QixDQUFDLGtCQUFrQixDQUN0RixDQUFDO2dCQUNGLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLE1BQU07WUFDUixLQUFLLGVBQWU7Z0JBQ2xCLGFBQWEsR0FBRyxNQUFNO2dCQUNwQiwyQ0FBMkMsQ0FBQyx5QkFBeUIsQ0FBQyxxQkFBcUIsQ0FDNUYsQ0FBQztnQkFDRixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxNQUFNO1lBQ1IsS0FBSyxlQUFlO2dCQUNsQixhQUFhLEdBQUcsTUFBTTtnQkFDcEIsMkNBQTJDLENBQUMseUJBQXlCLENBQUMscUJBQXFCLENBQzVGLENBQUM7Z0JBQ0YsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEMsTUFBTTtZQUNSLEtBQUssU0FBUztnQkFDWixhQUFhLEdBQUcsTUFBTTtnQkFDcEIscUNBQXFDLENBQUMseUJBQXlCLENBQUMsZUFBZSxDQUNoRixDQUFDO2dCQUNGLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2xDLE1BQU07WUFDUjtnQkFDRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2YsT0FBTztnQkFDUCxNQUFNO1NBQ1Q7UUFFRCxrQ0FBa0M7UUFDbEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxhQUFhLENBQUM7UUFFbkMsNEJBQTRCO1FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3pDLHNCQUFzQjtZQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsSUFBSSxDQUFDIn0=