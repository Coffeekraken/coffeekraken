// @ts-nocheck

import __deepMerge from '../../object/deepMerge';
import __findImportStatements from './findImportStatements';
import __dedupe from '../../string/dedupe';

/**
 * @name            ensureNoDuplicateImportStatements
 * @namespace       sugar.node.scss.utils
 * @type            Function
 * @beta
 *
 * This function simply parse the passed string and make sure their's no duplicate import and use statements
 *
 * @param       {String}          string          The string to parse
 * @param       {Object}        [settings={}]     An object of settings to configure your parsing
 * @return      {Array<Object>}                   An array of object describing each founded statements
 *
 * @setting      {Boolean}       [use=true]      Specify if you want to extract the @use statements
 * @setting      {Boolean}      [imports=true]    Specify if you want to extract the @import statements
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import ensureNoDuplicateImportStatements from '@coffeekraken/sugar/node/scss/utils/ensureNoDuplicateImportStatements';
 * ensureNoDuplicateImportStatements(`
 *    @use 'something/cool' as Hello;
 *    @import 'other/cool/thing';
 *    @use 'something/cool' as Hello;
 * `);
 * // @use 'something/cool' as Hello;
 * // @import 'other/cool/thing';
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ensureNoDuplicateImportStatements(
  string,
  settings = {}
) {
  settings = __deepMerge(
    {
      use: true,
      import: true
    },
    settings
  );
  const statementsArray = __findImportStatements(string, settings);
  statementsArray.forEach((statementObj) => {
    string = __dedupe(string, statementObj.raw);
  });
  return string;
}
export = ensureNoDuplicateImportStatements;