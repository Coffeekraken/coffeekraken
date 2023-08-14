import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDobbyTask from '../SDobbyTask';

import { __ttfb } from '@coffeekraken/sugar/network';

import __SSpecs from '@coffeekraken/s-specs';

import __ping from 'ping';

import { SDobbyResponseTimeTaskSpec } from '../../shared/specs';

import type {
    ISDobbyResponseTimeTaskSettings,
    ISDobbyTask,
    ISDobbyTaskMetas,
    ISDobbyTaskResult,
} from '../../shared/types.js';

/**
 * @name                SDobbyResponseTimeTask
 * @namespace           node
 * @type                Class
 * @extends             SDobbyTask
 * @platform            node
 * @status              beta
 *
 * This class represent a response time task
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

export default class SDobbyTask extends __SDobbyTask implements ISDobbyTask {
    static settingsSpecs = SDobbyResponseTimeTaskSpec;

    settings: ISDobbyResponseTimeTaskSettings;

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
        super(__deepMerge({}, taskMetas ?? {}));
    }

    run(): Promise<ISDobbyTaskResult> {
        return new Promise(async (resolve) => {
            await super.start();

            const finalSettings = __SSpecs.apply(
                this.settings ?? {},
                SDobbyResponseTimeTaskSpec,
            );

            let res = await __ping.promise.probe(
                this.settings.url.replace(/^https?\:\/\//, ''),
                {
                    timeout: finalSettings.timeout / 1000,
                },
            );

            const responseTime = res.alive ? parseFloat(res.avg) : -1;
            const ttfb = await __ttfb(this.settings.url, {
                timeout: finalSettings.timeout,
            });

            let status = 'success';
            if (responseTime === -1 || ttfb === -1) {
                status = 'error';
            } else {
                if (responseTime > 100) {
                    status = 'warning';
                }
                if (ttfb > 150) {
                    status = 'warning';
                }
            }

            const finalResult = await super.end({
                alive: res.alive,
                status,
                responseTime,
                ttfb: ttfb.ttfb,
                logs: [res.output],
            });

            resolve(finalResult);
        });
    }
}
