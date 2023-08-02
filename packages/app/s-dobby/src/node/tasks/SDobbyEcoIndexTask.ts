import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDobbyTask from '../SDobbyTask';

import __SSpecs from '@coffeekraken/s-specs';

import { __ensureDirSync, __readJsonSync } from '@coffeekraken/sugar/fs';
import { __homeDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';

import { SDobbyEcoIndexTaskSpec } from '../../shared/specs';

import * as __childProcess from 'child_process';

import type {
    IEcoIndexResult,
    ISDobbyEcoIndexTaskResult,
    ISDobbyEcoIndexTaskSettings,
    ISDobbyTask,
    ISDobbyTaskMetas,
} from '../../shared/types.js';

/**
 * @name                SDobbyEcoIndexTask
 * @namespace           node
 * @type                Class
 * @extends             SDobbyTask
 * @platform            node
 * @status              beta
 *
 * This class represent an eco-index task
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
    static settingsSpecs = SDobbyEcoIndexTaskSpec;

    settings: ISDobbyEcoIndexTaskSettings;

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

    run(): Promise<ISDobbyEcoIndexTaskResult> {
        return new Promise(async (resolve) => {
            await super.start();

            const finalSettings = __SSpecs.apply(
                this.settings ?? {},
                SDobbyEcoIndexTaskSpec,
            );

            const logs: string[] = [];

            let status = 'success';

            let url = finalSettings.url;
            if (!url.match(/^https?\:\/\//)) {
                url = `https://${url}`;
            }

            const outputPath = `${__homeDir()}/.dobby/tmp`,
                outputFileName = `ecoindex-${Date.now()}.json`;

            __ensureDirSync(__path.dirname(outputPath));

            const child = __childProcess.spawn(
                [
                    `docker run --rm -v ${outputPath}:${outputPath} vvatelot/ecoindex-cli:latest ecoindex-cli`,
                    `analyze --no-interaction --url ${url} --export-format json --output-file ${outputPath}/${outputFileName}`,
                ].join(' '),
                [],
                {
                    shell: true,
                },
            );

            child.stdout.on('data', (data) => {
                console.log(data.toString());
                logs.push(data.toString());
            });

            child.stderr.on('data', (data) => {
                console.log(data.toString());
                logs.push(data.toString());
            });

            child.on('error', (error) => {
                console.log(error.message);
                logs.push(error.message);
                status = 'error';
            });

            child.on('close', () => {
                let json: IEcoIndexResult = {
                    width: -1,
                    height: -1,
                    url,
                    size: -1,
                    nodes: -1,
                    requests: -1,
                    grade: 'F',
                    score: -1,
                    ges: -1,
                    water: -1,
                    ecoindex_version: '5.4.2-1',
                    date: Date.toString(),
                    page_type: 'website',
                };

                if (!__fs.existsSync(`${outputPath}/${outputFileName}`)) {
                    status = 'error';
                    logs.push(
                        `The output file ${outputPath}/${outputFileName} does not exists...`,
                    );
                } else {
                    json = __readJsonSync(
                        `${outputPath}/${outputFileName}`,
                    )?.[0];
                    if (json.score < 33) {
                        status = 'error';
                    } else if (json.score < 66) {
                        status = 'warning';
                    } else {
                        status = 'success';
                    }

                    // delete the outputJson
                    __fs.unlinkSync(`${outputPath}/${outputFileName}`);
                }

                resolve({
                    ...super.end(),
                    ecoindex: json,
                    status,
                    logs,
                });
            });
        });
    }
}
