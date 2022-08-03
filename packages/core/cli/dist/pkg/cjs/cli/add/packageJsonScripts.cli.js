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
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const jsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/package/jsonSync"));
const fs_1 = __importDefault(require("fs"));
const SCliAddManifestJsonParamsInterface_1 = __importDefault(require("../../node/add/interface/SCliAddManifestJsonParamsInterface"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
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
            const json = (0, readJsonSync_1.default)(`${(0, packageRoot_1.default)((0, dirname_1.default)())}/src/cli/add/data/manifest.json`);
            json.short_name = packageJson.name;
            json.name = packageJson.description;
            (0, writeJsonSync_1.default)(`${process.cwd()}/manifest.json`, json);
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsa0ZBQTREO0FBQzVELDRGQUFzRTtBQUN0RSw4RkFBd0U7QUFDeEUseUZBQXNFO0FBQ3RFLDRDQUFzQjtBQUN0QixxSUFBK0c7QUFDL0csNEZBQXNFO0FBRXRFLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELE1BQU0sV0FBVyxHQUFHLDRDQUFvQyxDQUFDLEtBQUssQ0FDMUQsVUFBVSxDQUNiLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO1lBQ3RCLEtBQUssRUFBRSwrREFBK0Q7U0FDekUsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsSUFBQSxrQkFBYSxHQUFFLENBQUM7UUFFcEMsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ25ELE1BQU0sSUFBSSxHQUFHLElBQUEsc0JBQWMsRUFBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQ3BDLElBQUEsdUJBQWUsRUFBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0Q7YUFBTTtZQUNILE1BQU0sSUFBSSxHQUFHLElBQUEsc0JBQWMsRUFDdkIsR0FBRyxJQUFBLHFCQUFhLEVBQUMsSUFBQSxpQkFBUyxHQUFFLENBQUMsaUNBQWlDLENBQ2pFLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQ3BDLElBQUEsdUJBQWUsRUFBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0Q7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==