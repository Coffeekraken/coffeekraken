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
    Object.defineProperty(exports, "__esModule", { value: true });
    var SConfig_1 = __importDefault(require("./SConfig"));
    var SConfigFolderAdapter_1 = __importDefault(require("./adapters/SConfigFolderAdapter"));
    var path_1 = __importDefault(require("path"));
    var packageRoot_1 = __importDefault(require("../path/packageRoot"));
    /**
     * @name                  sugar
     * @namespace           sugar.node.config
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
                        configAdapter: {
                            name: 'sugar'
                        },
                        configFolderAdapter: {
                            folderName: '.sugar',
                            fileName: '[name].config.js',
                            defaultConfigPath: path_1.default.resolve(__dirname, '../../config'),
                            appConfigPath: packageRoot_1.default(process.cwd()) + "/[foldername]",
                            userConfigPath: packageRoot_1.default(process.cwd()) + "/.local/[foldername]"
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
    exports.default = sugar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9jb25maWcvc3VnYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsc0RBQWtDO0lBQ2xDLHlGQUFxRTtJQUNyRSw4Q0FBMEI7SUFDMUIsb0VBQWdEO0lBR2hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxJQUFJLG1CQUFtQixDQUFDO0lBRXhCLFNBQVMsS0FBSyxDQUFDLE9BQU87UUFDcEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ3hCLG1CQUFtQixHQUFHLElBQUksaUJBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQzNDLFFBQVEsRUFBRTtvQkFDUixJQUFJLDhCQUFzQixDQUFDO3dCQUN6QixhQUFhLEVBQUU7NEJBQ2IsSUFBSSxFQUFFLE9BQU87eUJBQ2Q7d0JBQ0QsbUJBQW1CLEVBQUU7NEJBQ25CLFVBQVUsRUFBRSxRQUFROzRCQUNwQixRQUFRLEVBQUUsa0JBQWtCOzRCQUM1QixpQkFBaUIsRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUM7NEJBQzVELGFBQWEsRUFBSyxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBZTs0QkFDN0QsY0FBYyxFQUFLLHFCQUFhLENBQzlCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FDZCx5QkFBc0I7eUJBQ3hCO3FCQUNGLENBQUM7aUJBQ0g7YUFDRixDQUFDLENBQUM7U0FDSjtRQUNELGlCQUFpQjtRQUNqQixPQUFPLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO1lBQ2pELDJCQUEyQixFQUFFLEtBQUs7U0FDbkMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLEtBQUssQ0FBQyJ9