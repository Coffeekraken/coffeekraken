import * as __ast from 'abstract-syntax-tree';
import * as __acorn from 'acorn-loose';
import { generate as __astring } from 'astring';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
export default function __extractImports(stringOrFilePath, settings) {
    const set = __deepMerge({
        import: true,
    }, settings || {});
    let content = stringOrFilePath;
    // check if is a file
    if (__fs.existsSync(stringOrFilePath)) {
        content = __fs.readFileSync(stringOrFilePath);
    }
    const ast = __acorn.parse(content, {
        ecmaVersion: 'latest',
    });
    const finalImportsArray = [];
    // imports
    if (set.import) {
        const importsAst = __ast.find(ast, 'ImportDeclaration');
        importsAst.forEach((importAst) => {
            const raw = __astring(importAst).replace(/await;\n/, 'await ');
            const importObj = {
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
                            finalImportsArray.push(obj);
                            break;
                        case 'ImportNamespaceSpecifier':
                            obj.imported = '*';
                            obj.local = specifier.local.name;
                            finalImportsArray.push(obj);
                            break;
                        case 'ImportDefaultSpecifier':
                            obj.imported = 'default';
                            obj.local = specifier.local.name;
                            finalImportsArray.push(obj);
                            break;
                    }
                });
            }
            else {
                importObj.imported = '*';
                importObj.local = undefined;
                finalImportsArray.push(importObj);
            }
        });
        const importExpressions = __ast.find(ast, 'ImportExpression');
        importExpressions.forEach((callObj) => {
            if (!callObj.source.value)
                return;
            let exists = false;
            finalImportsArray.forEach((importsObj) => {
                if (exists)
                    return;
                if (importsObj.path === callObj.source.value)
                    exists = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxLQUFLLE9BQU8sTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLFFBQVEsSUFBSSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBdUN4RCxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUNwQyxnQkFBZ0IsRUFDaEIsUUFBMEM7SUFFMUMsTUFBTSxHQUFHLEdBQTJCLFdBQVcsQ0FDM0M7UUFDSSxNQUFNLEVBQUUsSUFBSTtLQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxHQUFHLGdCQUFnQixDQUFDO0lBRS9CLHFCQUFxQjtJQUNyQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNuQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDL0IsV0FBVyxFQUFFLFFBQVE7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxpQkFBaUIsR0FBeUIsRUFBRSxDQUFDO0lBRW5ELFVBQVU7SUFDVixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDWixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRXhELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM3QixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENB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