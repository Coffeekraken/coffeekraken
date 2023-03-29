"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
/**
 * @name                SI18n
 * @namespace           shared
 * @type                Class
 * @platform            node
 * @platform            js
 * @status              beta
 *
 * This class allows you to handle translations (i18n) easily and elegantly.
 * It works in node as well as in the browser.
 *
 * @param       {Object}            [settings={}]           An object of settings to use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet          __SI18n()
 * const i18n = new __SI18n();
 * await i18n.load('en');
 * i18n.set('en');
 *
 * @example             js
 * import __SI18n from '@coffeekraken/s-i18n';
 * const i18n = new __SI18n();
 * await i18n.load('en');
 * i18n.set('en');
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class SI18n extends s_class_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings = {}) {
        super((0, object_1.__deepMerge)({}, settings));
    }
}
exports.default = SI18n;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUU3Qyx1REFBeUQ7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUVILE1BQXFCLEtBQU0sU0FBUSxpQkFBUTtJQUN2Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3JCLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBZEQsd0JBY0MifQ==