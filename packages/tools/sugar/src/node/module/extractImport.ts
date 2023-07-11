import * as __ast from 'abstract-syntax-tree';
import * as __acorn from 'acorn-loose';
import { generate as __astring } from 'astring';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge.js';

/**
 * @name            extractImport
 * @namespace            node.module
 * @type            Function
 * @platform        node
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
 * @snippet         __extractImports($1)
 *
 * @example         js
 * import { __extractImports } from '@coffeekraken/sugar/module';
 * __extractImports('/something/cool.js');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IExtractImportSettings {
    import: boolean;
}
export interface IExtractImportItem {
    type: 'import';
    path: string;
    raw: string;
    imported: string;
    local: string | undefined;
}

export default function __extractImports(
    stringOrFilePath,
    settings?: Partial<IExtractImportSettings>,
): IExtractImportItem[] {
    const set = <IExtractImportSettings>__deepMerge(
        {
            import: true,
        },
        settings || {},
    );

    let content = stringOrFilePath;

    // check if is a file
    if (__fs.existsSync(stringOrFilePath)) {
        content = __fs.readFileSync(stringOrFilePath);
    }

    const ast = __acorn.parse(content, {
        ecmaVersion: 'latest',
    });

    const finalImportsArray: IExtractImportItem[] = [];

    // imports
    if (set.import) {
        const importsAst = __ast.find(ast, 'ImportDeclaration');

        importsAst.forEach((importAst) => {
            const raw = __astring(importAst).replace(/await;\n/, 'await ');

            const importObj: Partial<IExtractImportItem> = {
                type: 'import',
                path: importAst.source.value,
                raw,
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

        const importExpressions = __ast.find(ast, 'ImportExpression');
        importExpressions.forEach((callObj) => {
            if (!callObj.source.value) return;

            let exists = false;
            finalImportsArray.forEach((importsObj) => {
                if (exists) return;
                if (importsObj.path === callObj.source.value) exists = true;
            });
            if (!exists) {
                const raw = __astring(ast).replace(/await;\n/, 'await ');
                finalImportsArray.push({
                    type: 'import',
                    path: callObj.source.value,
                    raw,
                    imported: '*',
                    local: undefined,
                });
            }
        });
    }

    // if (set.require) {
    //     const variablesDeclarations = __ast.find(ast, 'VariableDeclarator');

    //     variablesDeclarations.forEach((varObj) => {
    //         if (!varObj.init || varObj.init.type !== 'require') return;

    //         const raw = __astring(ast).replace(/await;\n/, 'await ');

    //         const requireObj: Partial<IExtractImportItem> = {
    //             type: 'require',
    //             path:
    //                 varObj.init.arguments?.[0]?.value ||
    //                 varObj.init.source.value,
    //             raw,
    //         };

    //         if (varObj.id.type === 'Identifier') {
    //             requireObj.imported = 'default';
    //             requireObj.local = varObj.id.name;
    //             (requireObj.async = new RegExp('await').test(raw)),
    //                 finalImportsArray.push(<IExtractImportItem>requireObj);
    //         } else if (varObj.id.type === 'ObjectPattern') {
    //             varObj.id.properties.forEach((propObj) => {
    //                 const obj = Object.assign({}, requireObj);
    //                 obj.imported = propObj.key.name;
    //                 obj.local = propObj.key.name;
    //                 obj.async = new RegExp('await').test(raw);
    //                 finalImportsArray.push(<IExtractImportItem>obj);
    //             });
    //         }
    //     });
    // }

    return finalImportsArray;
}
