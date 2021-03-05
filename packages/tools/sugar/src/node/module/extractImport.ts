import __isPath from '../is/path';
import __fs from 'fs';
import __path from 'path';
import __deepMerge from '../object/deepMerge';
import __unified from 'unified';

/**
 * @name            extractImport
 * @namespace       sugar.node.module
 * @type            Function
 *
 * This function simply parse a file content or a passed string directly and
 * build the list of finded "import ... from ..." as well as commonjs "require(...)".
 * You will get back an array of object containing all the imformations about each
 * import and require statements
 *
 * @param       {String}        stringOrFilePath            A string to parse, or a file path
 * @param       {IExtractImportSettings}        [settings={}]           Some settings to configure your extraction process
 * @return      {IExtractImportItem[]}                          An array of extracted items objects
 *
 * @todo        Enhance example
 *
 * @example         js
 * import extractImports from '@coffeekraken/sugar/node/module/extractImport';
 * extractImport('/something/cool.js');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IExtractImportSettings {
  import: boolean;
  require: boolean;
}
export interface IExtractImportItem {}

export default function extractImport(
  stringOrFilePath,
  settings?: Partial<IExtractImportSettings>
): IExtractImportItem[] {
  const set = <IExtractImportSettings>__deepMerge(
    {
      import: true,
      require: true
    },
    settings || {}
  );

  let content = stringOrFilePath;

  // check if is a file
  if (__isPath(stringOrFilePath)) {
    content = __fs.readFileSync(stringOrFilePath);
  }

  // imports
  if (set.import) {
    const importReg = /import\s(.*)\sfrom\s['"´](.*)['"´];?/gm;

    const importMatches = content.match(importReg);

    const imports: any[] = [];

    console.log(__unified.parse(importMatches.join('\n')));

    importMatches.forEach((importString) => {
      const splits = importString
        .split(/import|from|;/)
        .filter((l) => l.trim() !== '')
        .map((l) => l.trim());
      console.log(splits);

      // imports.push({
      //     type: 'import',

      // })
    });
  }

  return [];
}
