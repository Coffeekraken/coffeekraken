// @ts-nocheck

import __deepMerge from '../../object/deepMerge';

/**
 * @name            findImportStatements
 * @namespace       sugar.node.scss.utils
 * @type            Function
 * @status              beta
 *
 * This function simply parse the passed string to extract all the @import and @use statements
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
 * import findImportStatements from '@coffeekraken/sugar/node/scss/utils/findImportStatements';
 * findImportStatements(`
 *    @use 'something/cool' as Hello;
 *    @import 'other/cool/thing';
 * `);
 * // [{
 * //   type: 'use',
 * //   path: 'something/cool',
 * //   as: 'Hello'
 * // }, {
 * //   type: 'import',
 * //   path: 'other/cool/thing'
 * // }]
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function findImportStatements(string, settings = {}) {
  settings = __deepMerge(
    {
      use: true,
      import: true
    },
    settings
  );

  // split lines
  const lines = string.split('\n');

  const reg = /^(\s+)?@(use|import)\s*['"](.*?)['"](\sas\s([a-zA-Z0-9-_]+))?/g;

  const statements = [];

  // loop on each lines
  lines.forEach((line, index) => {
    const matches = line.match(reg);

    if (!matches) return;
    matches.forEach((match) => {
      match = match.trim();
      const statementObj = {
        raw: match + ';'
      };
      if (match.match(/^@import\s/)) {
        statementObj.type = 'import';
      } else {
        statementObj.type = 'use';
      }
      match = match.replace(/^@import\s/, '').replace(/^@use\s/, '');
      if (statementObj.type === 'use' && match.match(/\sas\s/)) {
        const parts = match.split(' as ');
        statementObj.path = parts[0];
        statementObj.as = parts[1];
      } else {
        statementObj.path = match;
      }
      statementObj.line = index;

      statementObj.path = statementObj.path.slice(1, -1);

      if (settings.use && statementObj.type === 'use') {
        statements.push(statementObj);
      } else if (settings.import && statementObj.type === 'import') {
        statements.push(statementObj);
      }
    });
  });

  return statements;
}
export = findImportStatements;
