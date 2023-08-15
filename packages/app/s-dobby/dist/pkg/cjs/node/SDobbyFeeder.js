"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
// import __SPromise from '@coffeekraken/s-promise';
const object_1 = require("@coffeekraken/sugar/object");
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
/**
 * @name                SDobbyFeeder
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a base feeder to feed Dobby with things to do
 *
 * @event           feeder.ready          Emitted when the feeder is ready
 * @event           feeder.task.add           Emitted when a new task is added
 * @event           feeder.task.remove        Emitted when a task is removed
 *
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyFeederMetas}          feederMetas       The informations about the feeder like name, uid, etc...
 * @param           {ISDobbyFeederSettings}          [settings={}]           Some settings to configure your dobby feeder instance
 *
 * @example         js
 * import { __SDobbyFeeder } from '@coffeekraken/s-dobby';
 * export default class MyCoolDobbyFeeder extends __SDobbyFeeder {
 *   // ...
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDobbyFeeder extends s_class_1.default {
    /**
     * @name        uid
     * @type        String
     *
     * Store the dobby uid
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get uid() {
        return this.metas.uid;
    }
    get started() {
        return this._started;
    }
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
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        events
         * @type        String
         *
         * Store the SEventEmitter instance that will emit events like "ready", etc...
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.events = new s_event_emitter_1.default();
        /**
         * @name        started
         * @type        Boolean
         *
         * Store if the feeder is started or not
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._started = false;
        this.dobby = dobby;
        this.metas = feederMetas;
    }
    /**
     * @name        start
     * @type        Function
     * @async
     *
     * Start the dobby ppol work for the good, the bad and the ugly
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // feeder started
            this._started = true;
            // ready
            this.dobby.events.emit('feeder.ready', this);
            // resolve
            resolve();
        }));
    }
}
exports.default = SDobbyFeeder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9EQUFvRDtBQUNwRCx1REFBeUQ7QUFFekQsb0ZBQTREO0FBVzVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILE1BQXFCLFlBQWEsU0FBUSxpQkFBUTtJQW9DOUM7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLEdBQUc7UUFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFZRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksS0FBZSxFQUNmLFdBQStCLEVBQy9CLFFBQWdDO1FBRWhDLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFyRDNDOzs7Ozs7OztXQVFHO1FBQ0gsV0FBTSxHQUFvQixJQUFJLHlCQUFlLEVBQUUsQ0FBQztRQWVoRDs7Ozs7Ozs7V0FRRztRQUNILGFBQVEsR0FBRyxLQUFLLENBQUM7UUFxQmIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUs7UUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRXJCLFFBQVE7WUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTdDLFVBQVU7WUFDVixPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUF6R0QsK0JBeUdDIn0=