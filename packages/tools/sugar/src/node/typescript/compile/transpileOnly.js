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
const path_1 = __importDefault(require("../../is/path"));
const fs_1 = __importDefault(require("fs"));
const __ts = __importStar(require("typescript"));
/**
 * @name            transpileOnly
 * @namespace       sugar.node.typescript.compile
 * @type            Function
 * @async
 * @beta
 *
 * This function simply take a file path (or some code directly) and an object representing the "compilerOptions"
 * of your tsconfig.json file and transpile the code in javascript.
 *
 * @param           {String}          source            The source to transpile. Can be some code of a filepath
 * @param           {Object}          [compilerOptions={}]          Some option to pass to the compiler
 * @return          {Promise}                               A promise that will be resolved once the transpile as ended
 *
 * @example             js
 * import transpileOnly from '@coffeekraken/sugar/node/typescript/compile/transpileOnly';
 * await transpileOnly('my/cool/file.ts');
 * // {
 * //       code: '...',
 * //       map: '...'
 * // }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const fn = function (source, compilerOptions) {
    return new Promise((resolve, reject) => {
        let content = source;
        if (path_1.default(source)) {
            content = fs_1.default.readFileSync(source, 'utf8');
        }
        let result = __ts.transpileModule(content, {
            compilerOptions
        });
        resolve({
            code: result.outputText,
            map: result.sourceMapText
        });
    });
};
module.exports = fn;
//# sourceMappingURL=transpileOnly.js.map