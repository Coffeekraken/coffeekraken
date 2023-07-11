"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isClassInstance_js_1 = __importDefault(require("../is/isClassInstance.js"));
const isPlainObject_js_1 = __importDefault(require("../is/isPlainObject.js"));
const deepMerge_js_1 = __importDefault(require("../object/deepMerge.js"));
const clone_js_1 = __importDefault(require("./clone.js"));
function __deepMap(objectOrArray, processor, settings, _path = []) {
    settings = (0, deepMerge_js_1.default)({
        classInstances: false,
        array: true,
        clone: false,
        privateProps: true,
    }, settings);
    const isArray = Array.isArray(objectOrArray);
    let newObject = isArray
        ? []
        : settings.clone
            ? (0, clone_js_1.default)(objectOrArray, { deep: true })
            : objectOrArray;
    Object.keys(objectOrArray).forEach((prop) => {
        if (!settings.privateProps && prop.match(/^_/))
            return;
        if ((0, isPlainObject_js_1.default)(objectOrArray[prop]) ||
            ((0, isClassInstance_js_1.default)(objectOrArray[prop]) &&
                settings.classInstances) ||
            (Array.isArray(objectOrArray[prop]) && settings.array)) {
            const res = __deepMap(objectOrArray[prop], processor, Object.assign(Object.assign({}, settings), { clone: false }), [..._path, prop]);
            if (isArray) {
                newObject.push(res);
            }
            else {
                if (prop === '...' && (0, isPlainObject_js_1.default)(res)) {
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
            if (prop === '...' && (0, isPlainObject_js_1.default)(res)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUF5RDtBQUN6RCw4RUFBcUQ7QUFDckQsMEVBQWlEO0FBQ2pELDBEQUFpQztBQWlEakMsU0FBd0IsU0FBUyxDQUM3QixhQUFrQixFQUNsQixTQUFvQixFQUNwQixRQUE2QixFQUM3QixLQUFLLEdBQUcsRUFBRTtJQUVWLFFBQVEsR0FBRyxJQUFBLHNCQUFXLEVBQ2xCO1FBQ0ksY0FBYyxFQUFFLEtBQUs7UUFDckIsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsS0FBSztRQUNaLFlBQVksRUFBRSxJQUFJO0tBQ3JCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTdDLElBQUksU0FBUyxHQUFHLE9BQU87UUFDbkIsQ0FBQyxDQUFDLEVBQUU7UUFDSixDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFDaEIsQ0FBQyxDQUFDLElBQUEsa0JBQU8sRUFBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDeEMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUVwQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUV2RCxJQUNJLElBQUEsMEJBQWUsRUFBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFBLDRCQUFpQixFQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsUUFBUSxDQUFDLGNBQWMsQ0FBQztZQUM1QixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUN4RDtZQUNFLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FDakIsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUNuQixTQUFTLGtDQUVGLFFBQVEsS0FDWCxLQUFLLEVBQUUsS0FBSyxLQUVoQixDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUNuQixDQUFDO1lBRUYsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksSUFBQSwwQkFBZSxFQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN4QyxTQUFTLG1DQUNGLFNBQVMsR0FDVCxHQUFHLENBQ1QsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUN6QjthQUNKO1lBQ0QsT0FBTztTQUNWO1FBRUQsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUk7WUFDSixLQUFLLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQztZQUMxQixJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ25DLENBQUMsQ0FBQztRQUNILElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ1osT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDVCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO2FBQU07WUFDSCxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksSUFBQSwwQkFBZSxFQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN4Qyw2QkFBNkI7Z0JBQzdCLFNBQVMsbUNBQ0YsU0FBUyxHQUNULEdBQUcsQ0FDVCxDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUN6QjtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBbkZELDRCQW1GQyJ9