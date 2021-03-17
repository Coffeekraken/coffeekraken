// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../string/unquote"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var unquote_1 = __importDefault(require("../string/unquote"));
    /**
     * @name                          get
     * @namespace           sugar.js.object
     * @type                          Function
     * @stable
     *
     * Retreive an object value using a dotted path like "myObject.myProperty.myValue"
     *
     * @param               {Object}                 obj                The object in which to set the value
     * @param               {String}                path                The dotted object path to get
     * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example             js
     * import get from '@coffeekraken/sugar/js/object/get';
     * get('myObject.cool.value'); // => 'Hello world'
     *
     * @since     2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function get(obj, path, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({}, settings);
        if (obj[path] !== undefined)
            return obj[path];
        if (!path || path === '' || path === '.')
            return obj;
        path = path.replace(/\[(\w+)\]/g, '.$1');
        path = path.replace(/^\./, '');
        var a = path.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map(function (p) { return unquote_1.default(p); });
        var o = obj;
        while (a.length) {
            var n = a.shift();
            if (typeof o !== 'object')
                return;
            if (!(n in o))
                return;
            o = o[n];
        }
        return o;
    }
    // console.log(
    //   get(
    //     {
    //       someting: {
    //         cool: 'hello'
    //       },
    //       coco: ['hello', 'world'],
    //       world: {
    //         'coco.plop': {
    //           yep: 'dsojiofj'
    //         }
    //       }
    //     },
    //     'world."coco.plop".yep'
    //   )
    // );
    exports.default = get;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9vYmplY3QvZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLDhEQUEwQztJQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUNuQyxRQUFRLGdCQUNILFFBQVEsQ0FDWixDQUFDO1FBQ0YsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUztZQUFFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBSSxJQUFJLEtBQUssR0FBRztZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQ3JELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLGlCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQVosQ0FBWSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ1osT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3BCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTtnQkFBRSxPQUFPO1lBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQUUsT0FBTztZQUN0QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxlQUFlO0lBQ2YsU0FBUztJQUNULFFBQVE7SUFDUixvQkFBb0I7SUFDcEIsd0JBQXdCO0lBQ3hCLFdBQVc7SUFDWCxrQ0FBa0M7SUFDbEMsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6Qiw0QkFBNEI7SUFDNUIsWUFBWTtJQUNaLFVBQVU7SUFDVixTQUFTO0lBQ1QsOEJBQThCO0lBQzlCLE1BQU07SUFDTixLQUFLO0lBRUwsa0JBQWUsR0FBRyxDQUFDIn0=