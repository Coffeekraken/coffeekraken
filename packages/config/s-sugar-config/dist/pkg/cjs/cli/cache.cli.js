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
// @ts-nocheck
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SCliConfigCacheParamsInterface_1 = __importDefault(require("./interface/SCliConfigCacheParamsInterface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = SCliConfigCacheParamsInterface_1.default.apply(stringArgs);
        const config = yield s_sugar_config_1.default.load(finalParams.id);
        const filePath = yield config.instance.cache();
        // __fs.mkdirSync(finalParams.cacheDir, { recursive: true });
        // __fs.writeFileSync(
        //     `${finalParams.cacheDir}/${finalParams.id}.json`,
        //     JSON.stringify(config.instance.toJson(), null, 4),
        // );
        emit('log', {
            value: `<green>[cache]</green> The "<yellow>${finalParams.id}</yellow>" config has been cached <green>successfully</green> under <cyan>${filePath}</cyan>`,
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLHdFQUFpRDtBQUNqRCxnSEFBMEY7QUFHMUYsa0ZBQTBEO0FBRTFELGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELE1BQU0sV0FBVyxHQUFHLHdDQUFnQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV2RSxNQUFNLE1BQU0sR0FBRyxNQUFNLHdCQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV6RCxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFL0MsNkRBQTZEO1FBQzdELHNCQUFzQjtRQUN0Qix3REFBd0Q7UUFDeEQseURBQXlEO1FBQ3pELEtBQUs7UUFFTCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLHVDQUF1QyxXQUFXLENBQUMsRUFBRSw2RUFBNkUsUUFBUSxTQUFTO1NBQzdKLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9