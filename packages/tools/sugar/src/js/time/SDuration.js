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
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    var convert_1 = __importDefault(require("./convert"));
    return /** @class */ (function () {
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
            this._settings = deepMerge_2.default({
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
        SDuration.prototype.start = function (startTime) {
            if (startTime === void 0) { startTime = null; }
            this.startTime = startTime || Date.now();
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
            settings = deepMerge_2.default(this._settings, settings);
            this.endTime = Date.now();
            var durationMs = this.endTime - this.startTime;
            var durationConverted = convert_1.default(durationMs, settings.format);
            return settings.suffix ? durationConverted : parseFloat(durationConverted);
        };
        return SDuration;
    }());
});
