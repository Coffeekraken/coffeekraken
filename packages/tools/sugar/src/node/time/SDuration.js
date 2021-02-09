"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const convert_1 = __importDefault(require("./convert"));
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
}
exports.default = SDuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0R1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0R1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVixvRUFBOEM7QUFDOUMsd0RBQWtDO0FBc0NsQyxNQUFxQixTQUFTO0lBaUQ1Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBMUR6Qjs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFHLElBQUksQ0FBQztRQUVqQjs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBRWY7Ozs7Ozs7OztXQVNHO1FBQ0gsYUFBUSxHQUFHLElBQUksQ0FBQztRQWFkLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7WUFDRSxNQUFNLEVBQUUsR0FBRztZQUNYLE1BQU0sRUFBRSxJQUFJO1NBQ2IsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FBQyxRQUFRLEdBQUcsRUFBRTtRQUNwQixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFakQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pELE1BQU0saUJBQWlCLEdBQUcsaUJBQVMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLE1BQU07WUFDdEMsQ0FBQyxDQUFDLGlCQUFpQjtZQUNuQixDQUFDLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbEMsT0FBeUI7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7WUFDN0IsZ0JBQWdCO1NBQ2pCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSTtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUU7UUFDZixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0Y7QUF6SUQsNEJBeUlDIn0=