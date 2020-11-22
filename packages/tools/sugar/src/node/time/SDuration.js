"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = require("../object/deepMerge");
const convert_1 = require("./convert");
/**
 * @name                SDuration
 * @namespace           sugar.js.time
 * @type                Class
 *
 * This class represent a duration tracking process. Simply instanciate it,
 * then call the ```instance.get()``` method and you will get back
 * the duration between the instanciation and the ```get``` method call
 *
 * @param       {Object}            [settings={}]           An object of settings to use
 *
 * @setting      {String}           [format='s']            Specify the format you want for your instance. Can be 'ms|millisecond(s)', 's|second(s)', 'm|minute(s)', 'h|hour(s)', 'd|day', 'w|week(s)', 'month(s)', 'y|year(s)'
 * @setting      {Boolean}          [suffix=true]             Specify if you want the duration returned with the corresponding suffix like 'ms', 's', etc...
 *
 * @example             js
 * import SDuration from '@coffeekraken/sugar/js/time/SDuration';
 * const duration = new SDuration();
 * await ...
 * console.log(duration.end());
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
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
        let durationMs = this.endTime - this.startTime;
        let durationConverted = convert_1.default(durationMs, settings.format);
        return settings.suffix ? durationConverted : parseFloat(durationConverted);
    }
}
exports.default = SDuration;
