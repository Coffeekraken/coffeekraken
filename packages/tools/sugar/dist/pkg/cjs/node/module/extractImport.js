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
const abstract_syntax_tree_1 = require("abstract-syntax-tree");
const __acorn = __importStar(require("acorn-loose"));
const astring_1 = require("astring");
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
function extractImport(stringOrFilePath, settings) {
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
        const importsAst = (0, abstract_syntax_tree_1.find)(ast, 'ImportDeclaration');
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
        const importExpressions = (0, abstract_syntax_tree_1.find)(ast, 'ImportExpression');
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
exports.default = extractImport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBc0Q7QUFDdEQscURBQXVDO0FBQ3ZDLHFDQUFnRDtBQUNoRCw0Q0FBc0I7QUFDdEIsOEVBQXdEO0FBdUN4RCxTQUF3QixhQUFhLENBQ2pDLGdCQUFnQixFQUNoQixRQUEwQztJQUUxQyxNQUFNLEdBQUcsR0FBMkIsSUFBQSxtQkFBVyxFQUMzQztRQUNJLE1BQU0sRUFBRSxJQUFJO0tBQ2YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7SUFFL0IscUJBQXFCO0lBQ3JCLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ25DLE9BQU8sR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDakQ7SUFFRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUMvQixXQUFXLEVBQUUsUUFBUTtLQUN4QixDQUFDLENBQUM7SUFFSCxNQUFNLGlCQUFpQixHQUF5QixFQUFFLENBQUM7SUFFbkQsVUFBVTtJQUNWLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNaLE1BQU0sVUFBVSxHQUFHLElBQUEsMkJBQU0sRUFBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUVwRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBQSxrQkFBUyxFQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFL0QsTUFBTSxTQUFTLEdBQWdDO2dCQUMzQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsU0FBUyxD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