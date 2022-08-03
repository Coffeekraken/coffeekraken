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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLElBQUksTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLFFBQVEsSUFBSSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBdUN4RCxNQUFNLENBQUMsT0FBTyxVQUFVLGFBQWEsQ0FDakMsZ0JBQWdCLEVBQ2hCLFFBQTBDO0lBRTFDLE1BQU0sR0FBRyxHQUEyQixXQUFXLENBQzNDO1FBQ0ksTUFBTSxFQUFFLElBQUk7S0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztJQUUvQixxQkFBcUI7SUFDckIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDbkMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNqRDtJQUVELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQy9CLFdBQVcsRUFBRSxRQUFRO0tBQ3hCLENBQUMsQ0FBQztJQUVILE1BQU0saUJBQWlCLEdBQXlCLEVBQUUsQ0FBQztJQUVuRCxVQUFVO0lBQ1YsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ1osTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRXBELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM3QixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFD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