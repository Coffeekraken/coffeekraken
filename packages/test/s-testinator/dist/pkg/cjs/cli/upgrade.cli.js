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
const SCliMonoListParamsInterface_1 = __importDefault(require("../node/interface/SCliMonoListParamsInterface"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const fs_1 = __importDefault(require("fs"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = SCliMonoListParamsInterface_1.default.apply(stringArgs);
        const root = (0, packageRoot_1.default)(process.cwd(), {
            highest: true,
        });
        const rootPackageJson = (0, readJsonSync_1.default)(`${root}/package.json`);
        const files = s_glob_1.default.resolve(finalParams.packagesGlobs, {
            cwd: root,
        });
        emit('log', {
            value: `Upgrading <cyan>${files.length}</cyan> packages with these informations:`,
        });
        emit('log', {
            marginBottom: 1,
            value: [
                `- <yellow>Version</yellow>: <cyan>${rootPackageJson.version}</cyan>`,
            ].join('\n'),
        });
        files.forEach((file) => {
            finalParams.filesToUpgrade.forEach((fileName) => {
                if (!fileName.match(/\.json$/)) {
                    throw new Error(`Only json files are supported for the upgrade process for now...`);
                }
                const filePath = `${file.dirPath}/${fileName}`;
                if (!fs_1.default.existsSync(filePath))
                    return;
                const json = (0, readJsonSync_1.default)(filePath);
                if (json.version === rootPackageJson.version) {
                    emit('log', {
                        value: `<yellow>${json.name}</yellow> <cyan>${fileName}</cyan> already up to date`,
                    });
                    return;
                }
                json.version = rootPackageJson.version;
                (0, writeJsonSync_1.default)(filePath, json);
                emit('log', {
                    value: `<green>✓</green> <yellow>${json.name}</yellow> <cyan>${fileName}</cyan> upgraded <green>successfully</green>`,
                });
            });
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLHdFQUFpRDtBQUNqRCxnSEFBMEY7QUFDMUYsa0VBQTJDO0FBQzNDLDRGQUFzRTtBQUN0RSw0RkFBc0U7QUFDdEUsOEZBQXdFO0FBQ3hFLDRDQUFzQjtBQUV0QixrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxNQUFNLFdBQVcsR0FBRyxxQ0FBNkIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFcEUsTUFBTSxJQUFJLEdBQUcsSUFBQSxxQkFBYSxFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0QyxPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUM7UUFFSCxNQUFNLGVBQWUsR0FBRyxJQUFBLHNCQUFjLEVBQUMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxDQUFDO1FBRS9ELE1BQU0sS0FBSyxHQUFHLGdCQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUU7WUFDckQsR0FBRyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLG1CQUFtQixLQUFLLENBQUMsTUFBTSwyQ0FBMkM7U0FDcEYsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLFlBQVksRUFBRSxDQUFDO1lBQ2YsS0FBSyxFQUFFO2dCQUNILHFDQUFxQyxlQUFlLENBQUMsT0FBTyxTQUFTO2FBQ3hFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNmLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNuQixXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FDWCxrRUFBa0UsQ0FDckUsQ0FBQztpQkFDTDtnQkFDRCxNQUFNLFFBQVEsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztvQkFBRSxPQUFPO2dCQUN2QyxNQUFNLElBQUksR0FBRyxJQUFBLHNCQUFjLEVBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxlQUFlLENBQUMsT0FBTyxFQUFFO29CQUMxQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLEtBQUssRUFBRSxXQUFXLElBQUksQ0FBQyxJQUFJLG1CQUFtQixRQUFRLDRCQUE0QjtxQkFDckYsQ0FBQyxDQUFDO29CQUNILE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO2dCQUN2QyxJQUFBLHVCQUFlLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw0QkFBNEIsSUFBSSxDQUFDLElBQUksbUJBQW1CLFFBQVEsOENBQThDO2lCQUN4SCxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=