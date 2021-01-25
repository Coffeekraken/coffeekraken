"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = relative;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWxhdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0RBQWtDO0FBQ2xDLHNEQUFrQztBQUNsQyxnREFBMEI7QUFDMUIsZ0VBQTBDO0FBa0MxQyxTQUFTLFFBQVEsQ0FDZixJQUFJLEVBQ0osSUFBSSxHQUFHLHFCQUFhLEVBQUUsRUFDdEIsV0FBOEIsRUFBRTtJQUVoQyxRQUFRLG1CQUNOLElBQUksRUFBRSxJQUFJLEVBQ1YsUUFBUSxFQUFFLElBQUksSUFDWCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLE9BQU87UUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1QixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3BCLElBQUksY0FBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxRQUFRLENBQUMsSUFBSTtnQkFBRSxPQUFPLGNBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25ELE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7YUFBTSxJQUFJLGNBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDL0IsSUFBSSxRQUFRLENBQUMsUUFBUTtnQkFBRSxPQUFPLGNBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7YUFBTSxJQUFJLGNBQVEsQ0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPLGNBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU87UUFBRSxPQUFPLElBQUksQ0FBQztJQUN6QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQixDQUFDO0FBRUQsaUJBQVMsUUFBUSxDQUFDIn0=