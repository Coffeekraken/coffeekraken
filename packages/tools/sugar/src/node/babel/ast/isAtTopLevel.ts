// @ts-nocheck

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
function isAtTopLevel(path: any) {
  if (!path.scope || !path.scope.path || !path.scope.path.type) return false;
  return path.scope.path.type === 'Program';
}
export = isAtTopLevel;
