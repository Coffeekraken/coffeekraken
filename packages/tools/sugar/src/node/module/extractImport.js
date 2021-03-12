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
                path: importAst.source.value
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
                    path: varObj.init.arguments[0].value
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3RJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWtDO0FBQ2xDLDRDQUFzQjtBQUV0QixvRUFBOEM7QUFDOUMscURBQXVDO0FBQ3ZDLCtEQUk4QjtBQXVDOUIsU0FBd0IsYUFBYSxDQUNuQyxnQkFBZ0IsRUFDaEIsUUFBMEM7SUFFMUMsTUFBTSxHQUFHLEdBQTJCLG1CQUFXLENBQzdDO1FBQ0UsTUFBTSxFQUFFLElBQUk7UUFDWixPQUFPLEVBQUUsSUFBSTtLQUNkLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUFDO0lBRUYsSUFBSSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7SUFFL0IscUJBQXFCO0lBQ3JCLElBQUksY0FBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDOUIsT0FBTyxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUMvQztJQUVELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQ2pDLFdBQVcsRUFBRSxRQUFRO0tBQ3RCLENBQUMsQ0FBQztJQUVILE1BQU0saUJBQWlCLEdBQXlCLEVBQUUsQ0FBQztJQUVuRCxVQUFVO0lBQ1YsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ2QsTUFBTSxVQUFVLEdBQUcsMkJBQU0sQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUVwRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDL0IsTUFBTSxTQUFTLEdBQWdDO2dCQUM3QyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLO2FBQzdCLENBQUM7WUFDRixTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFB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