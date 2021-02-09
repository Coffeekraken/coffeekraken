"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("../is/glob"));
const path_1 = __importDefault(require("../is/path"));
const path_2 = __importDefault(require("path"));
const packageRoot_1 = __importDefault(require("./packageRoot"));
function relative(path, from = packageRoot_1.default(), settings = {}) {
    settings = Object.assign({ glob: true, absolute: true }, settings);
    const isArray = Array.isArray(path);
    if (!isArray)
        path = [path];
    path = path.map((p) => {
        if (glob_1.default(p)) {
            if (settings.glob)
                return path_2.default.relative(from, p);
            return p;
        }
        else if (path_2.default.isAbsolute(p)) {
            if (settings.absolute)
                return path_2.default.relative(from, p);
            return p;
        }
        else if (path_1.default(p))
            return path_2.default.relative(from, p);
        return p;
    });
    if (isArray)
        return path;
    return path[0];
}
exports.default = relative;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWxhdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUFrQztBQUNsQyxzREFBa0M7QUFDbEMsZ0RBQTBCO0FBQzFCLGdFQUEwQztBQWtDMUMsU0FBUyxRQUFRLENBQ2YsSUFBSSxFQUNKLElBQUksR0FBRyxxQkFBYSxFQUFFLEVBQ3RCLFdBQThCLEVBQUU7SUFFaEMsUUFBUSxtQkFDTixJQUFJLEVBQUUsSUFBSSxFQUNWLFFBQVEsRUFBRSxJQUFJLElBQ1gsUUFBUSxDQUNaLENBQUM7SUFDRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksQ0FBQyxPQUFPO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNwQixJQUFJLGNBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNmLElBQUksUUFBUSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxjQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRCxPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU0sSUFBSSxjQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQy9CLElBQUksUUFBUSxDQUFDLFFBQVE7Z0JBQUUsT0FBTyxjQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2RCxPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU0sSUFBSSxjQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUUsT0FBTyxjQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxPQUFPO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDekIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQUVELGtCQUFlLFFBQVEsQ0FBQyJ9