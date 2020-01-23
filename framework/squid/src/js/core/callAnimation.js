/**
 * @name                          callAnimation
 * @namespace                     squid.js.core
 * @type                          Function
 *
 * Call an animation by specifying his name and phase. This will load dynamically the animation script if it is not already loaded, then call the animation script automatically.
 *
 * @param                   {String}                          phase                           The animation phase that you want to call
 * @param                   (String}                          name                            The animation name that you want to call
 * @param                   {HTMLElement}                     node                            The HTML node on which you want to apply your animation
 * @return                  {Promise}                                                         A promise that will be resolved at the end of the animation process
 *
 * @example               js
 * Squid.callAnimation('in', 'myCoolAnimation', myCoolNode).then(() => {
 *    // do something on animation end...
 * });
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (phase, name, node) => {
  return new Promise((resolve, reject) => {

    // check that the animation has been registered correctly
    if ( ! Squid._animations[phase][name]) {

    }

  });
}
