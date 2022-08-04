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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SCliAddSugarJsonParamsInterface_1 = __importDefault(require("../../node/add/interface/SCliAddSugarJsonParamsInterface"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const fs_1 = __importDefault(require("fs"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = SCliAddSugarJsonParamsInterface_1.default.apply(stringArgs);
        emit('log', {
            type: s_log_1.default.TYPE_INFO,
            value: `<yellow>[sugarJson]</yellow> Adding the sugar.json file with the recipe <cyan>${finalParams.recipe}</cyan>`,
        });
        if (fs_1.default.existsSync(`${process.cwd()}/sugar.json`)) {
            const json = (0, readJsonSync_1.default)(`${process.cwd()}/sugar.json`);
            json.recipe = finalParams.recipe;
            (0, writeJsonSync_1.default)(`${process.cwd()}/sugar.json`, json);
        }
        else {
            (0, writeJsonSync_1.default)(`${process.cwd()}/sugar.json`, {
                recipe: finalParams.recipe
            });
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsK0hBQXlHO0FBQ3pHLDhGQUF3RTtBQUN4RSw0RkFBc0U7QUFDdEUsNENBQXNCO0FBRXRCLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRSxFQUFFO1FBQzFELE1BQU0sV0FBVyxHQUFHLHlDQUFpQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO1lBQ3RCLEtBQUssRUFBRSxpRkFBaUYsV0FBVyxDQUFDLE1BQU0sU0FBUztTQUN0SCxDQUFDLENBQUM7UUFFSCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxFQUFFO1lBQ2hELE1BQU0sSUFBSSxHQUFHLElBQUEsc0JBQWMsRUFBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ2pDLElBQUEsdUJBQWUsRUFBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDSCxJQUFBLHVCQUFlLEVBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRTtnQkFDM0MsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO2FBQzdCLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=