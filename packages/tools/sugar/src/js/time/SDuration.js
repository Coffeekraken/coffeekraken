// @ts-nocheck
// @shared
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
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var convert_1 = __importDefault(require("./convert"));
    var SDuration = /** @class */ (function () {
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
        function SDuration(settings) {
            if (settings === void 0) { settings = {}; }
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
        SDuration.prototype.toObject = function (settings) {
            if (settings === void 0) { settings = {}; }
            settings = deepMerge_1.default(this._settings, settings);
            if (!this.endTime || !this.startTime)
                this.end();
            var durationMs = this.endTime - this.startTime;
            this.duration = durationMs;
            var convertedDuration = convert_1.default(durationMs, settings.format);
            var formatedDuration = settings.suffix
                ? convertedDuration +
                    (settings.suffix === true ? settings.format : settings.suffix)
                : parseFloat(convertedDuration);
            return {
                startTime: this.startTime || -1,
                endTime: this.endTime || -1,
                duration: this.duration || -1,
                convertedDuration: convertedDuration,
                formatedDuration: formatedDuration
            };
        };
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
        SDuration.prototype.start = function (startTime) {
            if (startTime === void 0) { startTime = null; }
            this.startTime = startTime || Date.now();
            return this;
        };
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
        SDuration.prototype.end = function (settings) {
            if (settings === void 0) { settings = {}; }
            settings = deepMerge_1.default(this._settings, settings);
            this.endTime = Date.now();
            return this.toObject(settings);
        };
        return SDuration;
    }());
    exports.default = SDuration;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0R1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0R1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixrRUFBOEM7SUFDOUMsc0RBQWtDO0lBc0NsQztRQWlERTs7Ozs7Ozs7O1dBU0c7UUFDSCxtQkFBWSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO1lBMUR6Qjs7Ozs7Ozs7O2VBU0c7WUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1lBRWY7Ozs7Ozs7OztlQVNHO1lBQ0gsY0FBUyxHQUFHLElBQUksQ0FBQztZQUVqQjs7Ozs7Ozs7O2VBU0c7WUFDSCxZQUFPLEdBQUcsSUFBSSxDQUFDO1lBRWY7Ozs7Ozs7OztlQVNHO1lBQ0gsYUFBUSxHQUFHLElBQUksQ0FBQztZQWFkLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7Z0JBQ0UsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsTUFBTSxFQUFFLElBQUk7YUFDYixFQUNELFFBQVEsQ0FDVCxDQUFDO1lBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsNEJBQVEsR0FBUixVQUFTLFFBQWE7WUFBYix5QkFBQSxFQUFBLGFBQWE7WUFDcEIsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVqRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVqRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDM0IsSUFBTSxpQkFBaUIsR0FBRyxpQkFBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakUsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsTUFBTTtnQkFDdEMsQ0FBQyxDQUFDLGlCQUFpQjtvQkFDakIsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDaEUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRWxDLE9BQXlCO2dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO2dCQUM3QixpQkFBaUIsbUJBQUE7Z0JBQ2pCLGdCQUFnQixrQkFBQTthQUNqQixDQUFDO1FBQ0osQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCx5QkFBSyxHQUFMLFVBQU0sU0FBZ0I7WUFBaEIsMEJBQUEsRUFBQSxnQkFBZ0I7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3pDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsdUJBQUcsR0FBSCxVQUFJLFFBQWE7WUFBYix5QkFBQSxFQUFBLGFBQWE7WUFDZixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzFCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0gsZ0JBQUM7SUFBRCxDQUFDLEFBNUlELElBNElDIn0=