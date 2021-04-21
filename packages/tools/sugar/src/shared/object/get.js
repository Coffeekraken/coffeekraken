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
        define(["require", "exports", "../string/unquote"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const unquote_1 = __importDefault(require("../string/unquote"));
    /**
     * @name                          get
     * @namespace            js.object
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
    function get(obj, path, settings = {}) {
        settings = Object.assign({}, settings);
        if (obj[path] !== undefined)
            return obj[path];
        if (!path || path === '' || path === '.')
            return obj;
        path = path.replace(/\[(\w+)\]/g, '.$1');
        path = path.replace(/^\./, '');
        const a = path.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => unquote_1.default(p));
        let o = obj;
        while (a.length) {
            const n = a.shift();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGdFQUEwQztJQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDbkMsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztRQUNGLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVM7WUFBRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxLQUFLLEdBQUc7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUNyRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDWixPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRO2dCQUFFLE9BQU87WUFDbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQ3RCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDVjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGVBQWU7SUFDZixTQUFTO0lBQ1QsUUFBUTtJQUNSLG9CQUFvQjtJQUNwQix3QkFBd0I7SUFDeEIsV0FBVztJQUNYLGtDQUFrQztJQUNsQyxpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLDRCQUE0QjtJQUM1QixZQUFZO0lBQ1osVUFBVTtJQUNWLFNBQVM7SUFDVCw4QkFBOEI7SUFDOUIsTUFBTTtJQUNOLEtBQUs7SUFFTCxrQkFBZSxHQUFHLENBQUMifQ==