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
const SFaviconBuilderBuildParamsInterface_1 = __importDefault(require("../node/interface/SFaviconBuilderBuildParamsInterface"));
const SFaviconBuilder_1 = __importDefault(require("../node/SFaviconBuilder"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
function build(stringArgs = '') {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const builder = new SFaviconBuilder_1.default({
            interface: SFaviconBuilderBuildParamsInterface_1.default,
        });
        const promise = builder.build(stringArgs);
        pipe(promise);
        resolve(yield promise);
        process.exit();
    }));
}
exports.default = build;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0lBQTBHO0FBQzFHLDhFQUF3RDtBQUV4RCx3RUFBaUQ7QUFFakQsU0FBd0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQ3pDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELE1BQU0sT0FBTyxHQUFHLElBQUkseUJBQWlCLENBQUM7WUFDbEMsU0FBUyxFQUFFLDZDQUFxQztTQUNuRCxDQUFDLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNkLE9BQU8sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVZELHdCQVVDIn0=