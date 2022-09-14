// @ts-nocheck
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
 * import { __propertyProxy } from '@coffeekraken/sugar/object';
 * const myObject = {
 * 		title : 'World'
 * };
 * // create the proxy
 * __propertyProxy(myObject, 'title', {
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
export default function __propertyProxy(obj, property, descriptor, applySetterAtStart = false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWUsQ0FDbkMsR0FBRyxFQUNILFFBQVEsRUFDUixVQUFVLEVBQ1Ysa0JBQWtCLEdBQUcsS0FBSztJQUUxQix3Q0FBd0M7SUFDeEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNELElBQUksT0FBTyxFQUFFO1FBQ1QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDN0I7SUFFRCwwQkFBMEI7SUFDMUIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQixNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FDckQsR0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHLEVBQ3BCLFFBQVEsQ0FDWCxDQUFDO0lBRUYsc0JBQXNCO0lBQ3RCLE1BQU0sSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDbkIsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2hCLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsYUFBYTtRQUNiLElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQzVDLE1BQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLEdBQUcsRUFBRTtnQkFDTCxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQ2I7aUJBQU07Z0JBQ0gsR0FBRyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2pDO1NBQ0o7YUFBTTtZQUNILEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDZjtJQUNMLENBQUMsQ0FBQztJQUVGLDZCQUE2QjtJQUM3QixJQUFJLGtCQUFrQjtRQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsQyx3Q0FBd0M7SUFDeEMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUU7UUFDakMsR0FBRyxFQUFFLEdBQUcsRUFBRTtZQUNOLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNmLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0I7WUFDRCxJQUFJLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDNUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2xDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1Asd0JBQXdCO1lBQ3hCLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDUix1QkFBdUI7WUFDdkIsdUNBQXVDO1FBQzNDLENBQUM7UUFDRCxZQUFZLEVBQ1IsVUFBVSxDQUFDLFlBQVksS0FBSyxTQUFTO1lBQ2pDLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWTtZQUN6QixDQUFDLENBQUMsaUJBQWlCO2dCQUNqQixpQkFBaUIsQ0FBQyxZQUFZLEtBQUssU0FBUztnQkFDOUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFlBQVk7Z0JBQ2hDLENBQUMsQ0FBQyxLQUFLO1FBQ2YsVUFBVSxFQUNOLFVBQVUsQ0FBQyxVQUFVLEtBQUssU0FBUztZQUMvQixDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVU7WUFDdkIsQ0FBQyxDQUFDLGlCQUFpQjtnQkFDakIsaUJBQWlCLENBQUMsVUFBVSxLQUFLLFNBQVM7Z0JBQzVDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVO2dCQUM5QixDQUFDLENBQUMsSUFBSTtRQUNkLCtHQUErRztLQUNsSCxDQUFDLENBQUM7SUFFSCxtQkFBbUI7SUFDbkIsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDIn0=