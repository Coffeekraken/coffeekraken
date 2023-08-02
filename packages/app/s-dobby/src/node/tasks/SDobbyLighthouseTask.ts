import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDobbyTask from '../SDobbyTask';

import __SSpecs from '@coffeekraken/s-specs';
import { __ensureDirSync } from '@coffeekraken/sugar/fs';
import { __homeDir } from '@coffeekraken/sugar/path';

import __fs from 'fs';
import __path from 'path';

import { SDobbyLighthouseTaskSpec } from '../../shared/specs';

import type {
    ISDobbyLighthouseTaskResult,
    ISDobbyLighthouseTaskSettings,
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

export default class SDobbyLighthouseTask
    extends __SDobbyTask
    implements ISDobbyTask
{
    static settingsSpecs = SDobbyLighthouseTaskSpec;

    settings: ISDobbyLighthouseTaskSettings;

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
        return new Promise(async (resolve) => {
            await super.start();

            const finalSettings = __SSpecs.apply(
                this.metas.settings ?? {},
                SDobbyLighthouseTaskSpec,
            );

            const logs: string[] = [];
            const result: ISDobbyLighthouseTaskResult = {};
            const outputJsonPath = `${__homeDir()}/.dobby/tmp/lighthouse${Date.now()}.json`;

            __ensureDirSync(__path.dirname(outputJsonPath));

            const command = __childProcess.spawn(
                `npx lighthouse https://coffeekraken.io --chrome-flags="--headless --window-size=1280,1080" --output=json --only-categories=accessibility,best-practices,performance,pwa,seo --output-path="${outputJsonPath}"`,
                [],
                {
                    shell: true,
                },
            );

            let status = 'success';

            command.stdout.on('data', (data) => {
                console.log(data.toString());
                logs.push(data.toString());
            });

            command.stderr.on('data', (data) => {
                console.log(data.toString());
                logs.push(data.toString());
            });

            command.on('error', (error) => {
                console.log(error.message);
                logs.push(error.message);
                status = 'error';
            });

            command.on('close', (code) => {
                // read the output json
                const outputJson: any = JSON.parse(
                    __fs.readFileSync(outputJsonPath).toString(),
                );

                // delete the outputJson
                __fs.unlinkSync(outputJsonPath);

                // build the final result object
                result.lighthouseVersion = outputJson.lighthouseVersion;
                result.requestedUrl = outputJson.requestedUrl;
                result.userAgent = outputJson.userAgent;
                result.audits = {};
                for (let [auditId, audit] of Object.entries(
                    outputJson.audits,
                )) {
                    if (
                        [
                            'largest-contentful-paint',
                            'max-potential-fid',
                            'cumulative-layout-shift',
                        ].includes(auditId) ||
                        (audit.score !== undefined && audit.score <= 0.33)
                    ) {
                        result.audits[auditId] = {
                            id: audit.id,
                            title: audit.title,
                            description: audit.description,
                            score: audit.score,
                            displayValue: audit.displayValue,
                        };
                    }
                }
                result.categories = {};
                for (let [categoryId, category] of Object.entries(
                    outputJson.categories ?? {},
                )) {
                    result.categories[categoryId] = {
                        title: category.title,
                        score: category.score,
                        audits: [],
                    };
                    for (let [i, audit] of category.auditRefs.entries()) {
                        if (result.audits[audit.id]) {
                            result.categories[categoryId].audits.push(audit.id);
                        }
                    }
                }
                result.entities = [];
                for (let [i, entity] of outputJson.entities.entries()) {
                    result.entities.push({
                        name: entity.name,
                        origins: entity.origins,
                        homepage: entity.homepage,
                        category: entity.category,
                    });
                }
                result.screenshot = {
                    data: outputJson.fullPageScreenshot.screenshot.data,
                    width: outputJson.fullPageScreenshot.screenshot.width,
                    height: outputJson.fullPageScreenshot.screenshot.height,
                };

                // save the json
                __fs.writeFileSync(
                    `${__homeDir()}/.dobby/lighthouse.json`,
                    JSON.stringify(result, null, 4),
                );

                // check status
                let total = 0;
                for (let [id, category] of Object.entries(
                    result.categories ?? {},
                )) {
                    total += category.score * 100;
                }
                const categoriesCount = Object.keys(
                        result.categories ?? {},
                    ).length,
                    globalScore = Math.round(
                        (100 / (100 * categoriesCount)) * total,
                    );

                if (globalScore < 33) {
                    status = 'error';
                } else if (globalScore < 66) {
                    status = 'warning';
                }

                resolve({
                    ...super.end(),
                    ...result,
                    status,
                    logs,
                });
            });
        });
    }
}
