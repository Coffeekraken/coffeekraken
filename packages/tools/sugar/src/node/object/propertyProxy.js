"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const get_1 = __importDefault(require("lodash/get"));
/**
 * @name        propertyProxy
 * @namespace           sugar.js.object
 * @type      Function
 * @beta
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
module.exports = propertyProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlQcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5UHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7O0FBRVYscURBQThCO0FBQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFDSCxTQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsR0FBRyxLQUFLO0lBQzFFLHdDQUF3QztJQUN4QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0QsSUFBSSxPQUFPLEVBQUU7UUFDWCxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxHQUFHLEdBQUcsYUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMxQjtJQUVELDBCQUEwQjtJQUMxQixJQUFJLEdBQUcsR0FBRyxhQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUN2RCxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFDcEIsUUFBUSxDQUNULENBQUM7SUFFRixzQkFBc0I7SUFDdEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNyQixJQUFJLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDbEIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFFRCxhQUFhO1FBQ2IsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDOUMsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksR0FBRyxFQUFFO2dCQUNQLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDWDtpQkFBTTtnQkFDTCxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDL0I7U0FDRjthQUFNO1lBQ0wsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUNiO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsNkJBQTZCO0lBQzdCLElBQUksa0JBQWtCO1FBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxDLHdDQUF3QztJQUN4QyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRTtRQUNuQyxHQUFHLEVBQUUsR0FBRyxFQUFFO1lBQ1IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ2YsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNsQixJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsR0FBRyxFQUFFO2dCQUM5QyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDaEM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNULHdCQUF3QjtZQUN4QixzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1IsdUJBQXVCO1lBQ3ZCLHVDQUF1QztRQUN6QyxDQUFDO1FBQ0QsWUFBWSxFQUNWLFVBQVUsQ0FBQyxZQUFZLEtBQUssU0FBUztZQUNuQyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVk7WUFDekIsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFlBQVksS0FBSyxTQUFTO2dCQUNuRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsWUFBWTtnQkFDaEMsQ0FBQyxDQUFDLEtBQUs7UUFDWCxVQUFVLEVBQ1IsVUFBVSxDQUFDLFVBQVUsS0FBSyxTQUFTO1lBQ2pDLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVTtZQUN2QixDQUFDLENBQUMsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsVUFBVSxLQUFLLFNBQVM7Z0JBQ2pFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVO2dCQUM5QixDQUFDLENBQUMsSUFBSTtRQUNWLCtHQUErRztLQUNoSCxDQUFDLENBQUM7SUFFSCxtQkFBbUI7SUFDbkIsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBQ0QsaUJBQVMsYUFBYSxDQUFDIn0=