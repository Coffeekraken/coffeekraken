"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                                      isJs
 * @namespace            shared.is
 * @type                                      Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * import isJs from '@coffeekraken/sugar/shared/is/js';
 * isJs(); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = () => {
    return typeof window !== 'undefined';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsa0JBQWUsR0FBRyxFQUFFO0lBQ2hCLE9BQU8sT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDO0FBQ3pDLENBQUMsQ0FBQyJ9