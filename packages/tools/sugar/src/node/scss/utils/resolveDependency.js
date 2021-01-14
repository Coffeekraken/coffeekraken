"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sugar_1 = __importDefault(require("../../config/sugar"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const extension_1 = __importDefault(require("../../fs/extension"));
const filename_1 = __importDefault(require("../../fs/filename"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
function resolveDependency(path, settings = {}) {
    var _a;
    settings = deepMerge_1.default({
        includePaths: sugar_1.default('scss.compile.includePaths'),
        from: undefined
    }, settings);
    if (fs_1.default.existsSync(path)) {
        return path;
    }
    // add the "from" folder path in the includePaths if exist
    // @ts-ignore
    if (settings.from !== undefined) {
        // @ts-ignore
        settings.includePaths.unshift(folderPath_1.default(settings.from));
    }
    // loop on include paths
    // @ts-ignore
    for (let i = 0; i < ((_a = settings.includePaths) === null || _a === void 0 ? void 0 : _a.length); i++) {
        // @ts-ignore
        const includePath = settings.includePaths[i];
        const extension = extension_1.default(path);
        const filename = filename_1.default(path);
        const folderPath = folderPath_1.default(path);
        let pattern;
        if (!extension) {
            pattern = `${folderPath}/?(_)${filename}.*`;
        }
        else {
            pattern = `${folderPath}/?(_)${filename}`;
        }
        const potentialPaths = glob_1.default.sync(pattern, {
            // @ts-ignore
            cwd: includePath
        });
        if (potentialPaths && potentialPaths.length) {
            return path_1.default.resolve(includePath, potentialPaths[0]);
        }
    }
}
module.exports = resolveDependency;
//# sourceMappingURL=resolveDependency.js.map