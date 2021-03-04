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
        define(["require", "exports", "../crypt/object", "crypto"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var object_1 = __importDefault(require("../crypt/object"));
    var crypto_1 = __importDefault(require("crypto"));
    /**
     * @name                            uid
     * @namespace           node.object
     * @type                            Function
     * @stable
     *
     * This function allows you to generate a uniqid based on the objects you pass as parameters.
     * The uid is hashed into a SHA256 32bits string but you can specify it using the "format" parameter described above
     *
     * @param       {Object}            object          The object you want use to generate the uniqid
     * @param       {String}            [format='sha256']    The uid format that you want. Here's the available values:
     * - sha256: return a SHA256 64 characters formated string
     * - full: return the full length uid. The length can vary depending on the objects passed
     * @param       {String}            [key='sugar.js.object.uid']     The key used to encrypt the object
     * @return      {String}                                The uniqid generate based on the objects passed
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     * @todo      remove crypto dependency and replace it by node native one
     *
     * @example       js
     * import uid from '@coffeekraken/sugar/node/object/uid';
     * uid({ hello: 'world' }, { plop: 'coco' }); // => ijfw89uf98jhw9ef8whef87hw7e8q87wegfh78wgf87gw8fgw8e7fzghwz8efgw8fwzuheihgbweuzf
     *
     * @since     2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function uid(obj, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ format: 'sha256', key: 'sugar.js.object.uid' }, settings);
        // init the uid
        var uid = '';
        // loop on each arguments
        uid = object_1.default.encrypt(obj, settings.key);
        switch (settings.format.toLowerCase()) {
            case 'full':
                // return the uid
                return uid;
                break;
            case 'sha256':
            default:
                var hash = crypto_1.default
                    .createHash('sha256')
                    .update(uid)
                    .digest('hex')
                    .toString();
                return hash;
                break;
        }
    }
    exports.default = uid;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWlkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLDJEQUE4QztJQUU5QyxrREFBOEI7SUFFOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQzdCLFFBQVEsY0FDTixNQUFNLEVBQUUsUUFBUSxFQUNoQixHQUFHLEVBQUUscUJBQXFCLElBQ3ZCLFFBQVEsQ0FDWixDQUFDO1FBRUYsZUFBZTtRQUNmLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLHlCQUF5QjtRQUN6QixHQUFHLEdBQUcsZ0JBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqRCxRQUFRLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDckMsS0FBSyxNQUFNO2dCQUNULGlCQUFpQjtnQkFDakIsT0FBTyxHQUFHLENBQUM7Z0JBQ1gsTUFBTTtZQUNSLEtBQUssUUFBUSxDQUFDO1lBQ2Q7Z0JBQ0UsSUFBTSxJQUFJLEdBQUcsZ0JBQVE7cUJBQ2xCLFVBQVUsQ0FBQyxRQUFRLENBQUM7cUJBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQztxQkFDYixRQUFRLEVBQUUsQ0FBQztnQkFDZCxPQUFPLElBQUksQ0FBQztnQkFDWixNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBQ0Qsa0JBQWUsR0FBRyxDQUFDIn0=