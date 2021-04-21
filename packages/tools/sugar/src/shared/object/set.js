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
        define(["require", "exports", "./get", "../string/unquote"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const get_1 = __importDefault(require("./get"));
    const unquote_1 = __importDefault(require("../string/unquote"));
    /**
     * @name                                        set
     * @namespace            js.object
     * @type                                        Function
     * @stable
     *
     * Set an object value using a dotted object path like "myObject.myProperty.myValue" to set his position
     *
     * @param                         {Object}                         obj                      The object in which to set the value
     * @param                         {String}                        path                      The object path where to set the value
     * @param                         {Mixed}                         value                     The value to set
     * @return                        {Mixed}                                                   Return the setted value if setted correctly, or undefined if something goes wrong...
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example               js
     * import set from '@coffeekraken/sugar/js/object/set';
     * set('myObject.cool.value', 'Hello world'); // => Hello world
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = (obj, path, value, settings = {}) => {
        settings = Object.assign({}, settings);
        if (!path || path === '' || path === '.') {
            obj = value;
            return;
        }
        path = path.replace(/\[(\w+)\]/g, '.[$1]');
        // path = path.replace(/^\./, '');
        const a = unquote_1.default(path)
            .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
            .map((p) => unquote_1.default(p));
        let o = obj;
        while (a.length - 1) {
            const n = a.shift();
            if (!(n in o)) {
                if (a[0].match(/^\[[0-9]+\]$/))
                    o[n] = [];
                else
                    o[n] = {};
            }
            o = o[n];
        }
        if (a[0].match(/^\[[0-9]+\]$/)) {
            if (!Array.isArray(o))
                o = [];
            o.push(value);
        }
        else {
            o[a[0]] = value;
        }
        return get_1.default(obj, path);
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGdEQUEwQjtJQUMxQixnRUFBMEM7SUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDakQsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQ3hDLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDWixPQUFPO1NBQ1I7UUFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0Msa0NBQWtDO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLGlCQUFTLENBQUMsSUFBSSxDQUFDO2FBQ3RCLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQzthQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDWixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOztvQkFDckMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNoQjtZQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2Y7YUFBTTtZQUNMLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDakI7UUFDRCxPQUFPLGFBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDIn0=