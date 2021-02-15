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
    exports.default = propertyProxy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlQcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3BlcnR5UHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLG1EQUE4QjtJQUM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUNHO0lBQ0gsU0FBUyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsa0JBQTBCO1FBQTFCLG1DQUFBLEVBQUEsMEJBQTBCO1FBQzFFLHdDQUF3QztRQUN4QyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNyQyxHQUFHLEdBQUcsYUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMxQjtRQUVELDBCQUEwQjtRQUMxQixJQUFJLEdBQUcsR0FBRyxhQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLElBQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUN2RCxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFDcEIsUUFBUSxDQUNULENBQUM7UUFFRixzQkFBc0I7UUFDdEIsSUFBTSxJQUFJLEdBQUcsVUFBQyxLQUFLO1lBQ2pCLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDbEIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0I7WUFFRCxhQUFhO1lBQ2IsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQzlDLElBQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekMsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsR0FBRyxHQUFHLEdBQUcsQ0FBQztpQkFDWDtxQkFBTTtvQkFDTCxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQy9CO2FBQ0Y7aUJBQU07Z0JBQ0wsR0FBRyxHQUFHLEtBQUssQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsNkJBQTZCO1FBQzdCLElBQUksa0JBQWtCO1lBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLHdDQUF3QztRQUN4QyxJQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRTtZQUNuQyxHQUFHLEVBQUU7Z0JBQ0gsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNmLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDbEIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzdCO2dCQUNELElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsR0FBRyxFQUFFO29CQUM5QyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ2hDO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELEdBQUcsRUFBRSxVQUFDLENBQUM7Z0JBQ0wsd0JBQXdCO2dCQUN4QixzQ0FBc0M7Z0JBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUix1QkFBdUI7Z0JBQ3ZCLHVDQUF1QztZQUN6QyxDQUFDO1lBQ0QsWUFBWSxFQUNWLFVBQVUsQ0FBQyxZQUFZLEtBQUssU0FBUztnQkFDbkMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZO2dCQUN6QixDQUFDLENBQUMsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsWUFBWSxLQUFLLFNBQVM7b0JBQ25FLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZO29CQUNoQyxDQUFDLENBQUMsS0FBSztZQUNYLFVBQVUsRUFDUixVQUFVLENBQUMsVUFBVSxLQUFLLFNBQVM7Z0JBQ2pDLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVTtnQkFDdkIsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFVBQVUsS0FBSyxTQUFTO29CQUNqRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsVUFBVTtvQkFDOUIsQ0FBQyxDQUFDLElBQUk7WUFDViwrR0FBK0c7U0FDaEgsQ0FBQyxDQUFDO1FBRUgsbUJBQW1CO1FBQ25CLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELGtCQUFlLGFBQWEsQ0FBQyJ9