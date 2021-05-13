import __isPath from '../../shared/is/path';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
import * as __acorn from 'acorn-loose';
import { generate as __astring } from 'astring';
import { find as __find } from 'abstract-syntax-tree';
export default function extractImport(stringOrFilePath, settings) {
    const set = __deepMerge({
        import: true,
        require: true
    }, settings || {});
    let content = stringOrFilePath;
    // check if is a file
    if (__isPath(stringOrFilePath)) {
        content = __fs.readFileSync(stringOrFilePath);
    }
    const ast = __acorn.parse(content, {
        ecmaVersion: 'latest'
    });
    const finalImportsArray = [];
    // imports
    if (set.import) {
        const importsAst = __find(ast, 'ImportDeclaration');
        importsAst.forEach((importAst) => {
            const importObj = {
                type: 'import',
                path: importAst.source.value,
                raw: __astring(importAst)
            };
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
        });
        if (set.require) {
            const variablesDeclarations = __find(ast, 'VariableDeclarator');
            variablesDeclarations.forEach((varObj) => {
                if (!varObj.init || varObj.init.type !== 'CallExpression')
                    return;
                const callee = varObj.init.callee;
                if (callee.name !== 'require')
                    return;
                const requireObj = {
                    type: 'require',
                    path: varObj.init.arguments[0].value,
                    raw: __astring(ast)
                };
                if (varObj.id.type === 'Identifier') {
                    requireObj.imported = 'default';
                    requireObj.local = varObj.id.name;
                    finalImportsArray.push(requireObj);
                }
                else if (varObj.id.type === 'ObjectPattern') {
                    varObj.id.properties.forEach((propObj) => {
                        const obj = Object.assign({}, requireObj);
                        obj.imported = propObj.key.name;
                        obj.local = propObj.key.name;
                        finalImportsArray.push(obj);
                    });
                }
            });
            const callDeclarations = __find(ast, 'CallExpression');
            callDeclarations.forEach((callObj) => {
                if (!callObj.callee || callObj.callee.name !== 'require')
                    return;
                if (!callObj.arguments ||
                    callObj.arguments[0].type !== 'Literal' ||
                    !callObj.arguments[0].value)
                    return;
                let exists = false;
                finalImportsArray.forEach((importsObj) => {
                    if (exists)
                        return;
                    if (importsObj.path === callObj.arguments[0].value)
                        exists = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3RJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sS0FBSyxPQUFPLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxRQUFRLElBQUksU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hELE9BQU8sRUFBRSxJQUFJLElBQUksTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUF1Q3RELE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUNuQyxnQkFBZ0IsRUFDaEIsUUFBMEM7SUFFMUMsTUFBTSxHQUFHLEdBQTJCLFdBQVcsQ0FDN0M7UUFDRSxNQUFNLEVBQUUsSUFBSTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2QsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQUM7SUFFRixJQUFJLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztJQUUvQixxQkFBcUI7SUFDckIsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDakMsV0FBVyxFQUFFLFFBQVE7S0FDdEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxpQkFBaUIsR0FBeUIsRUFBRSxDQUFDO0lBRW5ELFVBQVU7SUFDVixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDZCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFFcEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFD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