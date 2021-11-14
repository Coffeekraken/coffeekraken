// @ts-nocheck
import _get from 'lodash/get';
/**
 * @name        propertyProxy
 * @namespace            js.object
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function propertyProxy(obj, property, descriptor, applySetterAtStart = false) {
    // handle property like "something.cool"
    const objPath = property.split('.').slice(0, -1).join('.');
    if (objPath) {
        property = property.split('.').pop();
        obj = _get(obj, objPath);
    }
    // store the current value
    let val = _get(obj, property);
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
export default propertyProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlQcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5UHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sSUFBSSxNQUFNLFlBQVksQ0FBQztBQUM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxTQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsR0FBRyxLQUFLO0lBQ3hFLHdDQUF3QztJQUN4QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0QsSUFBSSxPQUFPLEVBQUU7UUFDVCxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM1QjtJQUVELDBCQUEwQjtJQUMxQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUNyRCxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFDcEIsUUFBUSxDQUNYLENBQUM7SUFFRixzQkFBc0I7SUFDdEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNuQixJQUFJLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDaEIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7UUFFRCxhQUFhO1FBQ2IsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDNUMsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksR0FBRyxFQUFFO2dCQUNMLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDYjtpQkFBTTtnQkFDSCxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDakM7U0FDSjthQUFNO1lBQ0gsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUNmO0lBQ0wsQ0FBQyxDQUFDO0lBRUYsNkJBQTZCO0lBQzdCLElBQUksa0JBQWtCO1FBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxDLHdDQUF3QztJQUN4QyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRTtRQUNqQyxHQUFHLEVBQUUsR0FBRyxFQUFFO1lBQ04sSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ2YsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNoQixJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQjtZQUNELElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsR0FBRyxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDbEM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDUCx3QkFBd0I7WUFDeEIsc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNSLHVCQUF1QjtZQUN2Qix1Q0FBdUM7UUFDM0MsQ0FBQztRQUNELFlBQVksRUFDUixVQUFVLENBQUMsWUFBWSxLQUFLLFNBQVM7WUFDakMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZO1lBQ3pCLENBQUMsQ0FBQyxpQkFBaUI7Z0JBQ2pCLGlCQUFpQixDQUFDLFlBQVksS0FBSyxTQUFTO2dCQUM5QyxDQUFDLENBQUMsaUJBQWlCLENBQUMsWUFBWTtnQkFDaEMsQ0FBQyxDQUFDLEtBQUs7UUFDZixVQUFVLEVBQ04sVUFBVSxDQUFDLFVBQVUsS0FBSyxTQUFTO1lBQy9CLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVTtZQUN2QixDQUFDLENBQUMsaUJBQWlCO2dCQUNqQixpQkFBaUIsQ0FBQyxVQUFVLEtBQUssU0FBUztnQkFDNUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFVBQVU7Z0JBQzlCLENBQUMsQ0FBQyxJQUFJO1FBQ2QsK0dBQStHO0tBQ2xILENBQUMsQ0FBQztJQUVILG1CQUFtQjtJQUNuQixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRCxlQUFlLGFBQWEsQ0FBQyJ9