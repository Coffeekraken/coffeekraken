import { find as __find } from 'abstract-syntax-tree';
import * as __acorn from 'acorn-loose';
import { generate as __astring } from 'astring';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
export default function extractImport(stringOrFilePath, settings) {
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
        const importsAst = __find(ast, 'ImportDeclaration');
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
        const importExpressions = __find(ast, 'ImportExpression');
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
    //     const variablesDeclarations = __find(ast, 'VariableDeclarator');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3RJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksSUFBSSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEtBQUssT0FBTyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsUUFBUSxJQUFJLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUF3Q3hELE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUNqQyxnQkFBZ0IsRUFDaEIsUUFBMEM7SUFFMUMsTUFBTSxHQUFHLEdBQTJCLFdBQVcsQ0FDM0M7UUFDSSxNQUFNLEVBQUUsSUFBSTtLQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxHQUFHLGdCQUFnQixDQUFDO0lBRS9CLHFCQUFxQjtJQUNyQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNuQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDL0IsV0FBVyxFQUFFLFFBQVE7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxpQkFBaUIsR0FBeUIsRUFBRSxDQUFDO0lBRW5ELFVBQVU7SUFDVixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDWixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFFcEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzdCLE1BQU0sR0FBRyxHQUFHLFNBQVMs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