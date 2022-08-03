"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const formatDuration_1 = __importDefault(require("@coffeekraken/sugar/shared/time/formatDuration"));
class SDuration {
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
        /**
         * @name            settings
         * @type            Object
         * @private
         *
         * Store the settings
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.settings = {};
        /**
         * @name            startTime
         * @type            Number
         * @private
         *
         * Store the start timestamp
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.startTime = null;
        /**
         * @name            endTime
         * @type            Number
         * @private
         *
         * Store the end timestamp
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.endTime = null;
        /**
         * @name            duration
         * @type            Number
         * @private
         *
         * Store the duration in miliseconds
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.duration = null;
        this.settings = (0, deepMerge_1.default)({}, settings);
        this.start();
    }
    /**
     * @name      toObject
     * @type      Function
     *
     * This method end the duration if needed and return an object with these properties:
     * - startTime: the start timestamp
     * - endTime: the end timestamp
     * - duration: the duration in miliseconds
     * - formatedDuration: the duration formated
     *
     * @return      {ISDurationObject}        The duration object
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    toObject(settings = {}) {
        settings = (0, deepMerge_1.default)(this.settings, settings);
        if (!this.endTime || !this.startTime)
            this.end();
        const durationMs = this.endTime - this.startTime;
        this.duration = durationMs;
        const formatedDuration = (0, formatDuration_1.default)(durationMs);
        return {
            startTime: this.startTime || -1,
            endTime: this.endTime || -1,
            duration: this.duration || -1,
            formatedDuration,
        };
    }
    /**
     * @name      start
     * @type      Function
     *
     * Start the duration process either with the current timestamp, or with a passed timestamp you prefer
     *
     * @param         {Number}            [startTime=null]            Specify the timestamp you want
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    start(startTime = null) {
        this.startTime = startTime || Date.now();
        return this;
    }
    /**
     * @name      end
     * @type      Function
     *
     * Stop the duration counter and return the result in the passed format or in the format setted in the settings
     *
     * @param       {Object}            [settings={}]           An object of settings to use
     * @return        {Mixed}                         Return the duration depending on your settings
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    end(settings = {}) {
        settings = (0, deepMerge_1.default)(this.settings, settings);
        this.endTime = Date.now();
        return this.toObject(settings);
    }
}
exports.default = SDuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRGQUFzRTtBQUN0RSxvR0FBOEU7QUFzQzlFLE1BQXFCLFNBQVM7SUFpRDFCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUExRHpCOzs7Ozs7Ozs7V0FTRztRQUNILGFBQVEsR0FBRyxFQUFFLENBQUM7UUFFZDs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRWpCOzs7Ozs7Ozs7V0FTRztRQUNILFlBQU8sR0FBRyxJQUFJLENBQUM7UUFFZjs7Ozs7Ozs7O1dBU0c7UUFDSCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBYVosSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQUMsUUFBUSxHQUFHLEVBQUU7UUFDbEIsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFakQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzNCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSx3QkFBZ0IsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUV0RCxPQUF5QjtZQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7WUFDL0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1lBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztZQUM3QixnQkFBZ0I7U0FDbkIsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUU7UUFDYixRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDSjtBQWpJRCw0QkFpSUMifQ==