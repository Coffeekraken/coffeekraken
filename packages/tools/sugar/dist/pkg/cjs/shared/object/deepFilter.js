"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const isPlainObject_js_1 = __importDefault(require("../is/isPlainObject.js"));
function processObj(object, filter, settings) {
    const newObj = {}, keys = Object.keys(object);
    // loop on the object keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key];
        // pass the property in the filter function
        const res = filter({
            key,
            value,
            isObject: (0, isPlainObject_js_1.default)(value),
        });
        // true mean: we keep this totally
        if (res === true) {
            if ((0, isPlainObject_js_1.default)(value)) {
                (newObj[key] = settings.clone
                    ? Object.assign({}, value)
                    : value),
                    filter,
                    settings;
            }
            else {
                newObj[key] = value;
            }
        }
        else if (res === undefined) {
            if ((0, isPlainObject_js_1.default)(value)) {
                newObj[key] = settings.clone
                    ? processObj(Object.assign({}, value), filter, settings)
                    : processObj(value, filter, settings);
            }
            else {
                newObj[key] = value;
            }
        }
        // false mean: we do not keep this
        else if (res === false) {
            continue;
        }
    }
    return newObj;
}
function __deepFilter(object, filter, settings) {
    settings = Object.assign({ clone: true }, (settings !== null && settings !== void 0 ? settings : {}));
    return processObj(settings.clone ? Object.assign({}, object) : object, filter, settings);
}
exports.default = __deepFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLDhFQUFxRDtBQXFEckQsU0FBUyxVQUFVLENBQUMsTUFBVyxFQUFFLE1BQXlCLEVBQUUsUUFBUTtJQUNoRSxNQUFNLE1BQU0sR0FBRyxFQUFFLEVBQ2IsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFL0IsMEJBQTBCO0lBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFMUIsMkNBQTJDO1FBQzNDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUNmLEdBQUc7WUFDSCxLQUFLO1lBQ0wsUUFBUSxFQUFFLElBQUEsMEJBQWUsRUFBQyxLQUFLLENBQUM7U0FDbkMsQ0FBQyxDQUFDO1FBRUgsa0NBQWtDO1FBQ2xDLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtZQUNkLElBQUksSUFBQSwwQkFBZSxFQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN4QixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSztvQkFDekIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQztvQkFDMUIsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDUixNQUFNO29CQUNOLFFBQVEsQ0FBQzthQUNoQjtpQkFBTTtnQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO1NBQ0o7YUFBTSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxJQUFBLDBCQUFlLEVBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSztvQkFDeEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO29CQUN4RCxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDN0M7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUN2QjtTQUNKO1FBQ0Qsa0NBQWtDO2FBQzdCLElBQUksR0FBRyxLQUFLLEtBQUssRUFBRTtZQUNwQixTQUFTO1NBQ1o7S0FDSjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxTQUF3QixZQUFZLENBQ2hDLE1BQVcsRUFDWCxNQUF5QixFQUN6QixRQUF1QztJQUV2QyxRQUFRLG1CQUNKLEtBQUssRUFBRSxJQUFJLElBQ1IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUNGLE9BQU8sVUFBVSxDQUNiLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQ25ELE1BQU0sRUFDTixRQUFRLENBQ1gsQ0FBQztBQUNOLENBQUM7QUFkRCwrQkFjQyJ9