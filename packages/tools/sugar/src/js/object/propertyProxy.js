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
    var get_1 = __importDefault(require("lodash/get"));
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
    function propertyProxy(obj, property, descriptor, applySetterAtStart) {
        if (applySetterAtStart === void 0) { applySetterAtStart = false; }
        // handle property like "something.cool"
        var objPath = property.split('.').slice(0, -1).join('.');
        if (objPath) {
            property = property.split('.').pop();
            obj = get_1.default(obj, objPath);
        }
        // store the current value
        var val = get_1.default(obj, property);
        var currentDescriptor = Object.getOwnPropertyDescriptor(obj.prototype || obj, property);
        // custom setter check
        var _set = function (value) {
            if (descriptor.set) {
                value = descriptor.set(value);
            }
            // descriptor
            if (currentDescriptor && currentDescriptor.set) {
                var ret = currentDescriptor.set(value);
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
        var d = Object.getOwnPropertyDescriptor(obj, property);
        Object.defineProperty(obj, property, {
            get: function () {
                var _val = val;
                if (descriptor.get) {
                    _val = descriptor.get(_val);
                }
                if (currentDescriptor && currentDescriptor.get) {
                    _val = currentDescriptor.get();
                }
                return _val;
            },
            set: function (v) {
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
    return propertyProxy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlQcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5UHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0lBRVYsbURBQThCO0lBQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Q0c7SUFDSCxTQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxrQkFBMEI7UUFBMUIsbUNBQUEsRUFBQSwwQkFBMEI7UUFDMUUsd0NBQXdDO1FBQ3hDLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxJQUFJLE9BQU8sRUFBRTtZQUNYLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3JDLEdBQUcsR0FBRyxhQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzFCO1FBRUQsMEJBQTBCO1FBQzFCLElBQUksR0FBRyxHQUFHLGFBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUIsSUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQ3ZELEdBQUcsQ0FBQyxTQUFTLElBQUksR0FBRyxFQUNwQixRQUFRLENBQ1QsQ0FBQztRQUVGLHNCQUFzQjtRQUN0QixJQUFNLElBQUksR0FBRyxVQUFDLEtBQUs7WUFDakIsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNsQixLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjtZQUVELGFBQWE7WUFDYixJQUFJLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDOUMsSUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLEdBQUcsRUFBRTtvQkFDUCxHQUFHLEdBQUcsR0FBRyxDQUFDO2lCQUNYO3FCQUFNO29CQUNMLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDL0I7YUFDRjtpQkFBTTtnQkFDTCxHQUFHLEdBQUcsS0FBSyxDQUFDO2FBQ2I7UUFDSCxDQUFDLENBQUM7UUFFRiw2QkFBNkI7UUFDN0IsSUFBSSxrQkFBa0I7WUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsd0NBQXdDO1FBQ3hDLElBQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFO1lBQ25DLEdBQUcsRUFBRTtnQkFDSCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ2YsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNsQixJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDN0I7Z0JBQ0QsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7b0JBQzlDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDaEM7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQ0QsR0FBRyxFQUFFLFVBQUMsQ0FBQztnQkFDTCx3QkFBd0I7Z0JBQ3hCLHNDQUFzQztnQkFDdEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNSLHVCQUF1QjtnQkFDdkIsdUNBQXVDO1lBQ3pDLENBQUM7WUFDRCxZQUFZLEVBQ1YsVUFBVSxDQUFDLFlBQVksS0FBSyxTQUFTO2dCQUNuQyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVk7Z0JBQ3pCLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxZQUFZLEtBQUssU0FBUztvQkFDbkUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFlBQVk7b0JBQ2hDLENBQUMsQ0FBQyxLQUFLO1lBQ1gsVUFBVSxFQUNSLFVBQVUsQ0FBQyxVQUFVLEtBQUssU0FBUztnQkFDakMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVO2dCQUN2QixDQUFDLENBQUMsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsVUFBVSxLQUFLLFNBQVM7b0JBQ2pFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVO29CQUM5QixDQUFDLENBQUMsSUFBSTtZQUNWLCtHQUErRztTQUNoSCxDQUFDLENBQUM7UUFFSCxtQkFBbUI7UUFDbkIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0QsT0FBUyxhQUFhLENBQUMifQ==