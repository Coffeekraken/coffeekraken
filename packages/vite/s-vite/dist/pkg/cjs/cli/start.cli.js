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
const SVite_1 = __importDefault(require("../node/SVite"));
function start(stringArgs = '') {
    return new s_promise_1.default(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const vite = new SVite_1.default();
        const promise = vite.start(stringArgs);
        pipe(promise);
        resolve(yield promise);
    }));
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELDBEQUFvQztBQUVwQyxTQUF3QixLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDekMsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUksZUFBTyxFQUFFLENBQUM7UUFDM0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZCxPQUFPLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVBELHdCQU9DIn0=