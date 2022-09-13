"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject_1 = __importDefault(require("../is/isPlainObject"));
const camelCase_1 = __importDefault(require("../string/camelCase"));
function camelCaseProps(object, settings) {
    const finalSettings = Object.assign({ deep: true }, (settings !== null && settings !== void 0 ? settings : {}));
    for (let [key, value] of Object.entries(object)) {
        const newKey = (0, camelCase_1.default)(key);
        // treat deep
        if ((0, isPlainObject_1.default)(value) && finalSettings.deep) {
            object[newKey] = camelCaseProps(object[key], finalSettings);
        }
        else {
            object[newKey] = value;
        }
        // delete old key if needed
        if (newKey !== key) {
            delete object[key];
        }
    }
    return object;
}
exports.default = camelCaseProps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWtEO0FBQ2xELG9FQUE4QztBQWdDOUMsU0FBd0IsY0FBYyxDQUNsQyxNQUFXLEVBQ1gsUUFBMkM7SUFFM0MsTUFBTSxhQUFhLG1CQUNmLElBQUksRUFBRSxJQUFJLElBQ1AsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzdDLE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUVoQyxhQUFhO1FBQ2IsSUFBSSxJQUFBLHVCQUFlLEVBQUMsS0FBSyxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksRUFBRTtZQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUMvRDthQUFNO1lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMxQjtRQUVELDJCQUEyQjtRQUMzQixJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7WUFDaEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7S0FDSjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUExQkQsaUNBMEJDIn0=