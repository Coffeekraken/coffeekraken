// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SConfig", "./adapters/SConfigFolderAdapter", "path", "../path/packageRoot"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SConfig_1 = __importDefault(require("./SConfig"));
    var SConfigFolderAdapter_1 = __importDefault(require("./adapters/SConfigFolderAdapter"));
    var path_1 = __importDefault(require("path"));
    var packageRoot_1 = __importDefault(require("../path/packageRoot"));
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
     *
     * @example             js
     * import sugar from '@coffeekraken/sugar/node/config/sugar';
     * sugar('scss.unit'); // => rem
     *
     * @since           2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var sugarConfigInstance;
    function sugar(dotPath) {
        if (!sugarConfigInstance) {
            sugarConfigInstance = new SConfig_1.default('sugar', {
                adapters: [
                    new SConfigFolderAdapter_1.default({
                        name: 'sugar',
                        foldername: '.sugar',
                        filename: '[name].config.js',
                        defaultConfigPath: path_1.default.resolve(__dirname, '../../../.sugar-default'),
                        appConfigPath: packageRoot_1.default(process.cwd()) + "/[foldername]",
                        userConfigPath: null
                    })
                ]
            });
        }
        // get the config
        return sugarConfigInstance.get(dotPath, undefined, {
            throwErrorOnUndefinedConfig: false
        });
    }
    return sugar;
});
