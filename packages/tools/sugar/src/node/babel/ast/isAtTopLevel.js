"use strict";
/**
 * @name            isAtTopLevel
 * @namespace       sugar.node.babel.ast
 * @type            Function
 *
 * Check if the passed path is at top level of the AST or not
 *
 * @param           {Path}          path          The path to check
 * @return          {Boolean}                       true if is at top level, false if not
 *
 * @example         js
 * const isAtTopLevel = require('@coffeekraken/sugar/node/babel/ast/isAtTopLevel');
 * isAtTopLevel(path); // => true|false
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function isAtTopLevel(path) {
    if (!path.scope || !path.scope.path || !path.scope.path.type)
        return false;
    return path.scope.path.type === 'Program';
};
