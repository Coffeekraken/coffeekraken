import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDobbyTask from '../SDobbyTask';

import { __homeDir } from '@coffeekraken/sugar/path';

import __SSpecs from '@coffeekraken/s-specs';

import type {
    ISDobbyLighthouseTaskResult,
    ISDobbyTask,
    ISDobbyTaskMetas,
} from '../../shared/types.js';

// import __lighthouse from 'lighthouse/';
import * as __childProcess from 'child_process';

/**
 * @name                SDobbyLighthouseTask
 * @namespace           node
 * @type                Class
 * @extends             SDobbyTask
 * @platform            node
 * @status              beta
 *
 * This class represent a lighthouse task
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

export const SDobbyLighthouseTaskSettingsSpecs = {
    type: 'Object',
    title: 'Lighthouse settings',
    description: 'Specify some settings for your lighthouse task',
    props: {},
};

export default class SDobbyLighthouseTask
    extends __SDobbyTask
    implements ISDobbyTask
{
    static settingsSpecs = SDobbyLighthouseTaskSettingsSpecs;

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

    run(): Promise<ISDobbyLighthouseTaskResult> {
        super.start();

        return new Promise(async (resolve) => {
            const finalSettings = __SSpecs.apply(
                this.metas.settings ?? {},
                SDobbyLighthouseTaskSettingsSpecs,
            );

            const command = __childProcess.spawn(
                `npx lighthouse https://coffeekraken.io --chrome-flags="--headless --window-size=1280,1080" --output=json --only-categories=accessibility,best-practices,performance,pwa,seo --output-path="${__homeDir()}/report.json"`,
                [],
                {
                    shell: true,
                    // maxBuffer: 1024 * 1024 * 100,
                },
            );

            command.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            command.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });

            command.on('error', (error) => {
                console.log(`error: ${error.message}`);
            });

            command.on('close', (code) => {
                let status = 'success';
                resolve({
                    ...super.end(),
                    status,
                });

                console.log(`child process exited with code ${code}`);
            });
        });
    }
}
