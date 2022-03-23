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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-log", "@coffeekraken/s-promise", "../../node/add/interface/SCliAddSugarJsonParamsInterface", "@coffeekraken/sugar/node/fs/writeJsonSync", "@coffeekraken/sugar/node/fs/readJsonSync", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJKc29uLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1Z2FySnNvbi5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxjQUFjO0lBQ2QsZ0VBQXlDO0lBQ3pDLHdFQUFpRDtJQUNqRCwrSEFBeUc7SUFDekcsOEZBQXdFO0lBQ3hFLDRGQUFzRTtJQUN0RSw0Q0FBc0I7SUFFdEIsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDL0IsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFFLEVBQUU7WUFDMUQsTUFBTSxXQUFXLEdBQUcseUNBQWlDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhFLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsaUZBQWlGLFdBQVcsQ0FBQyxNQUFNLFNBQVM7YUFDdEgsQ0FBQyxDQUFDO1lBRUgsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsRUFBRTtnQkFDaEQsTUFBTSxJQUFJLEdBQUcsSUFBQSxzQkFBYyxFQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO2dCQUNqQyxJQUFBLHVCQUFlLEVBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN4RDtpQkFBTTtnQkFDSCxJQUFBLHVCQUFlLEVBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRTtvQkFDM0MsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO2lCQUM3QixDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyJ9