"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const path_1 = __importDefault(require("../is/path"));
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const __acorn = __importStar(require("acorn-loose"));
const astring_1 = require("astring");
const abstract_syntax_tree_1 = require("abstract-syntax-tree");
function extractImport(stringOrFilePath, settings) {
    const set = deepMerge_1.default({
        import: true,
        require: true
    }, settings || {});
    let content = stringOrFilePath;
    // check if is a file
    if (path_1.default(stringOrFilePath)) {
        content = fs_1.default.readFileSync(stringOrFilePath);
    }
    const ast = __acorn.parse(content, {
        ecmaVersion: 'latest'
    });
    const finalImportsArray = [];
    // imports
    if (set.import) {
        const importsAst = abstract_syntax_tree_1.find(ast, 'ImportDeclaration');
        importsAst.forEach((importAst) => {
            const importObj = {
                type: 'import',
                path: importAst.source.value,
                raw: astring_1.generate(importAst)
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
            const variablesDeclarations = abstract_syntax_tree_1.find(ast, 'VariableDeclarator');
            variablesDeclarations.forEach((varObj) => {
                if (!varObj.init || varObj.init.type !== 'CallExpression')
                    return;
                const callee = varObj.init.callee;
                if (callee.name !== 'require')
                    return;
                const requireObj = {
                    type: 'require',
                    path: varObj.init.arguments[0].value,
                    raw: astring_1.generate(ast)
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
            const callDeclarations = abstract_syntax_tree_1.find(ast, 'CallExpression');
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
                        raw: astring_1.generate(ast),
                        imported: '*',
                        local: undefined
                    });
                }
            });
        }
    }
    return finalImportsArray;
}
exports.default = extractImport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL21vZHVsZS9leHRyYWN0SW1wb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFrQztBQUNsQyw0Q0FBc0I7QUFFdEIsb0VBQThDO0FBQzlDLHFEQUF1QztBQUN2QyxxQ0FBZ0Q7QUFDaEQsK0RBSThCO0FBd0M5QixTQUF3QixhQUFhLENBQ25DLGdCQUFnQixFQUNoQixRQUEwQztJQUUxQyxNQUFNLEdBQUcsR0FBMkIsbUJBQVcsQ0FDN0M7UUFDRSxNQUFNLEVBQUUsSUFBSTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2QsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQUM7SUFFRixJQUFJLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztJQUUvQixxQkFBcUI7SUFDckIsSUFBSSxjQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUM5QixPQUFPLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDakMsV0FBVyxFQUFFLFFBQVE7S0FDdEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxpQkFBaUIsR0FBeUIsRUFBRSxDQUFDO0lBRW5ELFVBQVU7SUFDVixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDZCxNQUFNLFVBQVUsR0FBRywyQkFBTSxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRXBELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMvQixNQUFNLFNBQVMsR0FBZ0M7Z0JBQzdDLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQzVCLEdBQUcsRUFBRSxrQkFB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