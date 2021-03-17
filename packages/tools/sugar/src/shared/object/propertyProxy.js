// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "lodash/get"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlQcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5UHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLHFEQUE4QjtJQUM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUNHO0lBQ0gsU0FBUyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEdBQUcsS0FBSztRQUMxRSx3Q0FBd0M7UUFDeEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELElBQUksT0FBTyxFQUFFO1lBQ1gsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDckMsR0FBRyxHQUFHLGFBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDMUI7UUFFRCwwQkFBMEI7UUFDMUIsSUFBSSxHQUFHLEdBQUcsYUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5QixNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FDdkQsR0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHLEVBQ3BCLFFBQVEsQ0FDVCxDQUFDO1FBRUYsc0JBQXNCO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckIsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNsQixLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjtZQUVELGFBQWE7WUFDYixJQUFJLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDOUMsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLEdBQUcsRUFBRTtvQkFDUCxHQUFHLEdBQUcsR0FBRyxDQUFDO2lCQUNYO3FCQUFNO29CQUNMLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDL0I7YUFDRjtpQkFBTTtnQkFDTCxHQUFHLEdBQUcsS0FBSyxDQUFDO2FBQ2I7UUFDSCxDQUFDLENBQUM7UUFFRiw2QkFBNkI7UUFDN0IsSUFBSSxrQkFBa0I7WUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsd0NBQXdDO1FBQ3hDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFO1lBQ25DLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ1IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNmLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDbEIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzdCO2dCQUNELElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsR0FBRyxFQUFFO29CQUM5QyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ2hDO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNULHdCQUF3QjtnQkFDeEIsc0NBQXNDO2dCQUN0QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsdUJBQXVCO2dCQUN2Qix1Q0FBdUM7WUFDekMsQ0FBQztZQUNELFlBQVksRUFDVixVQUFVLENBQUMsWUFBWSxLQUFLLFNBQVM7Z0JBQ25DLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWTtnQkFDekIsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFlBQVksS0FBSyxTQUFTO29CQUNuRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsWUFBWTtvQkFDaEMsQ0FBQyxDQUFDLEtBQUs7WUFDWCxVQUFVLEVBQ1IsVUFBVSxDQUFDLFVBQVUsS0FBSyxTQUFTO2dCQUNqQyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVU7Z0JBQ3ZCLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxVQUFVLEtBQUssU0FBUztvQkFDakUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFVBQVU7b0JBQzlCLENBQUMsQ0FBQyxJQUFJO1lBQ1YsK0dBQStHO1NBQ2hILENBQUMsQ0FBQztRQUVILG1CQUFtQjtRQUNuQixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDRCxrQkFBZSxhQUFhLENBQUMifQ==