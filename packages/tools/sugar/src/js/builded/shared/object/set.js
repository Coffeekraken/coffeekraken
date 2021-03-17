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
        define(["require", "exports", "./get", "../string/unquote"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var get_1 = __importDefault(require("./get"));
    var unquote_1 = __importDefault(require("../string/unquote"));
    /**
     * @name                                        set
     * @namespace           sugar.js.object
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
    exports.default = (function (obj, path, value, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({}, settings);
        if (!path || path === '' || path === '.') {
            obj = value;
            return;
        }
        path = path.replace(/\[(\w+)\]/g, '.[$1]');
        // path = path.replace(/^\./, '');
        var a = unquote_1.default(path)
            .split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm)
            .map(function (p) { return unquote_1.default(p); });
        var o = obj;
        while (a.length - 1) {
            var n = a.shift();
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
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL29iamVjdC9zZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsOENBQTBCO0lBQzFCLDhEQUEwQztJQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxtQkFBZSxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDN0MsUUFBUSxnQkFDSCxRQUFRLENBQ1osQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQ3hDLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDWixPQUFPO1NBQ1I7UUFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0Msa0NBQWtDO1FBQ2xDLElBQU0sQ0FBQyxHQUFHLGlCQUFTLENBQUMsSUFBSSxDQUFDO2FBQ3RCLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQzthQUNyQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxpQkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFaLENBQVksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNaLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkIsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO29CQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7O29CQUNyQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2hCO1lBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNWO1FBRUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDZjthQUFNO1lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNqQjtRQUNELE9BQU8sYUFBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDLEVBQUMifQ==