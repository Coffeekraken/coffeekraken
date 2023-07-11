import __pickRandom from '../../../shared/array/pickRandom.js';
import __md5 from '../../../shared/crypto/md5.js';
import type { IAvailableColorsSettings } from '../../../shared/dev/color/availableColors.js';
import __availableColors from '../../../shared/dev/color/availableColors.js';
import __deepMerge from '../../../shared/object/deepMerge.js';

/**
 * @name            getColorFor
 * @namespace            js.dev.color
 * @type            Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * This function let you pass anything like an object, a string, etc... and get the same
 * color back everytime you pass the same value.
 * This if usefull for output logs, etc...
 *
 * @param       {any}          for             Pass something to take as reference to get the same color back every time
 * @return      {String}                        A color name to use as you want
 *
 * @snippet         __getColorFor($1)
 *
 * @example         js
 * import { __getColorFor } from '@coffeekraken/sugar/dev';
 * __getColorFor('something'); // => cyan
 * __getColorFor({
 *      else: true
 * }); // => magenta
 * __getColorFor('something') // => cyan
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IGetColorForSettings extends IAvailableColorsSettings {
    scope: string;
}

let _colorsStack: Record<string, string> = {};
let _colorUsedByScope: Record<string, string[]> = {};

export default function getColorFor(
    ref: any,
    settings?: Partial<IGetColorForSettings>,
) {
    settings = __deepMerge(
        {
            scope: 'default',
            excludeBasics: true,
        },
        settings ?? {},
    );

    const availableColors = __availableColors(settings);

    const scopeId = __md5.encrypt(settings.scope);
    const refId = __md5.encrypt(ref);

    // get from cache
    if (_colorsStack[`${scopeId}.${refId}`]) {
        return _colorsStack[`${scopeId}.${refId}`];
    }

    // make sure some stack are ok
    if (!_colorUsedByScope[scopeId]) _colorUsedByScope[scopeId] = [];

    // if we already have taken all the available colors for this scope
    // simply get a color randomly
    if (_colorUsedByScope[scopeId].length >= availableColors.length) {
        // fully random
        const color = __pickRandom(availableColors);
        _colorsStack[`${scopeId}.${refId}`] = color;
        return color;
    } else {
        for (let i = 0; i < availableColors.length; i++) {
            if (_colorUsedByScope[scopeId].indexOf(availableColors[i]) === -1) {
                _colorUsedByScope[scopeId].push(availableColors[i]);
                _colorsStack[`${scopeId}.${refId}`] = availableColors[i];
                return availableColors[i];
            }
        }
    }
}
