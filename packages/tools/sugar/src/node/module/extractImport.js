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
const path_1 = __importDefault(require("../../shared/is/path"));
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3RJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTRDO0FBQzVDLDRDQUFzQjtBQUN0Qiw4RUFBd0Q7QUFDeEQscURBQXVDO0FBQ3ZDLHFDQUFnRDtBQUNoRCwrREFBc0Q7QUF1Q3RELFNBQXdCLGFBQWEsQ0FDbkMsZ0JBQWdCLEVBQ2hCLFFBQTBDO0lBRTFDLE1BQU0sR0FBRyxHQUEyQixtQkFBVyxDQUM3QztRQUNFLE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFLElBQUk7S0FDZCxFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FBQztJQUVGLElBQUksT0FBTyxHQUFHLGdCQUFnQixDQUFDO0lBRS9CLHFCQUFxQjtJQUNyQixJQUFJLGNBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQzlCLE9BQU8sR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDL0M7SUFFRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUNqQyxXQUFXLEVBQUUsUUFBUTtLQUN0QixDQUFDLENBQUM7SUFFSCxNQUFNLGlCQUFpQixHQUF5QixFQUFFLENBQUM7SUFFbkQsVUFBVTtJQUNWLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNkLE1BQU0sVUFBVSxHQUFHLDJCQUFNLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFFcEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQy9CLE1BQU0sU0FBUyxHQUFnQztnQkFDN0MsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDNUIsR0FBRyxFQUFFLGtCQUFTLENBQUMsU0FBUyxDQUFDO2FBQzFCLENB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