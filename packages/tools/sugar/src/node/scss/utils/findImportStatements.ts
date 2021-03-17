import __deepMerge from '../../../shared/object/deepMerge';

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

export interface IFindImportStatementsObj {
  type: string;
  path: string;
  raw: string;
  as?: string;
  line: number;
}

export interface IFindImportStatementsSettings {
  use: boolean;
  import: boolean;
}

function findImportStatements(
  string: string,
  settings?: Partial<IFindImportStatementsSettings>
): IFindImportStatementsObj[] {
  const set = <IFindImportStatementsSettings>__deepMerge(
    {
      use: true,
      import: true
    },
    settings || {}
  );

  // split lines
  const lines = string.split('\n');

  const reg = /^(\s+)?@(use|import)\s*['"](.*?)['"](\sas\s([a-zA-Z0-9-_]+))?/g;

  const statements: IFindImportStatementsObj[] = [];

  // loop on each lines
  lines.forEach((line, index) => {
    const matches = line.match(reg);

    if (!matches) return;
    matches.forEach((match) => {
      match = match.trim();

      const raw = match + ';';
      let type: string = 'use',
        path: string,
        as: string | undefined = undefined,
        line: number = index;
      if (match.match(/^@import\s/)) {
        type = 'import';
      }
      match = match.replace(/^@import\s/, '').replace(/^@use\s/, '');
      if (type === 'use' && match.match(/\sas\s/)) {
        const parts = match.split(' as ');
        path = parts[0];
        as = parts[1];
      } else {
        path = match;
      }
      path = path.slice(1, -1);

      const statementObj: IFindImportStatementsObj = {
        raw,
        type,
        path,
        as,
        line
      };

      if (set.use && type === 'use') {
        statements.push(statementObj);
      } else if (set.import && statementObj.type === 'import') {
        statements.push(statementObj);
      }
    });
  });

  return statements;
}
export default findImportStatements;
