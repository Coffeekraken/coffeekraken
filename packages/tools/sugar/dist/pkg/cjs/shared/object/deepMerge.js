"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject_1 = __importDefault(require("../is/isPlainObject"));
function __deepMerge(...args) {
    var _a;
    let settings = {}, hasSettings = false;
    const potentialSettings = (_a = args[args.length - 1]) !== null && _a !== void 0 ? _a : {};
    if (potentialSettings &&
        Object.keys(potentialSettings).length <= 2 &&
        (potentialSettings.array !== undefined ||
            potentialSettings.clone !== undefined)) {
        hasSettings = true;
        settings = potentialSettings;
    }
    let finalSettings = Object.assign({ array: false, clone: true }, settings);
    function merge(firstObj, secondObj) {
        const newObj = finalSettings.clone ? {} : firstObj;
        if (!secondObj)
            return firstObj;
        const firstProps = Object.getOwnPropertyNames(firstObj);
        firstProps.forEach((key) => {
            const desc = Object.getOwnPropertyDescriptor(firstObj, key);
            if (desc.set || desc.get) {
                Object.defineProperty(newObj, key, desc);
            }
            else {
                newObj[key] = firstObj[key];
            }
        });
        const secondProps = Object.getOwnPropertyNames(secondObj);
        secondProps.forEach((key) => {
            const secondObjDesc = Object.getOwnPropertyDescriptor(secondObj, key);
            if (secondObjDesc.set || secondObjDesc.get) {
                Object.defineProperty(newObj, key, secondObjDesc);
            }
            else if (finalSettings.array &&
                Array.isArray(firstObj[key]) &&
                Array.isArray(secondObj[key])) {
                newObj[key] = [...firstObj[key], ...secondObj[key]];
            }
            else if ((0, isPlainObject_1.default)(newObj[key]) &&
                (0, isPlainObject_1.default)(secondObj[key])) {
                newObj[key] = merge(newObj[key], secondObj[key]);
            }
            else {
                newObj[key] = secondObj[key];
            }
        });
        return newObj;
    }
    if (hasSettings) {
        args.pop();
    }
    let currentObj = finalSettings.clone ? {} : args[0];
    for (let i = 0; i < args.length; i++) {
        const toMergeObj = args[i];
        currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
}
exports.default = __deepMerge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFrRDtBQTZDbEQsU0FBd0IsV0FBVyxDQUFDLEdBQUcsSUFBVzs7SUFDOUMsSUFBSSxRQUFRLEdBQXVCLEVBQUUsRUFDakMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUN4QixNQUFNLGlCQUFpQixHQUFHLE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUN0RCxJQUNJLGlCQUFpQjtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxJQUFJLENBQUM7UUFDMUMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEtBQUssU0FBUztZQUNsQyxpQkFBaUIsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLEVBQzVDO1FBQ0UsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNuQixRQUFRLEdBQUcsaUJBQWlCLENBQUM7S0FDaEM7SUFFRCxJQUFJLGFBQWEsbUJBQ2IsS0FBSyxFQUFFLEtBQUssRUFDWixLQUFLLEVBQUUsSUFBSSxJQUNSLFFBQVEsQ0FDZCxDQUFDO0lBRUYsU0FBUyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVM7UUFDOUIsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPLFFBQVEsQ0FBQztRQUVoQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUQsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ3RCLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQy9CO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3hCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FDakQsU0FBUyxFQUNULEdBQUcsQ0FDTixDQUFDO1lBRUYsSUFBSSxhQUFhLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUNyRDtpQkFBTSxJQUNILGFBQWEsQ0FBQyxLQUFLO2dCQUNuQixLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDL0I7Z0JBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2RDtpQkFBTSxJQUNILElBQUEsdUJBQWUsRUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLElBQUEsdUJBQWUsRUFBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDakM7Z0JBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNoQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksV0FBVyxFQUFFO1FBQ2IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ2Q7SUFFRCxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDOUM7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBekVELDhCQXlFQyJ9