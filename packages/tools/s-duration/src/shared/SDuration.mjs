// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __convert from '@coffeekraken/sugar/shared/time/convert';
export default class SDuration {
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
        this._settings = __deepMerge({
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
        settings = __deepMerge(this._settings, settings);
        if (!this.endTime || !this.startTime)
            this.end();
        const durationMs = this.endTime - this.startTime;
        this.duration = durationMs;
        const convertedDuration = __convert(durationMs, settings.format);
        const formatedDuration = settings.suffix
            ? convertedDuration +
                (settings.suffix === true ? settings.format : settings.suffix)
            : parseFloat(convertedDuration);
        return {
            startTime: this.startTime || -1,
            endTime: this.endTime || -1,
            duration: this.duration || -1,
            convertedDuration,
            formatedDuration
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
        settings = __deepMerge(this._settings, settings);
        this.endTime = Date.now();
        return this.toObject(settings);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0R1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvcy1kdXJhdGlvbi9zcmMvc2hhcmVkL1NEdXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxTQUFTLE1BQU0seUNBQXlDLENBQUM7QUF1Q2hFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBUztJQWlENUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQTFEekI7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFakI7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBTyxHQUFHLElBQUksQ0FBQztRQUVmOzs7Ozs7Ozs7V0FTRztRQUNILGFBQVEsR0FBRyxJQUFJLENBQUM7UUFhZCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FDMUI7WUFDRSxNQUFNLEVBQUUsR0FBRztZQUNYLE1BQU0sRUFBRSxJQUFJO1NBQ2IsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FBQyxRQUFRLEdBQUcsRUFBRTtRQUNwQixRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztZQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVqRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDM0IsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRSxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxNQUFNO1lBQ3RDLENBQUMsQ0FBQyxpQkFBaUI7Z0JBQ2pCLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDaEUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWxDLE9BQXlCO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztZQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1lBQzdCLGlCQUFpQjtZQUNqQixnQkFBZ0I7U0FDakIsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRTtRQUNmLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNGIn0=