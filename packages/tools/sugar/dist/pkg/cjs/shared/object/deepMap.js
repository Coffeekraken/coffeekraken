"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isClassInstance_1 = __importDefault(require("../is/isClassInstance"));
const isPlainObject_1 = __importDefault(require("../is/isPlainObject"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
            ? Object.assign({}, objectOrArray)
            : objectOrArray;
    Object.keys(objectOrArray).forEach((prop) => {
        if (!settings.privateProps && prop.match(/^_/))
            return;
        if ((0, isPlainObject_1.default)(objectOrArray[prop]) ||
            ((0, isClassInstance_1.default)(objectOrArray[prop]) &&
                settings.classInstances) ||
            (Array.isArray(objectOrArray[prop]) && settings.array)) {
            const res = __deepMap(objectOrArray[prop], processor, settings, [
                ..._path,
                prop,
            ]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFzRDtBQUN0RCx3RUFBa0Q7QUFDbEQsb0VBQThDO0FBaUQ5QyxTQUF3QixTQUFTLENBQzdCLGFBQWtCLEVBQ2xCLFNBQW9CLEVBQ3BCLFFBQTZCLEVBQzdCLEtBQUssR0FBRyxFQUFFO0lBRVYsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxjQUFjLEVBQUUsS0FBSztRQUNyQixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxLQUFLO1FBQ1osWUFBWSxFQUFFLElBQUk7S0FDckIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFN0MsSUFBSSxTQUFTLEdBQUcsT0FBTztRQUNuQixDQUFDLENBQUMsRUFBRTtRQUNKLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSztZQUNoQixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFFcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU87UUFFdkQsSUFDSSxJQUFBLHVCQUFlLEVBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsSUFBQSx5QkFBaUIsRUFBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLFFBQVEsQ0FBQyxjQUFjLENBQUM7WUFDNUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFDeEQ7WUFDRSxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7Z0JBQzVELEdBQUcsS0FBSztnQkFDUixJQUFJO2FBQ1AsQ0FBQyxDQUFDO1lBRUgsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksSUFBQSx1QkFBZSxFQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN4QyxTQUFTLG1DQUNGLFNBQVMsR0FDVCxHQUFHLENBQ1QsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUN6QjthQUNKO1lBQ0QsT0FBTztTQUNWO1FBRUQsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUk7WUFDSixLQUFLLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQztZQUMxQixJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ25DLENBQUMsQ0FBQztRQUNILElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ1osT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDVCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO2FBQU07WUFDSCxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksSUFBQSx1QkFBZSxFQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN4Qyw2QkFBNkI7Z0JBQzdCLFNBQVMsbUNBQ0YsU0FBUyxHQUNULEdBQUcsQ0FDVCxDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUN6QjtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBOUVELDRCQThFQyJ9