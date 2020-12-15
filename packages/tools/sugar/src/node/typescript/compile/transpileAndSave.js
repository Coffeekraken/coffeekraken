"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("../../is/path"));
const fs_1 = __importDefault(require("fs"));
const transpileOnly_1 = __importDefault(require("./transpileOnly"));
/**
 * @name            transpileAndSave
 * @namespace       sugar.node.typescript.compile
 * @type            Function
 * @async
 * @beta
 *
 * This function simply take a file path and an object representing the "compilerOptions"
 * of your tsconfig.json file and transpile the code in javascript. Then it save the file at the same
 * place the source one was founded and replace the extension to .js
 *
 * @param           {String}          filepath            The file path to transpile.
 * @param           {Object}          [compilerOptions={}]          Some option to pass to the compiler
 * @return          {Promise}                               A promise that will be resolved once the transpile as ended
 *
 * @example             js
 * import transpileAndSave from '@coffeekraken/sugar/node/typescript/compile/transpileAndSave';
 * await transpileAndSave('my/cool/file.ts');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const fn = function (filepath, compilerOptions) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        if (path_1.default(filepath) === false || fs_1.default.existsSync(filepath) === false) {
            return reject(`You must pass a valid file path in order to transpile and save it. The passed one "<yellow>${filepath}</yellow>" seems to be an invalid path or the file does not exists...`);
        }
        const typescriptResult = yield transpileOnly_1.default(filepath, compilerOptions);
        if (typescriptResult && typescriptResult.code !== undefined) {
            const newFilePath = filepath.replace(/\.tsx?$/, '.js');
            if (newFilePath === filepath)
                return reject(`The file "<yellow>${filepath}</yellow>" cannot be written cause it would override the source one...`);
            fs_1.default.writeFileSync(newFilePath, typescriptResult.code);
            // console.log(filepath.replace(/\.tsx?$/, '.js'));
        }
        if (typescriptResult && typescriptResult.map !== undefined) {
            const newFilePath = filepath.replace(/\.tsx?$/, '.js.map');
            if (newFilePath === filepath)
                return reject(`The file "<yellow>${filepath}</yellow>" cannot be written cause it would override the source one...`);
            fs_1.default.writeFileSync(newFilePath, typescriptResult.map);
        }
        resolve(typescriptResult);
    })).catch((e) => { });
};
module.exports = fn;
//# sourceMappingURL=transpileAndSave.js.map