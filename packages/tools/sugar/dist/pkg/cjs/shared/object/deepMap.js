"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isClassInstance_1 = __importDefault(require("../is/isClassInstance"));
const isPlainObject_1 = __importDefault(require("../is/isPlainObject"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const clone_1 = __importDefault(require("./clone"));
function __deepMap(objectOrArray, processor, settings, _path = []) {
    settings = (0, deepMerge_1.default)({
        classInstances: false,
        array: true,
        clone: false,
        privateProps: true,
    }, settings);
    const isArray = Array.isArray(objectOrArray);
    let newObject = isArray
        ? []
        : settings.clone
            ? (0, clone_1.default)(objectOrArray, { deep: true })
            : objectOrArray;
    Object.keys(objectOrArray).forEach((prop) => {
        if (!settings.privateProps && prop.match(/^_/))
            return;
        if ((0, isPlainObject_1.default)(objectOrArray[prop]) ||
            ((0, isClassInstance_1.default)(objectOrArray[prop]) &&
                settings.classInstances) ||
            (Array.isArray(objectOrArray[prop]) && settings.array)) {
            const res = __deepMap(objectOrArray[prop], processor, Object.assign(Object.assign({}, settings), { clone: false }), [..._path, prop]);
            if (isArray) {
                newObject.push(res);
            }
            else {
                if (prop === '...' && (0, isPlainObject_1.default)(res)) {
                    newObject = Object.assign(Object.assign({}, newObject), res);
                }
                else {
                    newObject[prop] = res;
                }
            }
            return;
        }
        const res = processor({
            object: objectOrArray,
            prop,
            value: objectOrArray[prop],
            path: [..._path, prop].join('.'),
        });
        if (res === -1) {
            delete newObject[prop];
            return;
        }
        if (isArray) {
            newObject.push(res);
        }
        else {
            if (prop === '...' && (0, isPlainObject_1.default)(res)) {
                // console.log('DEFEF', res);
                newObject = Object.assign(Object.assign({}, newObject), res);
            }
            else {
                newObject[prop] = res;
            }
        }
    });
    return newObject;
}
exports.default = __deepMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFzRDtBQUN0RCx3RUFBa0Q7QUFDbEQsb0VBQThDO0FBQzlDLG9EQUE4QjtBQWlEOUIsU0FBd0IsU0FBUyxDQUM3QixhQUFrQixFQUNsQixTQUFvQixFQUNwQixRQUE2QixFQUM3QixLQUFLLEdBQUcsRUFBRTtJQUVWLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksY0FBYyxFQUFFLEtBQUs7UUFDckIsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsS0FBSztRQUNaLFlBQVksRUFBRSxJQUFJO0tBQ3JCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTdDLElBQUksU0FBUyxHQUFHLE9BQU87UUFDbkIsQ0FBQyxDQUFDLEVBQUU7UUFDSixDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFDaEIsQ0FBQyxDQUFDLElBQUEsZUFBTyxFQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN4QyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBRXBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBRXZELElBQ0ksSUFBQSx1QkFBZSxFQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLElBQUEseUJBQWlCLEVBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQzVCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQ3hEO1lBQ0UsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUNqQixhQUFhLENBQUMsSUFBSSxDQUFDLEVBQ25CLFNBQVMsa0NBRUYsUUFBUSxLQUNYLEtBQUssRUFBRSxLQUFLLEtBRWhCLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQ25CLENBQUM7WUFFRixJQUFJLE9BQU8sRUFBRTtnQkFDVCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNILElBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFBLHVCQUFlLEVBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3hDLFNBQVMsbUNBQ0YsU0FBUyxHQUNULEdBQUcsQ0FDVCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQ3pCO2FBQ0o7WUFDRCxPQUFPO1NBQ1Y7UUFFRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDbEIsTUFBTSxFQUFFLGFBQWE7WUFDckIsSUFBSTtZQUNKLEtBQUssRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDWixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLE9BQU8sRUFBRTtZQUNULFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7YUFBTTtZQUNILElBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFBLHVCQUFlLEVBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hDLDZCQUE2QjtnQkFDN0IsU0FBUyxtQ0FDRixTQUFTLEdBQ1QsR0FBRyxDQUNULENBQUM7YUFDTDtpQkFBTTtnQkFDSCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFuRkQsNEJBbUZDIn0=