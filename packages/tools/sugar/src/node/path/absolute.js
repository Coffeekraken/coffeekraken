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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzb2x1dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhYnNvbHV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0RBQWtDO0FBQ2xDLHNEQUFrQztBQUNsQyxnREFBMEI7QUFDMUIsZ0VBQTBDO0FBa0MxQyxTQUFTLFFBQVEsQ0FDZixJQUFJLEVBQ0osSUFBSSxHQUFHLHFCQUFhLEVBQUUsRUFDdEIsV0FBOEIsRUFBRTtJQUVoQyxRQUFRLG1CQUNOLElBQUksRUFBRSxJQUFJLElBQ1AsUUFBUSxDQUNaLENBQUM7SUFDRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksQ0FBQyxPQUFPO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNwQixJQUFJLGNBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsSUFBSSxjQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDZixJQUFJLFFBQVEsQ0FBQyxJQUFJO2dCQUFFLE9BQU8sY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEQsT0FBTyxDQUFDLENBQUM7U0FDVjthQUFNLElBQUksY0FBUSxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU8sY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkQsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksT0FBTztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3pCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxpQkFBUyxRQUFRLENBQUMifQ==