// @ts-nocheck

import { __formatDuration } from '@coffeekraken/sugar/datetime';
import { __deepMerge } from '@coffeekraken/sugar/object';

/**
 * @name                SDuration
 * @namespace           shared
 * @type                Class
 * @platform            node
 * @platform            js
 * @status              beta
 *
 * This class represent a duration tracking process. Simply instanciate it,
 * then call the ```instance.get()``` method and you will get back
 * the duration between the instanciation and the ```get``` method call
 *
 * @param       {Object}            [settings={}]           An object of settings to use
 *
 * @setting      {String}           [format='s']            Specify the format you want for your instance. Can be 'ms|millisecond(s)', 's|second(s)', 'm|minute(s)', 'h|hour(s)', 'd|day', 'w|week(s)', 'month(s)', 'y|year(s)'
 * @setting      {Boolean}          [suffix=true]             Specify if you want the duration returned with the corresponding suffix like 'ms', 's', etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         new __SDuration()
 * const duration = new __SDuration();
 * // ...
 * console.log(duration.end().formatedDuration);
 * 
 * @example             js
 * import __SDuration from '@coffeekraken/s-duration';
 * const duration = new __SDuration();
 * await ...
 * console.log(duration.end());
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISDurationObject {
    startTime: number;
    endTime: number;
    duration: number;
    formatedDuration: string;
}

export default class SDuration {
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
    settings = {};

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
    startTime = null;

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
    endTime = null;

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
    duration = null;

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
        this.settings = __deepMerge({}, settings);
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
    toObject(settings = {}): ISDurationObject {
        settings = __deepMerge(this.settings, settings);

        if (!this.endTime || !this.startTime) this.end();

        const durationMs = this.endTime - this.startTime;
        this.duration = durationMs;
        const formatedDuration = __formatDuration(durationMs);

        return <ISDurationObject>{
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
        settings = __deepMerge(this.settings, settings);
        this.endTime = Date.now();
        return this.toObject(settings);
    }
}
