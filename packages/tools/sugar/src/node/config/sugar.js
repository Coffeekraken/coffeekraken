"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SConfig_1 = __importDefault(require("./SConfig"));
const SConfigFolderAdapter_1 = __importDefault(require("./adapters/SConfigFolderAdapter"));
const path_1 = __importDefault(require("path"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
/**
 * @name                  sugar
 * @namespace           sugar.node.config
 * @type                  Function
 * @beta
 *
 * This function allows you to access easily the configurations stored in the ```sugar.config.js```.
 * The returned configuration is the result of the default sugar config stored in the toolkit and the
 * app defined config stored in current application root folder
 *
 * @param         {String}        dotPath         The dot path to the config wanted
 * @return        {Mixed}                         Return the value if exists, undefined if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Enhancement}       Find a way to specify the "userConfigPath" dynamically without having circular dependencies
 *
 * @example             js
 * import sugar from '@coffeekraken/sugar/node/config/sugar';
 * sugar('scss.unit'); // => rem
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let sugarConfigInstance;
function sugar(dotPath) {
    if (!sugarConfigInstance) {
        sugarConfigInstance = new SConfig_1.default('sugar', {
            adapters: [
                new SConfigFolderAdapter_1.default({
                    name: 'sugar',
                    foldername: '.sugar',
                    filename: '[name].config.js',
                    defaultConfigPath: path_1.default.resolve(__dirname, '../../../.sugar-default'),
                    appConfigPath: `${packageRoot_1.default(process.cwd())}/[foldername]`,
                    userConfigPath: `${packageRoot_1.default(process.cwd())}/.local/[foldername]`
                })
            ]
        });
    }
    // get the config
    return sugarConfigInstance.get(dotPath, undefined, {
        throwErrorOnUndefinedConfig: false
    });
}
module.exports = sugar;
//# sourceMappingURL=module.js.map