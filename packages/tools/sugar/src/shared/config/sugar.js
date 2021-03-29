var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-config", "../is/node", "../path/packageRoot"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_config_1 = __importDefault(require("@coffeekraken/s-config"));
    const node_1 = __importDefault(require("../is/node"));
    const packageRoot_1 = __importDefault(require("../path/packageRoot"));
    /**
     * @name                  sugar
     * @namespace           sugar.shared.config
     * @type                  Function
     * @status              beta
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
     * import sugar from '@coffeekraken/sugar/shared/config/sugar';
     * sugar('scss.unit'); // => rem
     *
     * @since           2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    let sugarConfigInstance;
    function sugar(dotPath) {
        if (node_1.default()) {
            if (!sugarConfigInstance) {
                const __path = require('path'); // eslint-disable-line
                const { SConfigFolderAdapter } = require('@coffeekraken/s-config'); // eslint-disable-line
                sugarConfigInstance = new s_config_1.default('sugar', {
                    adapters: [
                        new SConfigFolderAdapter({
                            configAdapter: {
                                name: 'sugar'
                            },
                            configFolderAdapter: {
                                folderName: '.sugar',
                                fileName: '[name].config.js',
                                defaultConfigPath: __path.resolve(__dirname, '../../config'),
                                appConfigPath: `${packageRoot_1.default(process.cwd())}/[foldername]`,
                                userConfigPath: `${packageRoot_1.default(process.cwd())}/.local/[foldername]`
                            }
                        })
                    ]
                });
            }
            // get the config
            return sugarConfigInstance.get(dotPath, undefined, {
                throwErrorOnUndefinedConfig: false
            });
        }
    }
    exports.default = sugar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLHNFQUErQztJQUMvQyxzREFBa0M7SUFDbEMsc0VBQWdEO0lBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxJQUFJLG1CQUFtQixDQUFDO0lBQ3hCLFNBQXdCLEtBQUssQ0FBQyxPQUFPO1FBQ25DLElBQUksY0FBUSxFQUFFLEVBQUU7WUFDZCxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ3hCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtnQkFDdEQsTUFBTSxFQUFFLG9CQUFvQixFQUFFLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxzQkFBc0I7Z0JBQzFGLG1CQUFtQixHQUFHLElBQUksa0JBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQzNDLFFBQVEsRUFBRTt3QkFDUixJQUFJLG9CQUFvQixDQUFDOzRCQUN2QixhQUFhLEVBQUU7Z0NBQ2IsSUFBSSxFQUFFLE9BQU87NkJBQ2Q7NEJBQ0QsbUJBQW1CLEVBQUU7Z0NBQ25CLFVBQVUsRUFBRSxRQUFRO2dDQUNwQixRQUFRLEVBQUUsa0JBQWtCO2dDQUM1QixpQkFBaUIsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUM7Z0NBQzVELGFBQWEsRUFBRSxHQUFHLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWU7Z0NBQzdELGNBQWMsRUFBRSxHQUFHLHFCQUFhLENBQzlCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FDZCxzQkFBc0I7NkJBQ3hCO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxpQkFBaUI7WUFDakIsT0FBTyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtnQkFDakQsMkJBQTJCLEVBQUUsS0FBSzthQUNuQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUE3QkQsd0JBNkJDIn0=