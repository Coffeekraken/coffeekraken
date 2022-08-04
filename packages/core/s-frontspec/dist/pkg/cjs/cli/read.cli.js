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
const SFrontspec_1 = __importDefault(require("../node/SFrontspec"));
const copy_1 = __importDefault(require("@coffeekraken/sugar/node/clipboard/copy"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const frontspec = new SFrontspec_1.default();
        const buildPromise = frontspec.read(stringArgs);
        const res = yield pipe(buildPromise);
        (0, copy_1.default)(JSON.stringify(res, null, 4));
        emit('log', {
            type: s_log_1.default.TYPE_INFO,
            value: '<green>[read]</green> frontspec.json copied to your clipboard',
        });
        resolve(res);
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCxvRUFBOEM7QUFDOUMsbUZBQTZEO0FBQzdELGdFQUF5QztBQUV6QyxrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxNQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFZLEVBQUUsQ0FBQztRQUNyQyxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLElBQUEsY0FBTSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7WUFDdEIsS0FBSyxFQUNELCtEQUErRDtTQUN0RSxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9