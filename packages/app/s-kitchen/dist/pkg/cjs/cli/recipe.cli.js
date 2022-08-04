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
exports.sugarCliSettings = void 0;
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_stdio_1 = __importDefault(require("@coffeekraken/s-stdio"));
const SKitchen_1 = __importDefault(require("../node/SKitchen"));
exports.sugarCliSettings = {
    stdio: s_stdio_1.default.UI_TERMINAL,
};
function recipe(stringArgs = '') {
    return new s_promise_1.default(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const kitchen = new SKitchen_1.default();
        const promise = kitchen.recipe(stringArgs);
        pipe(promise);
        yield promise;
        resolve(promise);
    }));
}
exports.default = recipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxvRUFBNkM7QUFDN0MsZ0VBQTBDO0FBRTdCLFFBQUEsZ0JBQWdCLEdBQUc7SUFDNUIsS0FBSyxFQUFFLGlCQUFRLENBQUMsV0FBVztDQUM5QixDQUFDO0FBRUYsU0FBd0IsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzFDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM5QyxNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFVLEVBQUUsQ0FBQztRQUNqQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNkLE1BQU0sT0FBTyxDQUFDO1FBQ2QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBUkQseUJBUUMifQ==