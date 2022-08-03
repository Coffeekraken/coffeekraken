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
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
function view(express, settings, config) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const menu = docmapJson.menu;
        // register handler
        config.handlers.view = {
            path: `${(0, dirname_1.default)()}/viewHandler`
        };
        // @ts-ignore
        config.routes[(_a = settings.slug) !== null && _a !== void 0 ? _a : '/view/*'] = {
            handler: 'view',
        };
        return true;
    });
}
exports.default = view;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBRS9DLGtGQUE0RDtBQUU1RCxTQUE4QixJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNOzs7UUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUU3QixtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUc7WUFDbkIsSUFBSSxFQUFFLEdBQUcsSUFBQSxpQkFBUyxHQUFFLGNBQWM7U0FDckMsQ0FBQztRQUVGLGFBQWE7UUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksU0FBUyxDQUFDLEdBQUc7WUFDeEMsT0FBTyxFQUFFLE1BQU07U0FDbEIsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDOztDQUNmO0FBaEJELHVCQWdCQyJ9