import __sugarConfig from '../../config/sugar';

/**
 * @name            availableColors
 * @namespace       sugar.shared.dev.colors
 * @type            Function
 *
 * Return the list of color names you can access using the ```colorValue``` function.
 * These colors are specified in the config.terminal configuration file under the "colors" property.
 *
 * @example         js
 * import availableColors from '@coffeekraken/sugar/shared/dev/colors/availableColors';
 * availableColors(); => ['black','white','yellow','green',...]
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function availableColors() {
  return Object.keys(__sugarConfig('dev.colors'));
}
