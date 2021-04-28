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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0R1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0R1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFNBQVMsTUFBTSx5Q0FBeUMsQ0FBQztBQXVDaEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFTO0lBaUQ1Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBMUR6Qjs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFHLElBQUksQ0FBQztRQUVqQjs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBRWY7Ozs7Ozs7OztXQVNHO1FBQ0gsYUFBUSxHQUFHLElBQUksQ0FBQztRQWFkLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUMxQjtZQUNFLE1BQU0sRUFBRSxHQUFHO1lBQ1gsTUFBTSxFQUFFLElBQUk7U0FDYixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsUUFBUSxDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ3BCLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWpELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMzQixNQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLE1BQU07WUFDdEMsQ0FBQyxDQUFDLGlCQUFpQjtnQkFDakIsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNoRSxDQUFDLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbEMsT0FBeUI7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7WUFDN0IsaUJBQWlCO1lBQ2pCLGdCQUFnQjtTQUNqQixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUk7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2YsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0YifQ==