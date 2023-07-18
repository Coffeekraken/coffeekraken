"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
const SStore_js_1 = __importDefault(require("./SStore.js"));
class SStateManager extends s_class_1.default {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name           define
     * @type            Function
     *
     * This method allows you to define a new state inside the state manager.
     * It's like creating a new SState instance but quicker
     *
     * @param       {String}            id          The state id you want to create
     * @param       {Object}            state       The state object used to create the SState instance
     * @param       {ISStateSettings}   [setting={}]        Some settings to configure your SState instance
     * @return      {SState}                        The SState instanvce that describe your state
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    define(id, state, settings) {
        this[id] = new SStore_js_1.default(state, Object.assign({ save: this.settings.save, id }, settings));
        return this[id];
    }
}
exports.default = SStateManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHVEQUF5RDtBQUV6RCw0REFBbUM7QUE2Q25DLE1BQXFCLGFBQWMsU0FBUSxpQkFBUTtJQUMvQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBMEM7UUFDbEQsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQ0YsRUFBVSxFQUNWLEtBQVUsRUFDVixRQUFtQztRQUVuQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxtQkFBUSxDQUFDLEtBQUssa0JBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFDeEIsRUFBRSxJQUNDLFFBQVEsRUFDYixDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBekNELGdDQXlDQyJ9