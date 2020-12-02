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
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
/**
 * @name                compileTs
 * @namespace           sugar.node.typescript.compile
 * @type                Function
 * @async
 *
 * This function allows you to compile some typescript using the native tsc compiler
 *
 * @param       {ICompileTsParams}          params          A parameters object to configure your compilation
 * @return      {SPromise}                                  A promise that will be resolved once the compilation is finished
 *
 * @example             js
 * import compileTs from '@coffeekraken/sugar/node/typescript/compile/compileTs';
 * await compileTs({
 *
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn = function compileTs(params) {
    return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
        // check if we have a config passed
        console.log('params', params);
        if (params.config !== undefined) {
            // wrap the passed config in an SFile
        }
        // const files = await __findUp('tsconfig.json', {
        //   stopWhenFound: true
        // });
        // console.log('CC', files[0].readSync());
    }));
};
module.exports = fn;
