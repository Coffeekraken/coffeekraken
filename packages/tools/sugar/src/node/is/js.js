"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                                      isJs
 * @namespace           sugar.js.is
 * @type                                      Function
 * @stable
 *
 * Check if the current script is running under javascript runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import isJs from '@coffeekraken/sugar/js/is/js';
 * isJs(); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = () => {
    return typeof window !== 'undefined';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7O0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsa0JBQWUsR0FBRyxFQUFFO0lBQ2xCLE9BQU8sT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQyJ9