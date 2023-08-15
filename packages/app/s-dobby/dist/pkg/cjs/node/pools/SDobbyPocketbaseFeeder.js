"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cjs_1 = __importDefault(require("pocketbase/cjs"));
const SDobbyFeeder_js_1 = __importDefault(require("../SDobbyFeeder.js"));
global.EventSource = EventSource;
/**
 * @name                SDobbyPocketbaseFeeder
 * @namespace           node
 * @type                Class
 * @extends             SDobbyFeeder
 * @platform            node
 * @status              beta
 *
 * This class represent the pocketbase dobby feeder.
 *
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyPoolMetas}          poolMetas       The informations about the pool like name, uid, etc...
 * @param           {ISDobbyPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDobbyPocketbaseFeeder extends SDobbyFeeder_js_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(dobby, feederMetas, settings) {
        super(dobby, feederMetas, settings);
        this._pocketbase = new cjs_1.default(this.settings.url);
    }
}
exports.default = SDobbyPocketbaseFeeder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseURBQTBDO0FBRTFDLHlFQUFnRDtBQVVoRCxNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUVqQzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQXFCLHNCQUNqQixTQUFRLHlCQUFjO0lBT3RCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksS0FBZSxFQUNmLFdBQStCLEVBQy9CLFFBQTBDO1FBRTFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxhQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0o7QUExQkQseUNBMEJDIn0=