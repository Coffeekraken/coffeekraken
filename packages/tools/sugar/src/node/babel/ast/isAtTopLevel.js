"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            isAtTopLevel
 * @namespace       sugar.node.babel.ast
 * @type            Function
 * @status              wip
 *
 * Check if the passed path is at top level of the AST or not
 *
 * @param           {Path}          path          The path to check
 * @return          {Boolean}                       true if is at top level, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import isAtTopLevel from 'coffeekraken/sugar/node/babel/ast/isAtTopLevel';
 * isAtTopLevel(path); // => true|false
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isAtTopLevel(path) {
    if (!path.scope || !path.scope.path || !path.scope.path.type)
        return false;
    return path.scope.path.type === 'Program';
}
exports.default = isAtTopLevel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNBdFRvcExldmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNBdFRvcExldmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLFlBQVksQ0FBQyxJQUFTO0lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDM0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO0FBQzVDLENBQUM7QUFDRCxrQkFBZSxZQUFZLENBQUMifQ==