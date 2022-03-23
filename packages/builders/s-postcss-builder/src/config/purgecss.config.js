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
    function preprocess(env, rawPurgecssConfig, rawConfig) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const config = (_a = (yield (0, loadConfigFile_1.default)('purgecss.config.js'))) !== null && _a !== void 0 ? _a : {};
            return (0, deepMerge_1.default)(rawPurgecssConfig, config);
        });
    }
    exports.preprocess = preprocess;
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
            /**
             * @name            content
             * @namespace       config.purgecss
             * @type            String[]
             * @default         ['index.html','[config.storage.src.rootDir]/ ** / *.js','[config.storage.src.rootDir]/ ** / *.jsx','[config.storage.src.rootDir]/ ** / *.html','[config.storage.src.rootDir]/ ** / *.vue','[config.storage.src.rootDir]/ ** / *.riot','[config.storage.src.rootDir]/ ** / *.svelte','[config.storage.src.rootDir]/ ** / *.blade.php','[config.storage.src.rootDir]/ ** / *.twig']
             *
             * Specify the content files to take in consideration to purge your css
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            content: [
                'index.html',
                '[config.storage.src.rootDir]/ ** / *.js',
                '[config.storage.src.rootDir]/ ** / *.jsx',
                '[config.storage.src.rootDir]/ ** / *.html',
                '[config.storage.src.rootDir]/ ** / *.vue',
                '[config.storage.src.rootDir]/ ** / *.riot',
                '[config.storage.src.rootDir]/ ** / *.svelte',
                '[config.storage.src.rootDir]/**/*.blade.php',
                '[config.storage.src.rootDir]/**/*.twig',
            ],
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2Vjc3MuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHVyZ2Vjc3MuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLG9HQUE4RTtJQUM5RSw0RkFBc0U7SUFFdEUsU0FBc0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxTQUFTOzs7WUFDOUQsTUFBTSxNQUFNLEdBQUcsTUFBQSxDQUFDLE1BQU0sSUFBQSx3QkFBZ0IsRUFBQyxvQkFBb0IsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztZQUNwRSxPQUFPLElBQUEsbUJBQVcsRUFBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7S0FDakQ7SUFIRCxnQ0FHQztJQUVELG1CQUF5QixHQUFHLEVBQUUsTUFBTTtRQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFDcEMsT0FBTztZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWix5Q0FBeUM7Z0JBQ3pDLDBDQUEwQztnQkFDMUMsMkNBQTJDO2dCQUMzQywwQ0FBMEM7Z0JBQzFDLDJDQUEyQztnQkFDM0MsNkNBQTZDO2dCQUM3Qyw2Q0FBNkM7Z0JBQzdDLHdDQUF3QzthQUMzQztTQUNKLENBQUM7SUFDTixDQUFDO0lBMUJELDRCQTBCQyJ9