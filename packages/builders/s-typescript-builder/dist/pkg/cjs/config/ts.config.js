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
        const config = (_a = (yield (0, loadConfigFile_1.default)('tsconfig.json'))) !== null && _a !== void 0 ? _a : {};
        return (0, deepMerge_1.default)(api.this, config);
    });
}
exports.preprocess = preprocess;
function default_1(api) {
    if (api.env.platform !== 'node')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9HQUE4RTtBQUM5RSw0RkFBc0U7QUFFdEUsU0FBc0IsVUFBVSxDQUFDLEdBQUc7OztRQUNoQyxNQUFNLE1BQU0sR0FBRyxNQUFBLENBQUMsTUFBTSxJQUFBLHdCQUFnQixFQUFDLGVBQWUsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUMvRCxPQUFPLElBQUEsbUJBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztDQUN4QztBQUhELGdDQUdDO0FBRUQsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0gsZUFBZSxFQUFFO1lBQ2IsV0FBVyxFQUFFLEtBQUs7WUFDbEIsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsSUFBSTtZQUNaLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsZ0NBQWdDLEVBQUUsS0FBSztZQUN2QyxhQUFhLEVBQUUsS0FBSztZQUNwQixxQkFBcUIsRUFBRSxLQUFLO1lBQzVCLDRCQUE0QixFQUFFLEtBQUs7U0FDdEM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQXBCRCw0QkFvQkMifQ==