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
        cloneFirst: false,
        privateProps: true,
    }, settings);
    const isArray = Array.isArray(objectOrArray);
    let newObject = isArray
        ? []
        : settings.cloneFirst
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFzRDtBQUN0RCx3RUFBa0Q7QUFDbEQsb0VBQThDO0FBaUQ5QyxTQUF3QixTQUFTLENBQzdCLGFBQWtCLEVBQ2xCLFNBQW9CLEVBQ3BCLFFBQTZCLEVBQzdCLEtBQUssR0FBRyxFQUFFO0lBRVYsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxjQUFjLEVBQUUsS0FBSztRQUNyQixLQUFLLEVBQUUsSUFBSTtRQUNYLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFlBQVksRUFBRSxJQUFJO0tBQ3JCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTdDLElBQUksU0FBUyxHQUFHLE9BQU87UUFDbkIsQ0FBQyxDQUFDLEVBQUU7UUFDSixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVU7WUFDckIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQztZQUNsQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBRXBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBRXZELElBQ0ksSUFBQSx1QkFBZSxFQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLElBQUEseUJBQWlCLEVBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQzVCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQ3hEO1lBQ0UsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFO2dCQUM1RCxHQUFHLEtBQUs7Z0JBQ1IsSUFBSTthQUNQLENBQUMsQ0FBQztZQUVILElBQUksT0FBTyxFQUFFO2dCQUNULFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUEsdUJBQWUsRUFBQyxHQUFHLENBQUMsRUFBRTtvQkFDeEMsU0FBUyxtQ0FDRixTQUFTLEdBQ1QsR0FBRyxDQUNULENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztpQkFDekI7YUFDSjtZQUNELE9BQU87U0FDVjtRQUVELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUNsQixNQUFNLEVBQUUsYUFBYTtZQUNyQixJQUFJO1lBQ0osS0FBSyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDMUIsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNuQyxDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNaLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUNELElBQUksT0FBTyxFQUFFO1lBQ1QsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjthQUFNO1lBQ0gsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUEsdUJBQWUsRUFBQyxHQUFHLENBQUMsRUFBRTtnQkFDeEMsNkJBQTZCO2dCQUM3QixTQUFTLG1DQUNGLFNBQVMsR0FDVCxHQUFHLENBQ1QsQ0FBQzthQUNMO2lCQUFNO2dCQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQTlFRCw0QkE4RUMifQ==