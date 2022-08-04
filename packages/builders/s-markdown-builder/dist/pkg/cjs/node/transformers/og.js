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
const scrapeUrl_1 = __importDefault(require("@coffeekraken/sugar/node/og/scrapeUrl"));
function default_1(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const og = yield (0, scrapeUrl_1.default)(data[1]);
        return og !== null && og !== void 0 ? og : {};
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0ZBQWdFO0FBRWhFLG1CQUErQixJQUFJOztRQUMvQixNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxPQUFPLEVBQUUsYUFBRixFQUFFLGNBQUYsRUFBRSxHQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQUE7QUFIRCw0QkFHQyJ9