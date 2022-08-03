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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SCodeFormatter_1 = __importDefault(require("../node/SCodeFormatter"));
function format(stringArgs = '') {
    return new s_promise_1.default(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const formatter = new SCodeFormatter_1.default();
        const formatPromise = formatter.format(stringArgs);
        pipe(formatPromise);
        resolve(yield formatPromise);
        process.exit();
    }));
}
exports.default = format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELDRFQUFzRDtBQUV0RCxTQUF3QixNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDMUMsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzlDLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQWdCLEVBQUUsQ0FBQztRQUN6QyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsTUFBTSxhQUFhLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFSRCx5QkFRQyJ9