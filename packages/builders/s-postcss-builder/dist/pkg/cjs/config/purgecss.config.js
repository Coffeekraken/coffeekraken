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
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
const loadConfigFile_1 = __importDefault(require("@coffeekraken/sugar/node/config/loadConfigFile"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
function preprocess(api) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield (0, loadConfigFile_1.default)('purgecss.config.js'))) !== null && _a !== void 0 ? _a : {};
        return (0, deepMerge_1.default)(api.this, config);
    });
}
exports.preprocess = preprocess;
function default_1(api) {
    if (api.env.platform !== 'node')
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
        get content() {
            return [
                'index.html',
                `${api.config.storage.package.rootDir}/**/*.js`,
                `${api.config.storage.package.rootDir}/**/*.jsx`,
                `${api.config.storage.package.rootDir}/**/*.html`,
                `${api.config.storage.package.rootDir}/**/*.vue`,
                `${api.config.storage.package.rootDir}/**/*.riot`,
                `${api.config.storage.package.rootDir}/**/*.svelte`,
                `${api.config.storage.package.rootDir}/*/*.ladephp`,
                `${api.config.storage.package.rootDir}/*/*.wi`,
            ];
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9HQUE4RTtBQUM5RSw0RkFBc0U7QUFFdEUsU0FBc0IsVUFBVSxDQUFDLEdBQUc7OztRQUNoQyxNQUFNLE1BQU0sR0FBRyxNQUFBLENBQUMsTUFBTSxJQUFBLHdCQUFnQixFQUFDLG9CQUFvQixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ3BFLE9BQU8sSUFBQSxtQkFBVyxFQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7O0NBQ3hDO0FBSEQsZ0NBR0M7QUFFRCxtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxPQUFPO1lBQ1AsT0FBTztnQkFDSCxZQUFZO2dCQUNaLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sVUFBVTtnQkFDL0MsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxXQUFXO2dCQUNoRCxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFlBQVk7Z0JBQ2pELEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sV0FBVztnQkFDaEQsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxZQUFZO2dCQUNqRCxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLGNBQWM7Z0JBQ25ELEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sY0FBYztnQkFDbkQsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxTQUFTO2FBQ2pELENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUE1QkQsNEJBNEJDIn0=