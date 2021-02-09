"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = absolute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzb2x1dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhYnNvbHV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUFrQztBQUNsQyxzREFBa0M7QUFDbEMsZ0RBQTBCO0FBQzFCLGdFQUEwQztBQWtDMUMsU0FBUyxRQUFRLENBQ2YsSUFBSSxFQUNKLElBQUksR0FBRyxxQkFBYSxFQUFFLEVBQ3RCLFdBQThCLEVBQUU7SUFFaEMsUUFBUSxtQkFDTixJQUFJLEVBQUUsSUFBSSxJQUNQLFFBQVEsQ0FDWixDQUFDO0lBQ0YsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsT0FBTztRQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTVCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDcEIsSUFBSSxjQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLElBQUksY0FBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxRQUFRLENBQUMsSUFBSTtnQkFBRSxPQUFPLGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7YUFBTSxJQUFJLGNBQVEsQ0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPLGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLE9BQU87UUFBRSxPQUFPLElBQUksQ0FBQztJQUN6QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQixDQUFDO0FBRUQsa0JBQWUsUUFBUSxDQUFDIn0=