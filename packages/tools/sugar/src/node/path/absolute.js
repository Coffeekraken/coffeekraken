"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const glob_1 = __importDefault(require("../is/glob"));
const path_1 = __importDefault(require("../is/path"));
const path_2 = __importDefault(require("path"));
const packageRoot_1 = __importDefault(require("./packageRoot"));
function absolute(path, from = packageRoot_1.default(), settings = {}) {
    settings = Object.assign({ glob: true }, settings);
    const isArray = Array.isArray(path);
    if (!isArray)
        path = [path];
    path = path.map((p) => {
        if (path_2.default.isAbsolute(p))
            return p;
        if (glob_1.default(p)) {
            if (settings.glob)
                return path_2.default.resolve(from, p);
            return p;
        }
        else if (path_1.default(p))
            return path_2.default.resolve(from, p);
        return p;
    });
    if (isArray)
        return path;
    return path[0];
}
module.exports = absolute;
//# sourceMappingURL=absolute.js.map