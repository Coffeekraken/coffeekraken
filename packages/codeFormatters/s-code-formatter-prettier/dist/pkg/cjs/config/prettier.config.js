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
        const config = (_a = (yield (0, loadConfigFile_1.default)([
            '.prettierrc',
            '.prettierrc.json',
            '.prettierrc.yml',
            '.prettierrc.yaml',
            '.prettierrc.js',
            'prettier.config.js',
        ]))) !== null && _a !== void 0 ? _a : {};
        return (0, deepMerge_1.default)(api.this, config);
    });
}
exports.preprocess = preprocess;
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {};
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9HQUE4RTtBQUM5RSw0RkFBc0U7QUFFdEUsU0FBc0IsVUFBVSxDQUFDLEdBQUc7OztRQUNoQyxNQUFNLE1BQU0sR0FDUixNQUFBLENBQUMsTUFBTSxJQUFBLHdCQUFnQixFQUFDO1lBQ3BCLGFBQWE7WUFDYixrQkFBa0I7WUFDbEIsaUJBQWlCO1lBQ2pCLGtCQUFrQjtZQUNsQixnQkFBZ0I7WUFDaEIsb0JBQW9CO1NBQ3ZCLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFDZCxPQUFPLElBQUEsbUJBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztDQUN4QztBQVhELGdDQVdDO0FBRUQsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFIRCw0QkFHQyJ9