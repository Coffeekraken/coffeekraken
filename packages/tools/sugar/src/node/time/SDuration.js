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
        this._settings = deepMerge_1.default({
            format: 's',
            suffix: true
        }, settings);
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
        settings = deepMerge_1.default(this._settings, settings);
        if (!this.endTime || !this.startTime)
            this.end();
        const durationMs = this.endTime - this.startTime;
        const durationConverted = convert_1.default(durationMs, settings.format);
        const formatedDuration = settings.suffix
            ? durationConverted
            : parseFloat(durationConverted);
        return {
            startTime: this.startTime || -1,
            endTime: this.endTime || -1,
            duration: this.duration || -1,
            formatedDuration
        };
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
        return this;
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
        return this.toObject(settings);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0R1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0R1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLG9FQUE4QztBQUM5Qyx3REFBa0M7QUFzQ2xDLGlCQUFTLE1BQU0sU0FBUztJQWlEdEI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQTFEekI7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFakI7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBTyxHQUFHLElBQUksQ0FBQztRQUVmOzs7Ozs7Ozs7V0FTRztRQUNILGFBQVEsR0FBRyxJQUFJLENBQUM7UUFhZCxJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQzFCO1lBQ0UsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUUsSUFBSTtTQUNiLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQUMsUUFBUSxHQUFHLEVBQUU7UUFDcEIsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWpELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqRCxNQUFNLGlCQUFpQixHQUFHLGlCQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRSxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxNQUFNO1lBQ3RDLENBQUMsQ0FBQyxpQkFBaUI7WUFDbkIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWxDLE9BQXlCO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztZQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1lBQzdCLGdCQUFnQjtTQUNqQixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUk7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2YsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNGLENBQUMifQ==