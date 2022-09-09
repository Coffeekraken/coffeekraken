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
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = SCliAddSugarJsonParamsInterface_1.default.apply(stringArgs);
        emit('log', {
            type: s_log_1.default.TYPE_INFO,
            value: `<yellow>[sugarJson]</yellow> Adding the sugar.json file with the recipe <cyan>${finalParams.recipe}</cyan>`,
        });
        if (fs_2.default.existsSync(`${process.cwd()}/sugar.json`)) {
            const json = (0, fs_1.__readJsonSync)(`${process.cwd()}/sugar.json`);
            json.recipe = finalParams.recipe;
            (0, fs_1.__writeJsonSync)(`${process.cwd()}/sugar.json`, json);
        }
        else {
            (0, fs_1.__writeJsonSync)(`${process.cwd()}/sugar.json`, {
                recipe: finalParams.recipe,
            });
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsK0hBQXlHO0FBQ3pHLCtDQUF5RTtBQUN6RSw0Q0FBc0I7QUFFdEIsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxXQUFXLEdBQUcseUNBQWlDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7WUFDdEIsS0FBSyxFQUFFLGlGQUFpRixXQUFXLENBQUMsTUFBTSxTQUFTO1NBQ3RILENBQUMsQ0FBQztRQUVILElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEVBQUU7WUFDaEQsTUFBTSxJQUFJLEdBQUcsSUFBQSxtQkFBYyxFQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDakMsSUFBQSxvQkFBZSxFQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNILElBQUEsb0JBQWUsRUFBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFO2dCQUMzQyxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07YUFDN0IsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==