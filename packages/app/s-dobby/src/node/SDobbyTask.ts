import __SClass from '@coffeekraken/s-class';

import { __uniqid } from '@coffeekraken/sugar/string';

import { __publicIpAddress } from '@coffeekraken/sugar/network';

import __SDuration from '@coffeekraken/s-duration';

import __SDobby from './SDobby.js';

import {
    ISDobbyLighthouseTaskSettings,
    ISDobbyReporter,
    ISDobbyReporterMetas,
    ISDobbyResponseTimeTaskSettings,
    ISDobbyTaskResult,
} from './exports';
import type { ISDobbyTaskMetas, ISDobbyTaskSettings } from './types';

/**
 * @name                SDobbyTask
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a base task
 *
 * @param           {ISDobbyTaskSettings}          [settings={}]           Some settings to configure your dobby task instance
 *
 * @example         js
 * import { __SDobbyTask } from '@coffeekraken/s-dobby';
 * export default class MyCoolDobbyAdapter extends __SDobbyTask {
 *   // ...
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDobbyTask extends __SClass {
    /**
     * @name        metas
     * @type        Object
     *
     * Store the task metas
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    metas: ISDobbyTaskMetas;

    /**
     * @name        settings
     * @type        Object
     *
     * Store the task settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    settings: ISDobbyResponseTimeTaskSettings | ISDobbyLighthouseTaskSettings;

    /**
     * @name        reporterMetas
     * @type        Object
     *
     * Store the task reporter metas
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    reporterMetas: ISDobbyReporterMetas;

    /**
     * @name        reporter
     * @type        Object
     *
     * Store the task reporter
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    reporter: ISDobbyReporter;

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(taskMetas?: ISDobbyTaskMetas) {
        super();
        this.metas = taskMetas;
        this.settings = taskMetas.settings;
        this.reporterMetas = taskMetas.reporter;

        if (this.reporterMetas) {
            if (!__SDobby.registeredReporters[this.reporterMetas.type]) {
                throw new Error(
                    `The requested "${this.reporterMetas.type}" reporter is not registered...}"`,
                );
            }

            // @ts-ignore
            this.reporter = new __SDobby.registeredReporters[
                this.reporterMetas.type
            ](this.reporterMetas);
        }
    }

    _time;
    _duration;
    _geo;

    async start() {
        console.log(
            `<yellow>[SDobby]</yellow> Starting <magenta>${this.metas.name} (${this.metas.type})</magenta> task...`,
        );
        this._time = Date.now();
        this._duration = new __SDuration();

        await this._getGeo();

        return true;
    }

    async _getGeo() {
        const headers = new Headers();
        headers.set(
            'Authorization',
            'Basic ' +
                Buffer.from(
                    `897136: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`,
                ).toString('base64'),
        );
        const publicIp = await __publicIpAddress();
        const response = await fetch(
            `https://geolite.info/geoip/v2.1/city/${publicIp}`,
            {
                method: 'GET',
                headers: headers,
            },
        );
        const geoJson = await response.json();
        this._geo = {
            country: {
                iso: geoJson.country.iso_code,
                name: geoJson.country.names.en,
            },
            city: {
                code: geoJson.postal.code,
                name: geoJson.city.names.en,
            },
            timezone: geoJson.location.time_zone,
            lat: geoJson.location.latitude,
            lng: geoJson.location.longitude,
        };
    }

    async end(data: any = {}): Promise<ISDobbyTaskResult> {
        const durationObj = this._duration.end();
        console.log(
            `<green>[SDobby]</green> Task <magenta>${this.metas.name} (${this.metas.type})</magenta> finished <green>successfully</green> in <cyan>${durationObj.formatedDuration}</cyan>`,
        );

        const finalResult = {
            uid: __uniqid(),
            time: this._time,
            geo: this._geo,
            duration: durationObj,
            task: this.metas,
            data,
        };

        // report if specified
        if (this.reporter) {
            await this.reporter.report(finalResult);
        }

        return finalResult;
    }
}
