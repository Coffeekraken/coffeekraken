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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlL2NvbmZpZy9zdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzREFBa0M7SUFDbEMseUZBQXFFO0lBQ3JFLDhDQUEwQjtJQUMxQixvRUFBZ0Q7SUFHaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILElBQUksbUJBQW1CLENBQUM7SUFFeEIsU0FBUyxLQUFLLENBQUMsT0FBTztRQUNwQixJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDeEIsbUJBQW1CLEdBQUcsSUFBSSxpQkFBUyxDQUFDLE9BQU8sRUFBRTtnQkFDM0MsUUFBUSxFQUFFO29CQUNSLElBQUksOEJBQXNCLENBQUM7d0JBQ3pCLGFBQWEsRUFBRTs0QkFDYixJQUFJLEVBQUUsT0FBTzt5QkFDZDt3QkFDRCxtQkFBbUIsRUFBRTs0QkFDbkIsVUFBVSxFQUFFLFFBQVE7NEJBQ3BCLFFBQVEsRUFBRSxrQkFBa0I7NEJBQzVCLGlCQUFpQixFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQzs0QkFDNUQsYUFBYSxFQUFLLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFlOzRCQUM3RCxjQUFjLEVBQUsscUJBQWEsQ0FDOUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUNkLHlCQUFzQjt5QkFDeEI7cUJBQ0YsQ0FBQztpQkFDSDthQUNGLENBQUMsQ0FBQztTQUNKO1FBQ0QsaUJBQWlCO1FBQ2pCLE9BQU8sbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7WUFDakQsMkJBQTJCLEVBQUUsS0FBSztTQUNuQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=