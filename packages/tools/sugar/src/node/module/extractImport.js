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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3RJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sS0FBSyxPQUFPLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxRQUFRLElBQUksU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hELE9BQU8sRUFBRSxJQUFJLElBQUksTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUF3Q3RELE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUNuQyxnQkFBZ0IsRUFDaEIsUUFBMEM7SUFFMUMsTUFBTSxHQUFHLEdBQTJCLFdBQVcsQ0FDN0M7UUFDRSxNQUFNLEVBQUUsSUFBSTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2QsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQUM7SUFFRixJQUFJLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztJQUUvQixxQkFBcUI7SUFDckIsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDakMsV0FBVyxFQUFFLFFBQVE7S0FDdEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxpQkFBaUIsR0FBeUIsRUFBRSxDQUFDO0lBRW5ELFVBQVU7SUFDVixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDZCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFFcEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQy9CLE1BQU0sU0FBUyxHQUFnQztnQkFDN0MsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDNUIsR0FBRyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUM7YUFDMUIsQ0FBQztZQUVGLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9CLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQ3pDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUN6QyxRQUFRLFNBQVMsQ0FBQyxJQUFJLEVBQUU7d0JBQ3RCLEtBQUssaUJBQWlCOzRCQUNwQixHQUFHLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDOzRCQUN2QyxHQUFHLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUNqQyxpQkFBaUIsQ0FBQyxJQUFJLENBQXFCLEdBQUcsQ0FBQyxDQUFDOzRCQUNoRCxNQUFNO3dCQUNSLEtBQUssMEJBQTBCOzRCQUM3QixHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQzs0QkFDbkIsR0FBRyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs0QkFDakMsaUJBQWlCLENBQUMsSUFBSSxDQUFxQixHQUFHLENBQUMsQ0FBQzs0QkFDaEQsTUFBTTt3QkFDUixLQUFLLHdCQUF3Qjs0QkFDM0IsR0FBRyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7NEJBQ3pCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7NEJBQ2pDLGlCQUFpQixDQUFDLElBQUksQ0FBcUIsR0FBRyxDQUFDLENBQUM7NEJBQ2hELE1BQU07cUJBQ1Q7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxTQUFTLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztnQkFDekIsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7Z0JBQzVCLGlCQUFpQixDQUFDLElBQUksQ0FBcUIsU0FBUyxDQUFDLENBQUM7YUFDdkQ7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNmLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBRWhFLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxnQkFBZ0I7b0JBQUUsT0FBTztnQkFDbEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ2xDLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTO29CQUFFLE9BQU87Z0JBRXRDLE1BQU0sVUFBVSxHQUFnQztvQkFDOUMsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7b0JBQ3BDLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDO2lCQUNwQixDQUFDO2dCQUVGLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFO29CQUNuQyxVQUFVLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztvQkFDaEMsVUFBVSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvQkFDbEMsaUJBQWlCLENBQUMsSUFBSSxDQUFxQixVQUFVLENBQUMsQ0FBQztpQkFDeEQ7cUJBQU0sSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxlQUFlLEVBQUU7b0JBQzdDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUN2QyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDMUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzt3QkFDaEMsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzt3QkFDN0IsaUJBQWlCLENBQUMsSUFBSSxDQUFxQixHQUFHLENBQUMsQ0FBQztvQkFDbEQsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTO29CQUFFLE9BQU87Z0JBQ2pFLElBQ0UsQ0FBQyxPQUFPLENBQUMsU0FBUztvQkFDbEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUztvQkFDdkMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7b0JBRTNCLE9BQU87Z0JBRVQsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtvQkFDdkMsSUFBSSxNQUFNO3dCQUFFLE9BQU87b0JBQ25CLElBQUksVUFBVSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7d0JBQUUsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDcEUsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWCxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLElBQUksRUFBRSxTQUFTO3dCQUNmLElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7d0JBQ2hDLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDO3dCQUNuQixRQUFRLEVBQUUsR0FBRzt3QkFDYixLQUFLLEVBQUUsU0FBUztxQkFDakIsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtLQUNGO0lBQ0QsT0FBTyxpQkFBaUIsQ0FBQztBQUMzQixDQUFDIn0=