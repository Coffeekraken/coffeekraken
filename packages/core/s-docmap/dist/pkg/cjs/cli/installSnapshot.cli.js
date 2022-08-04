"use strict";
// @ts-nocheck
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
const SDocmap_1 = __importDefault(require("../node/SDocmap"));
exports.default = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    return new s_promise_1.default(({ resolve, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const docmap = new SDocmap_1.default();
        const promise = docmap.installSnapshot(stringArgs);
        pipe(promise);
        resolve(yield promise);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCw4REFBd0M7QUFFeEMsa0JBQWUsQ0FBTyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDckMsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2QsT0FBTyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDIn0=