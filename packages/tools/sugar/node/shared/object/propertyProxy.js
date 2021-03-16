"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("lodash/get"));
/**
 * @name        propertyProxy
 * @namespace           sugar.js.object
 * @type      Function
 * @status              beta
 *
 * Create a proxy for and object property.
 * This gives you the possibility to process the data of the property
 * when it is getted or setted.
 *
 * @param 		{Object} 		obj 			The object on which to create the proxy
 * @param 		{String} 		property 		The property name that will be proxied
 * @param 		{Object} 		descriptor 		A descriptor object that contains at least a get or a set method, or both
 * @param 		{Boolean} 		[applySetterAtStart=false] 	If need to apply the descriptor setter directly on the current value or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import propertyProxy from '@coffeekraken/sugar/js/object/propertyProxy';
 * const myObject = {
 * 		title : 'World'
 * };
 * // create the proxy
 * propertyProxy(myObject, 'title', {
 * 		get : (value) => {
 * 			return `Hello ${value}`;
 * 		},
 * 		set : (value) => {
 * 			return `Youhou ${value}`;
 * 		}
 * });
 * console.log(myObject.title) => 'Hello World';
 * myObject.title = 'Universe';
 * console.log(myObject.title) => 'Hello Youhou Universe';
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function propertyProxy(obj, property, descriptor, applySetterAtStart = false) {
    // handle property like "something.cool"
    const objPath = property.split('.').slice(0, -1).join('.');
    if (objPath) {
        property = property.split('.').pop();
        obj = get_1.default(obj, objPath);
    }
    // store the current value
    let val = get_1.default(obj, property);
    const currentDescriptor = Object.getOwnPropertyDescriptor(obj.prototype || obj, property);
    // custom setter check
    const _set = (value) => {
        if (descriptor.set) {
            value = descriptor.set(value);
        }
        // descriptor
        if (currentDescriptor && currentDescriptor.set) {
            const ret = currentDescriptor.set(value);
            if (ret) {
                val = ret;
            }
            else {
                val = currentDescriptor.get();
            }
        }
        else {
            val = value;
        }
    };
    // apply the setter if needed
    if (applySetterAtStart)
        _set(val);
    // make sure we have the good descriptor
    const d = Object.getOwnPropertyDescriptor(obj, property);
    Object.defineProperty(obj, property, {
        get: () => {
            let _val = val;
            if (descriptor.get) {
                _val = descriptor.get(_val);
            }
            if (currentDescriptor && currentDescriptor.get) {
                _val = currentDescriptor.get();
            }
            return _val;
        },
        set: (v) => {
            // const oldValue = val;
            // internal set to use the good setter
            _set(v);
            // notify of new update
            // this.notify(objPath, val, oldValue);
        },
        configurable: descriptor.configurable !== undefined
            ? descriptor.configurable
            : currentDescriptor && currentDescriptor.configurable !== undefined
                ? currentDescriptor.configurable
                : false,
        enumarable: descriptor.enumarable !== undefined
            ? descriptor.enumarable
            : currentDescriptor && currentDescriptor.enumarable !== undefined
                ? currentDescriptor.enumarable
                : true
        // writable : currentDescriptor && currentDescriptor.writable !== undefined ? currentDescriptor.writable : true
    });
    // return the value
    return val;
}
exports.default = propertyProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlQcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvb2JqZWN0L3Byb3BlcnR5UHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLHFEQUE4QjtBQUM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBQ0gsU0FBUyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEdBQUcsS0FBSztJQUMxRSx3Q0FBd0M7SUFDeEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNELElBQUksT0FBTyxFQUFFO1FBQ1gsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckMsR0FBRyxHQUFHLGFBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDMUI7SUFFRCwwQkFBMEI7SUFDMUIsSUFBSSxHQUFHLEdBQUcsYUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5QixNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FDdkQsR0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHLEVBQ3BCLFFBQVEsQ0FDVCxDQUFDO0lBRUYsc0JBQXNCO0lBQ3RCLE1BQU0sSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDckIsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2xCLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBRUQsYUFBYTtRQUNiLElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQzlDLE1BQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLEdBQUcsRUFBRTtnQkFDUCxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQ1g7aUJBQU07Z0JBQ0wsR0FBRyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQy9CO1NBQ0Y7YUFBTTtZQUNMLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDYjtJQUNILENBQUMsQ0FBQztJQUVGLDZCQUE2QjtJQUM3QixJQUFJLGtCQUFrQjtRQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsQyx3Q0FBd0M7SUFDeEMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUU7UUFDbkMsR0FBRyxFQUFFLEdBQUcsRUFBRTtZQUNSLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNmLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDbEIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7WUFDRCxJQUFJLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDOUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDVCx3QkFBd0I7WUFDeEIsc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNSLHVCQUF1QjtZQUN2Qix1Q0FBdUM7UUFDekMsQ0FBQztRQUNELFlBQVksRUFDVixVQUFVLENBQUMsWUFBWSxLQUFLLFNBQVM7WUFDbkMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZO1lBQ3pCLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxZQUFZLEtBQUssU0FBUztnQkFDbkUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFlBQVk7Z0JBQ2hDLENBQUMsQ0FBQyxLQUFLO1FBQ1gsVUFBVSxFQUNSLFVBQVUsQ0FBQyxVQUFVLEtBQUssU0FBUztZQUNqQyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVU7WUFDdkIsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFVBQVUsS0FBSyxTQUFTO2dCQUNqRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsVUFBVTtnQkFDOUIsQ0FBQyxDQUFDLElBQUk7UUFDViwrR0FBK0c7S0FDaEgsQ0FBQyxDQUFDO0lBRUgsbUJBQW1CO0lBQ25CLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUNELGtCQUFlLGFBQWEsQ0FBQyJ9