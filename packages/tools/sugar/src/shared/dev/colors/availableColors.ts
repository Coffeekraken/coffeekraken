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
export interface IAvailableColorsSettings {
  excludeBasics: boolean;
}
export default function availableColors(
  settings?: Partial<IAvailableColorsSettings>
) {
  settings = {
    excludeBasics: false,
    ...(settings ?? {})
  };
  let colors = Object.keys(__sugarConfig('dev.colors'));

  if (settings.excludeBasics) {
    colors = colors.filter((c) => {
      return c !== 'white' && c !== 'black' && c !== 'grey' && c !== 'gray';
    });
  }

  return colors;
}
