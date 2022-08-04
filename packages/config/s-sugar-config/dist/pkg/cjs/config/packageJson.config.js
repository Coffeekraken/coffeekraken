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
exports.prepare = void 0;
const json_1 = __importDefault(require("@coffeekraken/sugar/node/package/json"));
function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, json_1.default)();
    });
}
exports.prepare = prepare;
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {};
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlGQUFrRTtBQUVsRSxTQUFzQixPQUFPOztRQUN6QixPQUFPLE1BQU0sSUFBQSxjQUFhLEdBQUUsQ0FBQztJQUNqQyxDQUFDO0NBQUE7QUFGRCwwQkFFQztBQUVELG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBSEQsNEJBR0MifQ==