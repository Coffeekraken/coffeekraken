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
const SStaticBuilder_1 = __importDefault(require("../node/SStaticBuilder"));
const SStaticBuilderBuildParamsInterface_1 = __importDefault(require("../node/interface/SStaticBuilderBuildParamsInterface"));
function build(stringArgs = '') {
    return new s_promise_1.default(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const builder = new SStaticBuilder_1.default({
            interface: SStaticBuilderBuildParamsInterface_1.default,
        });
        yield pipe(builder.build(stringArgs));
        resolve();
        process.exit();
    }));
}
exports.default = build;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELDRFQUFzRDtBQUN0RCw4SEFBd0c7QUFFeEcsU0FBd0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQ3pDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEQsTUFBTSxPQUFPLEdBQUcsSUFBSSx3QkFBZ0IsQ0FBQztZQUNqQyxTQUFTLEVBQUUsNENBQW9DO1NBQ2xELENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0QyxPQUFPLEVBQUUsQ0FBQztRQUNWLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVRELHdCQVNDIn0=