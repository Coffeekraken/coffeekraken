import __isPath from '../is/path';
import __fs from 'fs';
import __path from 'path';
import __deepMerge from '../object/deepMerge';
import * as __acorn from 'acorn';
import {
  parse as __parse,
  find as __find,
  walk as __walk
} from 'abstract-syntax-tree';
import __toString from '../string/toString';

/**
 * @name            extractImport
 * @namespace       sugar.node.module
 * @type            Function
 * @status          beta
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
 * @todo        Tests
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
export interface IExtractImportItem {
  type: 'import' | 'require';
  path: string;
  imported: string;
  local: string;
}

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

  const ast = __acorn.parse(content, {
    ecmaVersion: 2020,
    sourceType: 'module'
  });

  const finalImportsArray: IExtractImportItem[] = [];

  // imports
  if (set.import) {
    const importsAst = __find(ast, 'ImportDeclaration');

    importsAst.forEach((importAst) => {
      const importObj: Partial<IExtractImportItem> = {
        type: 'import',
        path: importAst.source.value
      };
      importAst.specifiers.forEach((specifier) => {
        const obj = Object.assign({}, importObj);
        switch (specifier.type) {
          case 'ImportSpecifier':
            obj.imported = specifier.imported.name;
            obj.local = specifier.local.name;
            finalImportsArray.push(<IExtractImportItem>obj);
            break;
          case 'ImportNamespaceSpecifier':
            obj.imported = '*';
            obj.local = specifier.local.name;
            finalImportsArray.push(<IExtractImportItem>obj);
            break;
          case 'ImportDefaultSpecifier':
            obj.imported = 'default';
            obj.local = specifier.local.name;
            finalImportsArray.push(<IExtractImportItem>obj);
            break;
        }
      });
    });

    if (set.require) {
      const variablesDeclarations = __find(ast, 'VariableDeclarator');

      variablesDeclarations.forEach((varObj) => {
        if (!varObj.init || varObj.init.type !== 'CallExpression') return;
        const callee = varObj.init.callee;
        if (callee.name !== 'require') return;

        const requireObj: Partial<IExtractImportItem> = {
          type: 'require',
          path: varObj.init.arguments[0].value
        };

        if (varObj.id.type === 'Identifier') {
          requireObj.imported = 'default';
          requireObj.local = varObj.id.name;
          finalImportsArray.push(<IExtractImportItem>requireObj);
        } else if (varObj.id.type === 'ObjectPattern') {
          varObj.id.properties.forEach((propObj) => {
            const obj = Object.assign({}, requireObj);
            obj.imported = propObj.key.name;
            obj.local = propObj.key.name;
            finalImportsArray.push(<IExtractImportItem>obj);
          });
        }
      });
    }
  }
  return finalImportsArray;
}
