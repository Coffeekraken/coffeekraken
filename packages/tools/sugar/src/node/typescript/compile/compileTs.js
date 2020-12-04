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
const SFile_1 = __importDefault(require("../../fs/SFile"));
const tmpDir_1 = __importDefault(require("../../fs/tmpDir"));
const md5_1 = __importDefault(require("../../crypt/md5"));
const SCliProcess_1 = __importDefault(require("../../process/SCliProcess"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const compileTsInterface_1 = __importDefault(require("./interface/compileTsInterface"));
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
const fn = function compileTs(params, settings) {
    return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmpDir_1.default();
        // check if we have a config passed
        if (params.config !== undefined) {
            // loop on each configs to generate the final ones
            params.config.forEach((configFile) => {
                // generate temp files pathes
                const tmpConfigFile = new SFile_1.default(`${tmpDir}/tsconfig.${md5_1.default.encrypt(configFile.path)}.json`);
                // read the file
                const configJson = configFile.readSync();
                // // check if the config has an "extends" prop
                // if (configJson.extends !== undefined) {
                //   // read this file
                //   const baseFilePath = __path.resolve(
                //     configFile.dirPath,
                //     configJson.extends
                //   );
                //   const baseConfigFile: __SFile = new __SFile(baseFilePath);
                //   const baseConfigJson = baseConfigFile.readSync();
                // }
                // extend using the passed "settings"
                const finalConfigJson = deepMerge_1.default(configJson, settings);
                // write the temp config file
                tmpConfigFile.writeSync(finalConfigJson);
                // instanciate a new process
                const pro = new SCliProcess_1.default('tsc [arguments]', {
                    definition: compileTsInterface_1.default.definition
                });
                pro.run(params);
            });
        }
        // const files = await __findUp('tsconfig.json', {
        //   stopWhenFound: true
        // });
        // console.log('CC', files[0].readSync());
    }));
};
module.exports = fn;
