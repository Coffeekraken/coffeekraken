/**
 * @name                              when
 * @namespace           sugar.js.dom
 * @type                              Function
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
 * @example             js
 * import when from '@coffeekraken/sugar/js/dom/when';
 * when(myCoolNode, 'inViewport').then(() => {
 *    // do something...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function when($node, state, settings = {}) {
  return new Promise(async (resolve, reject) => {
    // check the state to detect
    let importPromise, args;
    switch (state) {
      case 'attribute':
        importPromise = import(
          /* webpackChunkName: "whenAttribute" */ /* webpackMode: "lazy" */ './whenAttribute'
        );
        args = [$node, settings.attribute, settings.checkFn];
        break;
      case 'inViewport':
        importPromise = import(
          /* webpackChunkName: "whenInViewport" */ /* webpackMode: "lazy" */ './whenInViewport'
        );
        args = [$node, settings.offset];
        break;
      case 'outOfViewport':
        importPromise = import(
          /* webpackChunkName: "whenOutOfViewport" */ /* webpackMode: "lazy" */ './whenOutOfViewport'
        );
        args = [$node, settings.offset];
        break;
      case 'transitionEnd':
        importPromise = import(
          /* webpackChunkName: "whenTransitionEnd" */ /* webpackMode: "lazy" */ './whenTransitionEnd'
        );
        args = [$node, settings.callback];
        break;
      case 'visible':
        importPromise = import(
          /* webpackChunkName: "whenVisible" */ /* webpackMode: "lazy" */ './whenVisible'
        );
        args = [$node, settings.callback];
        break;
      default:
        resolve($node);
        return;
        break;
    }

    // wait until the module is loaded
    const module = await importPromise;

    // call the when... function
    module.default.apply(null, args).then(() => {
      // resolve the promise
      resolve($node);
    });
  });
}
