"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        propertyProxy
 * @namespace            shared.object
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function propertyProxy(obj, property, descriptor, applySetterAtStart = false) {
    // handle property like "something.cool"
    const objPath = property.split('.').slice(0, -1).join('.');
    if (objPath) {
        property = property.split('.').pop();
        obj = __get(obj, objPath);
    }
    // store the current value
    let val = __get(obj, property);
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
            : currentDescriptor &&
                currentDescriptor.configurable !== undefined
                ? currentDescriptor.configurable
                : false,
        enumarable: descriptor.enumarable !== undefined
            ? descriptor.enumarable
            : currentDescriptor &&
                currentDescriptor.enumarable !== undefined
                ? currentDescriptor.enumarable
                : true,
        // writable : currentDescriptor && currentDescriptor.writable !== undefined ? currentDescriptor.writable : true
    });
    // return the value
    return val;
}
exports.default = propertyProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDRztBQUNILFNBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixHQUFHLEtBQUs7SUFDeEUsd0NBQXdDO0lBQ3hDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzRCxJQUFJLE9BQU8sRUFBRTtRQUNULFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzdCO0lBRUQsMEJBQTBCO0lBQzFCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0IsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQ3JELEdBQUcsQ0FBQyxTQUFTLElBQUksR0FBRyxFQUNwQixRQUFRLENBQ1gsQ0FBQztJQUVGLHNCQUFzQjtJQUN0QixNQUFNLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ25CLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNoQixLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQztRQUVELGFBQWE7UUFDYixJQUFJLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUM1QyxNQUFNLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsR0FBRyxHQUFHLEdBQUcsQ0FBQzthQUNiO2lCQUFNO2dCQUNILEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNqQztTQUNKO2FBQU07WUFDSCxHQUFHLEdBQUcsS0FBSyxDQUFDO1NBQ2Y7SUFDTCxDQUFDLENBQUM7SUFFRiw2QkFBNkI7SUFDN0IsSUFBSSxrQkFBa0I7UUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbEMsd0NBQXdDO0lBQ3hDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDekQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFO1FBQ2pDLEdBQUcsRUFBRSxHQUFHLEVBQUU7WUFDTixJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7WUFDZixJQUFJLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hCLElBQUksR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO1lBQ0QsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQzVDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNsQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNQLHdCQUF3QjtZQUN4QixzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1IsdUJBQXVCO1lBQ3ZCLHVDQUF1QztRQUMzQyxDQUFDO1FBQ0QsWUFBWSxFQUNSLFVBQVUsQ0FBQyxZQUFZLEtBQUssU0FBUztZQUNqQyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVk7WUFDekIsQ0FBQyxDQUFDLGlCQUFpQjtnQkFDakIsaUJBQWlCLENBQUMsWUFBWSxLQUFLLFNBQVM7Z0JBQzlDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZO2dCQUNoQyxDQUFDLENBQUMsS0FBSztRQUNmLFVBQVUsRUFDTixVQUFVLENBQUMsVUFBVSxLQUFLLFNBQVM7WUFDL0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVO1lBQ3ZCLENBQUMsQ0FBQyxpQkFBaUI7Z0JBQ2pCLGlCQUFpQixDQUFDLFVBQVUsS0FBSyxTQUFTO2dCQUM1QyxDQUFDLENBQUMsaUJBQWlCLENBQUMsVUFBVTtnQkFDOUIsQ0FBQyxDQUFDLElBQUk7UUFDZCwrR0FBK0c7S0FDbEgsQ0FBQyxDQUFDO0lBRUgsbUJBQW1CO0lBQ25CLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGtCQUFlLGFBQWEsQ0FBQyJ9