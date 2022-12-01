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
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
const load_1 = require("@coffeekraken/sugar/load");
const object_1 = require("@coffeekraken/sugar/object");
function preprocess(api) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield (0, load_1.__loadConfigFile)([
            '.prettierrc',
            '.prettierrc.json',
            '.prettierrc.yml',
            '.prettierrc.yaml',
            '.prettierrc.js',
            'prettier.config.js',
        ]))) !== null && _a !== void 0 ? _a : {};
        return (0, object_1.__deepMerge)(api.this, config);
    });
}
exports.preprocess = preprocess;
function default_1(api) {
    var _a;
    if (api.env.platform !== 'node')
        return;
    return (0, object_1.__deepMerge)({
        singleQuote: true,
        plugins: ['prettier-plugin-sh'],
    }, (_a = api.config.prettier) !== null && _a !== void 0 ? _a : {});
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE0RDtBQUM1RCx1REFBeUQ7QUFFekQsU0FBc0IsVUFBVSxDQUFDLEdBQUc7OztRQUNoQyxNQUFNLE1BQU0sR0FDUixNQUFBLENBQUMsTUFBTSxJQUFBLHVCQUFnQixFQUFDO1lBQ3BCLGFBQWE7WUFDYixrQkFBa0I7WUFDbEIsaUJBQWlCO1lBQ2pCLGtCQUFrQjtZQUNsQixnQkFBZ0I7WUFDaEIsb0JBQW9CO1NBQ3ZCLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFDZCxPQUFPLElBQUEsb0JBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztDQUN4QztBQVhELGdDQVdDO0FBRUQsbUJBQXlCLEdBQUc7O0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTyxJQUFBLG9CQUFXLEVBQ2Q7UUFDSSxXQUFXLEVBQUUsSUFBSTtRQUNqQixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztLQUNsQyxFQUNELE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FDNUIsQ0FBQztBQUNOLENBQUM7QUFURCw0QkFTQyJ9