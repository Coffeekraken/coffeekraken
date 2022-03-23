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
        define(["require", "exports", "@coffeekraken/s-log", "@coffeekraken/s-promise", "@coffeekraken/sugar/node/fs/dirname", "@coffeekraken/sugar/node/fs/readJsonSync", "@coffeekraken/sugar/node/fs/writeJsonSync", "@coffeekraken/sugar/node/package/jsonSync", "fs", "../../node/add/interface/SCliAddManifestJsonParamsInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // @ts-nocheck
    const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
    const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
    const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
    const jsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/package/jsonSync"));
    const fs_1 = __importDefault(require("fs"));
    const SCliAddManifestJsonParamsInterface_1 = __importDefault(require("../../node/add/interface/SCliAddManifestJsonParamsInterface"));
    exports.default = (stringArgs = '') => {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
            const finalParams = SCliAddManifestJsonParamsInterface_1.default.apply(stringArgs);
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[manifestJson]</yellow> Adding the manifest.json file`,
            });
            const packageJson = (0, jsonSync_1.default)();
            if (fs_1.default.existsSync(`${process.cwd()}/manifest.json`)) {
                const json = (0, readJsonSync_1.default)(`${process.cwd()}/manifest.json`);
                json.short_name = packageJson.name;
                json.name = packageJson.description;
                (0, writeJsonSync_1.default)(`${process.cwd()}/manifest.json`, json);
            }
            else {
                const json = (0, readJsonSync_1.default)(`${(0, dirname_1.default)()}/data/manifest.json`);
                json.short_name = packageJson.name;
                json.name = packageJson.description;
                (0, writeJsonSync_1.default)(`${process.cwd()}/manifest.json`, json);
            }
            resolve();
        }));
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuaWZlc3RKc29uLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hbmlmZXN0SnNvbi5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxjQUFjO0lBQ2QsZ0VBQXlDO0lBQ3pDLHdFQUFpRDtJQUNqRCxrRkFBNEQ7SUFDNUQsNEZBQXNFO0lBQ3RFLDhGQUF3RTtJQUN4RSx5RkFBc0U7SUFDdEUsNENBQXNCO0lBQ3RCLHFJQUErRztJQUUvRyxrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUMvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBRTtZQUMxRCxNQUFNLFdBQVcsR0FBRyw0Q0FBb0MsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFM0UsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSwrREFBK0Q7YUFDekUsQ0FBQyxDQUFDO1lBRUgsTUFBTSxXQUFXLEdBQUcsSUFBQSxrQkFBYSxHQUFFLENBQUM7WUFFcEMsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUNuRCxNQUFNLElBQUksR0FBRyxJQUFBLHNCQUFjLEVBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQzlELElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQTtnQkFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUNwQyxJQUFBLHVCQUFlLEVBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNEO2lCQUFNO2dCQUNILE1BQU0sSUFBSSxHQUFHLElBQUEsc0JBQWMsRUFBQyxHQUFHLElBQUEsaUJBQVMsR0FBRSxxQkFBcUIsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUE7Z0JBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztnQkFDcEMsSUFBQSx1QkFBZSxFQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMzRDtZQUVELE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyJ9