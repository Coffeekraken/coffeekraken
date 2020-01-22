/**
 * @name                            registerAnimation
 * @namespace                       squid.js.core
 * @type                            Function
 *
 * Register an animation either "in" ou "out" to handle the change of HTML content in the page
 *
 * @param               {String}              phase                   Specify the animation phase. Can be either "in" ou "out"
 * @param               {String}              name                    The name that you want to give to your animation. This name is what will be used to call it
 * @param               {String}              path                    Specify the file path to the animation script
 *
 * @example           js
 * Squid.registerAnimation('in', 'myCoolAnimation', '/the/path/to/the/animation/script/file.js');
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (phase, name, path) => {

  // save the animation properties in the global Squid object
  if ( ! Squid._animations) Squid._animations = {};
  if ( ! Squid._animations[phase]) Squid._animations[phase] = {};
  Squid._animations[phase][name] = {
    phase, name, path
  };
  
}
