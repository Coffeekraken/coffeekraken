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
function preprocess(env, rawViteConfig, rawConfig) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield (0, loadConfigFile_1.default)('tsconfig.json'))) !== null && _a !== void 0 ? _a : {};
        return (0, deepMerge_1.default)(rawViteConfig, config);
    });
}
exports.preprocess = preprocess;
function default_1(env, config) {
    if (env.platform !== 'node')
        return;
    return {
        compilerOptions: {
            incremental: false,
            allowJs: true,
            strict: true,
            inlineSourceMap: true,
            traceResolution: false,
            esModuleInterop: true,
            skipLibCheck: true,
            declaration: true,
            experimentalDecorators: true,
            forceConsistentCasingInFileNames: false,
            noImplicitAny: false,
            noStrictGenericChecks: false,
            allowSyntheticDefaultImports: false,
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9HQUE4RTtBQUM5RSw0RkFBc0U7QUFFdEUsU0FBc0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsU0FBUzs7O1FBQzFELE1BQU0sTUFBTSxHQUFHLE1BQUEsQ0FBQyxNQUFNLElBQUEsd0JBQWdCLEVBQUMsZUFBZSxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQy9ELE9BQU8sSUFBQSxtQkFBVyxFQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQzs7Q0FDN0M7QUFIRCxnQ0FHQztBQUVELG1CQUF5QixHQUFHLEVBQUUsTUFBTTtJQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNILGVBQWUsRUFBRTtZQUNiLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFFLElBQUk7WUFDWixlQUFlLEVBQUUsSUFBSTtZQUNyQixlQUFlLEVBQUUsS0FBSztZQUN0QixlQUFlLEVBQUUsSUFBSTtZQUNyQixZQUFZLEVBQUUsSUFBSTtZQUNsQixXQUFXLEVBQUUsSUFBSTtZQUNqQixzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLGdDQUFnQyxFQUFFLEtBQUs7WUFDdkMsYUFBYSxFQUFFLEtBQUs7WUFDcEIscUJBQXFCLEVBQUUsS0FBSztZQUM1Qiw0QkFBNEIsRUFBRSxLQUFLO1NBQ3RDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFwQkQsNEJBb0JDIn0=