
/**
 * @name            availableColors
 * @namespace            shared.dev.colors
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 * @private
 * 
 * Return the list of color names you can access using the ```colorValue``` function.
 * These colors are specified in the config.terminal configuration file under the "colors" property.
 *
 * @example         js
 * import availableColors from '@coffeekraken/sugar/shared/dev/color/availableColors';
 * availableColors(); => ['black','white','yellow','green',...]
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IAvailableColorsSettings {
    excludeBasics: boolean;
}
export default function availableColors(
    settings?: Partial<IAvailableColorsSettings>,
) {
    settings = {
        excludeBasics: false,
        ...(settings ?? {}),
    };

    const _colors = [
        'yellow',
        'cyan',
        'green',
        'magenta',
        'blue',
        'red',
        'grey',
        'gray',
    ];

    let colors = _colors;
    if (settings.excludeBasics) {
        colors = _colors.filter((c) => {
            return (
                c !== 'white' && c !== 'black' && c !== 'grey' && c !== 'gray'
            );
        });
    }

    return colors;
}
