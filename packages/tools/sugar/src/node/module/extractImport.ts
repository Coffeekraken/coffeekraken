import __isPath from '../../shared/is/path';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
import * as __acorn from 'acorn-loose';
import { generate as __astring } from 'astring';
import { find as __find } from 'abstract-syntax-tree';
import path from '../../shared/is/path';

/**
 * @name            extractImport
 * @namespace            node.module
 * @type            Function
 * @status          beta
 *
 * This function simply parse a file content or a passed string directly and
 * build the list of finded "import ... from ..." as well as commonjs "require(...)".
 * You will get back an array of object containing all the imformations about each
 * import and require statements
 *
 * @param       {String}        stringOrFilePath            A string to parse, or a file path
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
  raw: string;
  imported: string;
  local: string | undefined;
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
    ecmaVersion: 'latest'
  });

  const finalImportsArray: IExtractImportItem[] = [];

  // imports
  if (set.import) {
    const importsAst = __find(ast, 'ImportDeclaration');

    importsAst.forEach((importAst) => {
      const importObj: Partial<IExtractImportItem> = {
        type: 'import',
        path: importAst.source.value,
        raw: __astring(importAst)
      };

      if (importAst.specifiers.length) {
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
      } else {
        importObj.imported = '*';
        importObj.local = undefined;
        finalImportsArray.push(<IExtractImportItem>importObj);
      }
    });

    if (set.require) {
      const variablesDeclarations = __find(ast, 'VariableDeclarator');

      variablesDeclarations.forEach((varObj) => {
        if (!varObj.init || varObj.init.type !== 'CallExpression') return;
        const callee = varObj.init.callee;
        if (callee.name !== 'require') return;

        const requireObj: Partial<IExtractImportItem> = {
          type: 'require',
          path: varObj.init.arguments[0].value,
          raw: __astring(ast)
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

      const callDeclarations = __find(ast, 'CallExpression');
      callDeclarations.forEach((callObj) => {
        if (!callObj.callee || callObj.callee.name !== 'require') return;
        if (
          !callObj.arguments ||
          callObj.arguments[0].type !== 'Literal' ||
          !callObj.arguments[0].value
        )
          return;

        let exists = false;
        finalImportsArray.forEach((importsObj) => {
          if (exists) return;
          if (importsObj.path === callObj.arguments[0].value) exists = true;
        });
        if (!exists) {
          finalImportsArray.push({
            type: 'require',
            path: callObj.arguments[0].value,
            raw: __astring(ast),
            imported: '*',
            local: undefined
          });
        }
      });
    }
  }
  return finalImportsArray;
}
