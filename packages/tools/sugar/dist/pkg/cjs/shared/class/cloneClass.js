"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clone_class_1 = require("clone-class");
/**
 * @name            cloneClass
 * @namespace            shared.class
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Clone ES6 Classes
 *
 * @param       {Class}          class        The class to clone
 * @return      {Class}                             A new class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import { __cloneClass } from '@coffeekraken/sugar/class';
 * const NewClass = __cloneClass(class MyClass() {});
 *
 * @see             https://www.npmjs.com/package/clone-class
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1(cls) {
    return (0, clone_class_1.cloneClass)(cls);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQXlDO0FBRXpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxtQkFBeUIsR0FBUTtJQUM3QixPQUFPLElBQUEsd0JBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRkQsNEJBRUMifQ==