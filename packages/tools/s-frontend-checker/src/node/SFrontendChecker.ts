// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import { __splitEvery } from '@coffeekraken/sugar/string';
import puppeteer from 'puppeteer';
import __SFrontendChecker from '../shared/SFrontendChecker';

/**
 * @name                SFrontendChecker
 * @namespace            node
 * @type                Class
 * @platform            node
 * @status              wip
 *
 * This class allows you to run the SFrontendChecker tool on any website and get back a score as well as details
 * about what can be optimised, etc...
 *
 * @param           {Object}                [settings={}]           An object of settings to configure your glob instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SFrontendChecker from '@coffeekraken/s-frontend-checker';
 * const checker = new SFrontendChecker();
 * const insights = await checker.check();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISFrontendCheckerCheckParams {
    url: string;
    includeLazy: boolean;
}

export default class SFrontendChecker
    extends __SFrontendChecker
    implements ISFrontendChecker
{
    _areChecksRunning = false;

    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @since          2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings: Partial<ISFrontendCheckerSettings> = {}) {
        super(settings);
    }

    /**
     * @name            isChecking
     * @type            Function
     *
     * Return true if a check is occuring, false if not
     *
     * @return      {Boolean}               true if a check is occuring, false if not
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isChecking(): boolean {
        return this._areChecksRunning;
    }

    /**
     * @name          check
     * @type          Function
     * @async
     *
     * Check the passed context and returns some insights about what is good and what's not.
     *
     * @since          2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    check(
        params?: ISFrontendCheckerCheckParams,
    ): Promise<ISFrontendCheckerCheckResult> {
        const finalParams = <ISFrontendCheckerCheckParams>{
            includeLazy: false,
            ...(params ?? {}),
        };

        if (!finalParams.url?.match(/^https?\:\/\//)) {
            finalParams.url = `https://${finalParams.url}`;
        }

        const span = 25;
        function pan(str) {
            let finalStr = str.trim();

            const cleanedStr = finalStr
                .replace(/<\/?[a-zA-Z0-9]+>/gm, '')
                .replace(/\%space/gm, '');

            if (!cleanedStr) {
                return ' '.repeat(span - 2);
            }

            finalStr = finalStr.replace(
                /\s?\%space\s?/,
                ' '.repeat(span - cleanedStr.length),
            );

            return finalStr;
        }

        function processLine(str: string): string {
            return str
                .replace(/\|/gm, '<grey>│</grey>')
                .replace(
                    '---',
                    `<grey>${`⎯`.repeat(process.stdout.columns - 4)}</grey>`,
                );
        }

        let lastCheckName,
            lastCheckLines = 0;
        function logCheck(checkObj) {
            // exclude all non SFrontendChecker related logs
            if (typeof checkObj === 'string' && !checkObj.startsWith?.('!')) {
                return;
            }

            if (typeof checkObj === 'string' && checkObj.startsWith('!')) {
                console.log(processLine(checkObj.replace(/^\!/, '')));
                return;
            }

            let statusColor = 'yellow';
            if (checkObj.result?.status) {
                switch (checkObj.result.status) {
                    case SFrontendChecker.STATUS_ERROR:
                        statusColor = 'red';
                        break;
                    case SFrontendChecker.STATUS_WARNING:
                        statusColor = 'yellow';
                        break;
                    case SFrontendChecker.STATUS_SUCCESS:
                        statusColor = 'green';
                        break;
                }
            }

            if (
                lastCheckName &&
                lastCheckName === checkObj.name &&
                lastCheckLines
            ) {
                process.stdout.moveCursor(0, lastCheckLines * -1);
                process.stdout.cursorTo(0);
                process.stdout.clearScreenDown();
            }

            let value = checkObj.description ?? '';

            if (
                checkObj.result &&
                checkObj.result.status !== SFrontendChecker.STATUS_SUCCESS
            ) {
                value = [checkObj.result.message];
                if (checkObj.result.example) {
                    value = [
                        ...value,
                        ' ',
                        '<grey>Example</grey>',
                        checkObj.result.example,
                    ];
                }
                if (checkObj.result.moreLink) {
                    value = [
                        ...value,
                        ' ',
                        '<grey>More</grey>',
                        `<cyan>${checkObj.result.moreLink}</cyan>`,
                    ];
                }
                value = value.join('\n');
            }

            let lines = value.split('\n');

            if (checkObj.logs.length) {
                lines = [...lines, ` `, `${checkObj.logs.pop()}`];
            }

            let finalLines: string[] = [];
            lines.forEach((line) => {
                const lns = __splitEvery(
                    line,
                    process.stdout.columns - 4 - 4 - span,
                );
                finalLines = [...finalLines, ...(lns ?? [])];
            });
            // console.log(finalLines);
            let clearLines = 0;
            if (
                lastCheckName &&
                lastCheckName !== checkObj.name &&
                lastCheckLines
            ) {
                clearLines = lastCheckLines;
            }
            console.log(
                processLine(
                    `${pan(
                        `<${statusColor}>${checkObj.name}</${statusColor}> %space`,
                    )} | ${finalLines[0]}`,
                ),
            );
            for (let i = 0; i < finalLines.length; i++) {
                if (i === 0) continue;
                console.log(
                    processLine(`${pan(`%space`)}  | ${finalLines[i]}`),
                );
            }

            console.log(processLine('---'));

            // update last check name
            lastCheckName = checkObj.name;
            lastCheckLines = finalLines.length + 1;
        }

        return new __SPromise(async ({ resolve, emit }) => {
            const browser = await puppeteer.launch({
                headless: 'new',
            });
            const page = await browser.newPage();
            await page.goto(finalParams.url, {
                waitUntil: 'domcontentloaded',
            });
            await page.setViewport({ width: 1920, height: 1280 });

            // add a flag to be able to detect pupetter in the page execution
            await page.addScriptTag({
                content: `window.isPuppeteer = true;`,
            });

            let lastLogLines = 0;
            page.on('console', async (checkObjOrString) => {
                let str = checkObjOrString.text().replace(/█/gm, '').trim();

                const fetchAssetsMatches = str.match(/^fetchAsset:(.*)/);
                if (fetchAssetsMatches?.[1]) {
                    const fetchAssetUrl = fetchAssetsMatches[1];

                    let length = 0;

                    // try head request first
                    const headController = new AbortController();
                    const headTimeoutId = setTimeout(
                        () => headController.abort(),
                        3000,
                    );
                    try {
                        const headRequest = await fetch(fetchAssetUrl, {
                            method: 'HEAD',
                            signal: headController.signal,
                        });
                        length = await headRequest.headers.get(
                            'content-length',
                        );
                    } catch (error) {
                        // console.log(error);
                    } finally {
                        clearTimeout(headTimeoutId);
                    }

                    if (!length) {
                        const getController = new AbortController();
                        const getTimeoutId = setTimeout(
                            () => getController.abort(),
                            3000,
                        );
                        try {
                            const getRequest = await fetch(fetchAssetUrl, {
                                method: 'GET',
                                signal: getController.signal,
                            });
                            length =
                                getRequest.headers.get('content-length') ??
                                (await getRequest.blob()).size;
                        } catch (error) {
                            // console.log(error);
                        } finally {
                            clearTimeout(getTimeoutId);
                        }
                    }

                    await page.addScriptTag({
                        content: `window.fetchedAssetSize = ${length};`,
                    });
                    await page.evaluate(() => {
                        window.fetchAssetResolve();
                    });
                    return;
                }

                // try to parse json.
                // if worked, means that it's an object from the SFrontendChecker package
                try {
                    const json = JSON.parse(str);
                    if (json.name) {
                        logCheck(json);
                    }
                } catch (e) {
                    // console.log(e);
                }

                logCheck(str);
            });

            await page.addScriptTag({
                url: 'https://cdnv2.coffeekraken.io/s-frontend-checker/SFrontendChecker.iife.js',
            });

            await page.evaluate(() => {
                const log = function (obj) {
                    try {
                        const json = JSON.stringify(obj);
                        (window._console ?? window.console).log(json);
                    } catch (e) {}
                };

                return new Promise((resolve) => {
                    const checker = new SFrontendChecker();

                    const pro = checker.check({
                        $context: document,
                    });

                    pro.on(
                        'checks.start',
                        (checksResult: ISFrontendCheckerCheckResult) => {},
                    );
                    pro.on(
                        'check.log',
                        (checkObj: ISFrontendCheckerCheckObj) => {
                            log(checkObj);
                        },
                    );
                    pro.on(
                        'check.start',
                        (checkObj: ISFrontendCheckerCheckObj) => {
                            log(checkObj);
                        },
                    );
                    pro.on(
                        'check.complete',
                        (checkObj: ISFrontendCheckerCheckObj) => {
                            log(checkObj);
                        },
                    );
                    pro.on(
                        'checks.complete',
                        (checksResult: ISFrontendCheckerCheckResult) => {
                            console.log(
                                `!<magenta>Executed</magenta> tests           <grey>:</grey> <magenta>${
                                    Object.keys(checksResult.checks).length
                                }</magenta>`,
                            );
                            console.log(
                                `!<green>Successfull</green> tests        <grey>:</grey> <green>${
                                    Object.keys(checksResult.checks).filter(
                                        (checkId) => {
                                            if (
                                                checksResult.checks[checkId]
                                                    .result?.status ===
                                                SFrontendChecker.STATUS_SUCCESS
                                            ) {
                                                return true;
                                            }
                                            return false;
                                        },
                                    ).length
                                }</green>`,
                            );
                            console.log(
                                `!<yellow>Warning</yellow> tests            <grey>:</grey> <yellow>${
                                    Object.keys(checksResult.checks).filter(
                                        (checkId) => {
                                            if (
                                                checksResult.checks[checkId]
                                                    .result?.status ===
                                                SFrontendChecker.STATUS_WARNING
                                            ) {
                                                return true;
                                            }
                                            return false;
                                        },
                                    ).length
                                }</yellow>`,
                            );
                            console.log(
                                `!<red>Error</red> tests              <grey>:</grey> <red>${
                                    Object.keys(checksResult.checks).filter(
                                        (checkId) => {
                                            if (
                                                checksResult.checks[checkId]
                                                    .result?.status ===
                                                SFrontendChecker.STATUS_ERROR
                                            ) {
                                                return true;
                                            }
                                            return false;
                                        },
                                    ).length
                                }</red>`,
                            );
                            console.log('!---');
                            const scoreColor =
                                checksResult.score >= 66
                                    ? 'green'
                                    : checksResult.score >= 33
                                    ? 'yellow'
                                    : 'red';
                            console.log(
                                `!Front<yellow>score</yellow>               <grey>:</grey> <${scoreColor}>${checksResult.score}</${scoreColor}><grey>/100</grey>`,
                            );

                            resolve(checksResult);
                        },
                    );
                });
            });

            await page.close();

            resolve();
        });
    }
}
