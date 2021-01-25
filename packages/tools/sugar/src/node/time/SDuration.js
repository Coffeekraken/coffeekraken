"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const convert_1 = __importDefault(require("./convert"));
module.exports = class SDuration {
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
         * @name            _settings
         * @type            Object
         * @private
         *
         * Store the settings
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._settings = {};
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
        this._settings = deepMerge_1.default({
            format: 's',
            suffix: true
        }, settings);
        this.start();
    }
    /**
     * @name      start
     * @type      Function
     *
     * Start the duration process either with the current timestamp, or with a passed timestamp you prefer
     *
     * @param         {Number}            [startTime=null]            Specify the timestamp you want
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    start(startTime = null) {
        this.startTime = startTime || Date.now();
    }
    /**
     * @name      end
     * @type      Function
     *
     * Stop the duration counter and return the result in the passed format or in the format setted in the settings
     *
     * @param       {Object}            [settings={}]           An object of settings to use
     * @return        {Mixed}                         Return the duration depending on your settings
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    end(settings = {}) {
        settings = deepMerge_1.default(this._settings, settings);
        this.endTime = Date.now();
        const durationMs = this.endTime - this.startTime;
        const durationConverted = convert_1.default(durationMs, settings.format);
        return settings.suffix ? durationConverted : parseFloat(durationConverted);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0R1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0R1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLG9FQUE4QztBQUM5Qyx3REFBa0M7QUE4QmxDLGlCQUFTLE1BQU0sU0FBUztJQXFDdEI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQTlDekI7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFakI7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBTyxHQUFHLElBQUksQ0FBQztRQWFiLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7WUFDRSxNQUFNLEVBQUUsR0FBRztZQUNYLE1BQU0sRUFBRSxJQUFJO1NBQ2IsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUU7UUFDZixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTFCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqRCxNQUFNLGlCQUFpQixHQUFHLGlCQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqRSxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM3RSxDQUFDO0NBQ0YsQ0FBQyJ9