// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "./convert"], factory);
    }
})(function (require, exports) {
    "use strict";
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
            this.duration = durationMs;
            const convertedDuration = convert_1.default(durationMs, settings.format);
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
            settings = deepMerge_1.default(this._settings, settings);
            this.endTime = Date.now();
            return this.toObject(settings);
        }
    }
    exports.default = SDuration;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0R1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0R1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9FQUE4QztJQUM5Qyx3REFBa0M7SUFzQ2xDLE1BQXFCLFNBQVM7UUFpRDVCOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUExRHpCOzs7Ozs7Ozs7ZUFTRztZQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7WUFFZjs7Ozs7Ozs7O2VBU0c7WUFDSCxjQUFTLEdBQUcsSUFBSSxDQUFDO1lBRWpCOzs7Ozs7Ozs7ZUFTRztZQUNILFlBQU8sR0FBRyxJQUFJLENBQUM7WUFFZjs7Ozs7Ozs7O2VBU0c7WUFDSCxhQUFRLEdBQUcsSUFBSSxDQUFDO1lBYWQsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtnQkFDRSxNQUFNLEVBQUUsR0FBRztnQkFDWCxNQUFNLEVBQUUsSUFBSTthQUNiLEVBQ0QsUUFBUSxDQUNULENBQUM7WUFDRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDSCxRQUFRLENBQUMsUUFBUSxHQUFHLEVBQUU7WUFDcEIsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVqRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVqRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDM0IsTUFBTSxpQkFBaUIsR0FBRyxpQkFBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakUsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsTUFBTTtnQkFDdEMsQ0FBQyxDQUFDLGlCQUFpQjtvQkFDakIsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDaEUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRWxDLE9BQXlCO2dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO2dCQUM3QixpQkFBaUI7Z0JBQ2pCLGdCQUFnQjthQUNqQixDQUFDO1FBQ0osQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUk7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3pDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFO1lBQ2YsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsQ0FBQztLQUNGO0lBNUlELDRCQTRJQyJ9