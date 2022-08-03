"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                                      isNode
 * @namespace            shared.is
 * @type                                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current script is running under node runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import isNode from '@coffeekraken/sugar/shared/is/node';
 * isNode(); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = () => {
    return (typeof process !== 'undefined' &&
        process.release &&
        process.release.name === 'node');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsa0JBQWUsR0FBRyxFQUFFO0lBQ2hCLE9BQU8sQ0FDSCxPQUFPLE9BQU8sS0FBSyxXQUFXO1FBQzlCLE9BQU8sQ0FBQyxPQUFPO1FBQ2YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUNsQyxDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=