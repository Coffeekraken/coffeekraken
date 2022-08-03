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
const SDocMap_1 = __importDefault(require("../node/SDocMap"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const copy_1 = __importDefault(require("@coffeekraken/sugar/node/clipboard/copy"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, pipe, emit }) => __awaiter(void 0, void 0, void 0, function* () {
        const docmap = new SDocMap_1.default();
        const promise = docmap.read(stringArgs);
        pipe(promise);
        const res = yield promise;
        (0, copy_1.default)(JSON.stringify(res, null, 4));
        emit('log', {
            type: s_log_1.default.TYPE_INFO,
            value: '<green>[read]</green> docmap.json copied to your clipboard',
        });
        resolve(res);
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLDhEQUF3QztBQUV4Qyx3RUFBaUQ7QUFDakQsbUZBQTZEO0FBQzdELGdFQUF5QztBQUV6QyxrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3BELE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2QsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUM7UUFDMUIsSUFBQSxjQUFNLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUztZQUN0QixLQUFLLEVBQUUsNERBQTREO1NBQ3RFLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=