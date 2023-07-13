import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDobbyTask from '../SDobbyTask';

import __SSpecs from '@coffeekraken/s-specs';

import __ping from 'ping';

import { ISDobbyTaskResult } from '../types';
import type { ISDobbyResponseTimeTaskMetas, ISDobbyTask } from './types';

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

export const SDobbyResponseTimeTaskSettingsSpecs = {
    type: 'Object',
    title: 'Response time settings',
    description: 'Specify some settings for your responseTime task',
    props: {
        timeout: {
            type: 'Number',
            title: 'Timeout (ms)',
            description:
                'Specify a timeout in ms before considering the target as offline',
            default: 10000,
        },
    },
};

export default class SDobbyTask extends __SDobbyTask implements ISDobbyTask {
    static settingsSpecs = SDobbyResponseTimeTaskSettingsSpecs;

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
    constructor(taskMetas?: ISDobbyResponseTimeTaskMetas) {
        super(__deepMerge({}, taskMetas ?? {}));
    }

    async run(): Promise<ISDobbyResponseTimeTaskResult> {
        super.start();

        const finalSettings = __SSpecs.apply(
            this.metas.settings ?? {},
            SDobbyResponseTimeTaskSettingsSpecs,
        );

        let res = await __ping.promise.probe('coffeekraken.io', {
            timeout: finalSettings.timeout,
        });

        return {
            ...super.end(),
            alive: res.alive,
            responseTime: parseFloat(res.avg),
            logs: [res.output],
        };
    }
}
