/**
 * @name                          animationExist
 * @namespace                     squid.js.core
 * @type                          Function
 *
 * Check if the passed animation name has been correctly registered in the system
 *
 * @param               {String}                          phase                 The animation phase to check. Can be "in" or "out"
 * @param               {String}                          name                  The animation name to check
 * @return              {Boolean}                                               Return true if the animation exist, false if not
 *
 * @example             js
 * Squid.animationExist('in', 'myCoolAnimation'); // => true
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (phase, name) => {
  if ( ! Squid._animations) return false;
  if ( ! Squid._animations[phase]) return false;
  if ( ! Squid._animations[phase][name]) return false;
  return true;
}
