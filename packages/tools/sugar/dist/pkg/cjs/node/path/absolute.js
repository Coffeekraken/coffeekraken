"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("../../shared/is/glob"));
const path_2 = __importDefault(require("../../shared/is/path"));
const packageRootDir_1 = __importDefault(require("./packageRootDir"));
function absolute(path, from = (0, packageRootDir_1.default)(), settings = {}) {
    settings = Object.assign({ glob: true }, settings);
    const isArray = Array.isArray(path);
    if (!isArray)
        path = [path];
    path = path.map((p) => {
        if (path_1.default.isAbsolute(p))
            return p;
        if ((0, glob_1.default)(p)) {
            if (settings.glob)
                return path_1.default.resolve(from, p);
            return p;
        }
        else if ((0, path_2.default)(p))
            return path_1.default.resolve(from, p);
        return p;
    });
    if (isArray)
        return path;
    return path[0];
}
exports.default = absolute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBQzFCLGdFQUE0QztBQUM1QyxnRUFBNEM7QUFDNUMsc0VBQWdEO0FBbUNoRCxTQUFTLFFBQVEsQ0FDYixJQUFJLEVBQ0osSUFBSSxHQUFHLElBQUEsd0JBQWdCLEdBQUUsRUFDekIsV0FBOEIsRUFBRTtJQUVoQyxRQUFRLG1CQUNKLElBQUksRUFBRSxJQUFJLElBQ1AsUUFBUSxDQUNkLENBQUM7SUFDRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksQ0FBQyxPQUFPO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNsQixJQUFJLGNBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsSUFBSSxJQUFBLGNBQVEsRUFBQyxDQUFDLENBQUMsRUFBRTtZQUNiLElBQUksUUFBUSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsRCxPQUFPLENBQUMsQ0FBQztTQUNaO2FBQU0sSUFBSSxJQUFBLGNBQVEsRUFBQyxDQUFDLENBQUM7WUFBRSxPQUFPLGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLE9BQU87UUFBRSxPQUFPLElBQUksQ0FBQztJQUN6QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBRUQsa0JBQWUsUUFBUSxDQUFDIn0=