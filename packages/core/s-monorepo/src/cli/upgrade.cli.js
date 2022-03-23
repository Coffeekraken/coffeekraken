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
        define(["require", "exports", "@coffeekraken/s-promise", "../node/interface/SCliMonoListParamsInterface", "@coffeekraken/s-glob", "@coffeekraken/sugar/node/path/packageRoot", "@coffeekraken/sugar/node/fs/readJsonSync", "@coffeekraken/sugar/node/fs/writeJsonSync", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
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
            const root = (0, packageRoot_1.default)(process.cwd(), true);
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1cGdyYWRlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLGNBQWM7SUFDZCx3RUFBaUQ7SUFDakQsZ0hBQTBGO0lBQzFGLGtFQUEyQztJQUMzQyw0RkFBc0U7SUFDdEUsNEZBQXNFO0lBQ3RFLDhGQUF3RTtJQUN4RSw0Q0FBc0I7SUFFdEIsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDL0IsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDNUQsTUFBTSxXQUFXLEdBQUcscUNBQTZCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXBFLE1BQU0sSUFBSSxHQUFHLElBQUEscUJBQWEsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFaEQsTUFBTSxlQUFlLEdBQUcsSUFBQSxzQkFBYyxFQUFDLEdBQUcsSUFBSSxlQUFlLENBQUMsQ0FBQztZQUUvRCxNQUFNLEtBQUssR0FBRyxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFO2dCQUNyRCxHQUFHLEVBQUUsSUFBSTthQUNaLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLG1CQUFtQixLQUFLLENBQUMsTUFBTSwyQ0FBMkM7YUFDcEYsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixZQUFZLEVBQUUsQ0FBQztnQkFDZixLQUFLLEVBQUU7b0JBQ0gscUNBQXFDLGVBQWUsQ0FBQyxPQUFPLFNBQVM7aUJBQ3hFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNmLENBQUMsQ0FBQztZQUVILEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbkIsV0FBVyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0VBQWtFLENBQ3JFLENBQUM7cUJBQ0w7b0JBQ0QsTUFBTSxRQUFRLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO29CQUMvQyxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7d0JBQUUsT0FBTztvQkFDdkMsTUFBTSxJQUFJLEdBQUcsSUFBQSxzQkFBYyxFQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0QyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssZUFBZSxDQUFDLE9BQU8sRUFBRTt3QkFDMUMsSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDUixLQUFLLEVBQUUsV0FBVyxJQUFJLENBQUMsSUFBSSxtQkFBbUIsUUFBUSw0QkFBNEI7eUJBQ3JGLENBQUMsQ0FBQzt3QkFDSCxPQUFPO3FCQUNWO29CQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQztvQkFDdkMsSUFBQSx1QkFBZSxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixLQUFLLEVBQUUsNEJBQTRCLElBQUksQ0FBQyxJQUFJLG1CQUFtQixRQUFRLDhDQUE4QztxQkFDeEgsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMifQ==