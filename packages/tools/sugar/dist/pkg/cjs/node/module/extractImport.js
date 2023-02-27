"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __ast = __importStar(require("abstract-syntax-tree"));
const __acorn = __importStar(require("acorn-loose"));
const astring_1 = require("astring");
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
function __extractImports(stringOrFilePath, settings) {
    const set = (0, deepMerge_1.default)({
        import: true,
    }, settings || {});
    let content = stringOrFilePath;
    // check if is a file
    if (fs_1.default.existsSync(stringOrFilePath)) {
        content = fs_1.default.readFileSync(stringOrFilePath);
    }
    const ast = __acorn.parse(content, {
        ecmaVersion: 'latest',
    });
    const finalImportsArray = [];
    // imports
    if (set.import) {
        const importsAst = __ast.find(ast, 'ImportDeclaration');
        importsAst.forEach((importAst) => {
            const raw = (0, astring_1.generate)(importAst).replace(/await;\n/, 'await ');
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
                const raw = (0, astring_1.generate)(ast).replace(/await;\n/, 'await ');
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
exports.default = __extractImports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBOEM7QUFDOUMscURBQXVDO0FBQ3ZDLHFDQUFnRDtBQUNoRCw0Q0FBc0I7QUFDdEIsOEVBQXdEO0FBeUN4RCxTQUF3QixnQkFBZ0IsQ0FDcEMsZ0JBQWdCLEVBQ2hCLFFBQTBDO0lBRTFDLE1BQU0sR0FBRyxHQUEyQixJQUFBLG1CQUFXLEVBQzNDO1FBQ0ksTUFBTSxFQUFFLElBQUk7S0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztJQUUvQixxQkFBcUI7SUFDckIsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDbkMsT0FBTyxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNqRDtJQUVELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQy9CLFdBQVcsRUFBRSxRQUFRO0tBQ3hCLENBQUMsQ0FBQztJQUVILE1BQU0saUJBQWlCLEdBQXlCLEVBQUUsQ0FBQztJQUVuRCxVQUFVO0lBQ1YsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ1osTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUV4RCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBQSxrQkFBUyxFQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFL0QsTUFBTSxTQUFTLEdBQWdDO2dCQUMzQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUs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