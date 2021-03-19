// @ts-nocheck
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlQcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5UHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQscURBQThCO0lBQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Q0c7SUFDSCxTQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsR0FBRyxLQUFLO1FBQzFFLHdDQUF3QztRQUN4QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNyQyxHQUFHLEdBQUcsYUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMxQjtRQUVELDBCQUEwQjtRQUMxQixJQUFJLEdBQUcsR0FBRyxhQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUN2RCxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFDcEIsUUFBUSxDQUNULENBQUM7UUFFRixzQkFBc0I7UUFDdEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQixJQUFJLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1lBRUQsYUFBYTtZQUNiLElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsR0FBRyxFQUFFO2dCQUM5QyxNQUFNLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksR0FBRyxFQUFFO29CQUNQLEdBQUcsR0FBRyxHQUFHLENBQUM7aUJBQ1g7cUJBQU07b0JBQ0wsR0FBRyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUMvQjthQUNGO2lCQUFNO2dCQUNMLEdBQUcsR0FBRyxLQUFLLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQztRQUVGLDZCQUE2QjtRQUM3QixJQUFJLGtCQUFrQjtZQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsQyx3Q0FBd0M7UUFDeEMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUU7WUFDbkMsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQkFDUixJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ2YsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNsQixJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDN0I7Z0JBQ0QsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7b0JBQzlDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDaEM7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQ0QsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1Qsd0JBQXdCO2dCQUN4QixzQ0FBc0M7Z0JBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUix1QkFBdUI7Z0JBQ3ZCLHVDQUF1QztZQUN6QyxDQUFDO1lBQ0QsWUFBWSxFQUNWLFVBQVUsQ0FBQyxZQUFZLEtBQUssU0FBUztnQkFDbkMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZO2dCQUN6QixDQUFDLENBQUMsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsWUFBWSxLQUFLLFNBQVM7b0JBQ25FLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZO29CQUNoQyxDQUFDLENBQUMsS0FBSztZQUNYLFVBQVUsRUFDUixVQUFVLENBQUMsVUFBVSxLQUFLLFNBQVM7Z0JBQ2pDLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVTtnQkFDdkIsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFVBQVUsS0FBSyxTQUFTO29CQUNqRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsVUFBVTtvQkFDOUIsQ0FBQyxDQUFDLElBQUk7WUFDViwrR0FBK0c7U0FDaEgsQ0FBQyxDQUFDO1FBRUgsbUJBQW1CO1FBQ25CLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELGtCQUFlLGFBQWEsQ0FBQyJ9