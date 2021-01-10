"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TscInterface_1 = __importDefault(require("../compile/interface/TscInterface"));
const buildCommandLine_1 = __importDefault(require("../../cli/buildCommandLine"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
/**
 * @name        tsconfigToCommandLine
 * @namespace   sugar.node.typescript.utils
 * @type        Function
 *
 * This function simply take a tsconfig file path and
 * transform it into a ```tsc``` command line arguments
 *
 * @param       {String}       tsconfigPath       Pass a tsconfig.json file path
 * @return      {String}                           The tsconfig command line equivalent
 *
 * @example       js
 * import tsconfigToCommandLine from '@coffeekraken/sugar/node/typescript/utils/tsconfigToCommandLine';
 * tsconfigToCommandLine({
 *    compilerOptions: {
 *      target: 'es6',
 *      module: 'commonjs'
 *    }
 * }); // => -t es6 -m commonjs
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function recursiveRequire(tsconfigPath, currentConfig = {}) {
    // check that the file exists
    if (fs_1.default.existsSync(tsconfigPath) !== true) {
        throw `Sorry but the passed tsconfig file path "<yellow>${tsconfigPath}</yellow>" does not exists...`;
    }
    // read the file
    let tsconfigJson = require(tsconfigPath);
    let extendsTsconfigConfigJson = {};
    // check if it extends another file
    if (tsconfigJson.extends !== undefined) {
        const extendsTsconfigPath = path_1.default.resolve(folderPath_1.default(tsconfigPath), tsconfigJson.extends);
        extendsTsconfigConfigJson = recursiveRequire(extendsTsconfigPath);
        tsconfigJson = deepMerge_1.default(extendsTsconfigConfigJson, tsconfigJson);
    }
    return tsconfigJson;
}
const fn = function (tsconfigPath) {
    const params = {};
    // load the file
    const config = recursiveRequire(tsconfigPath);
    // compilerOptions
    if (config.compilerOptions !== null) {
        Object.keys(config.compilerOptions).forEach((key) => {
            const value = config.compilerOptions[key];
            if (TscInterface_1.default.definition[key] === undefined)
                return;
            params[key] = value;
        });
    }
    const cli = buildCommandLine_1.default('[arguments]', params, {
        definition: TscInterface_1.default.definition
    });
    return cli;
};
module.exports = fn;
//# sourceMappingURL=tsconfigToCommandLine.js.map