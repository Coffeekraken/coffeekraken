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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/node/config/loadConfigFile", "@coffeekraken/sugar/shared/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.preprocess = void 0;
    const loadConfigFile_1 = __importDefault(require("@coffeekraken/sugar/node/config/loadConfigFile"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    function preprocess(env, rawPostcssConfig, rawConfig) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            return (0, deepMerge_1.default)(Object.assign({}, rawPostcssConfig), (_a = (yield (0, loadConfigFile_1.default)('postcss.config.js'))) !== null && _a !== void 0 ? _a : {}, (_b = (yield (0, loadConfigFile_1.default)('.postcssrc.json'))) !== null && _b !== void 0 ? _b : {});
        });
    }
    exports.preprocess = preprocess;
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
            /**
             * @name            plugins
             * @namespace       config.postcss
             * @type            String
             * @default         ['@coffeekraken/s-postcss-sugar-plugin','postcss-nested','postcss-atroot','postcss-extend-rule','postcss-property-lookup','autoprefixer']
             *
             * Specify the plugins to use with the postcss process
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            plugins: [
                '@coffeekraken/s-postcss-sugar-plugin',
                // 'postcss-easy-import',
                'postcss-import',
                'postcss-nested',
                'postcss-atroot',
                'postcss-extend-rule',
                'postcss-property-lookup',
                'autoprefixer',
            ],
            pluginsOptions: {},
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3N0Y3NzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxvR0FBOEU7SUFDOUUsNEZBQXNFO0lBRXRFLFNBQXNCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUzs7O1lBQzdELE9BQU8sSUFBQSxtQkFBVyxFQUNkLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGdCQUFnQixDQUFDLEVBQ25DLE1BQUEsQ0FBQyxNQUFNLElBQUEsd0JBQWdCLEVBQUMsbUJBQW1CLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLEVBQ25ELE1BQUEsQ0FBQyxNQUFNLElBQUEsd0JBQWdCLEVBQUMsaUJBQWlCLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQ3BELENBQUM7O0tBQ0w7SUFORCxnQ0FNQztJQUVELG1CQUF5QixHQUFHLEVBQUUsTUFBTTtRQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFFcEMsT0FBTztZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsc0NBQXNDO2dCQUN0Qyx5QkFBeUI7Z0JBQ3pCLGdCQUFnQjtnQkFDaEIsZ0JBQWdCO2dCQUNoQixnQkFBZ0I7Z0JBQ2hCLHFCQUFxQjtnQkFDckIseUJBQXlCO2dCQUN6QixjQUFjO2FBQ2pCO1lBQ0QsY0FBYyxFQUFFLEVBQUU7U0FDckIsQ0FBQztJQUNOLENBQUM7SUEzQkQsNEJBMkJDIn0=