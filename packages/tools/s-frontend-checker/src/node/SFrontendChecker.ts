// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
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

            page.on('console', async (msg) => {
                let str = msg.text();

                str = str.replace(/\|/gm, '<grey>│</grey>');

                const fetchImagesMatches = str.match(
                    /^fetchImage:([a-zA-Z0-9_-]+):(.*)/,
                );
                if (fetchImagesMatches?.[2]) {
                    const fetchImageId = fetchImagesMatches[1],
                        fetchImageUrl = fetchImagesMatches[2];

                    let length = 0;

                    if (fetchImageUrl.match(/\.(css|js|ts|jsx|tsx)/)) {
                        const request = await fetch(fetchImageUrl, {
                            method: 'GET',
                        });
                        length = 0;

                        console.log('LEN', request);
                    } else {
                        const request = await fetch(fetchImageUrl, {
                            method: 'HEAD',
                        });
                        length = await request.headers.get('content-length');
                    }

                    await page.addScriptTag({
                        content: `window.fetchedImageSize = ${length};`,
                    });
                    await page.evaluate(() => {
                        window.fetchImageResolve();
                    });
                    return;
                }

                switch (str) {
                    case '---':
                        console.log(
                            `<grey>${`⎯`.repeat(
                                process.stdout.columns - 4,
                            )}</grey>`,
                        );
                        break;
                    default:
                        str = str.replace(
                            /\`(.*)\`/gm,
                            `<magenta>$1</magenta>`,
                        );
                        console.log(str);
                        break;
                }
            });

            // const body = await page.evaluateHandle(() => {
            //     return document.body;
            // });
            // _console.log('body', body);

            await page.addScriptTag({
                url: 'https://cdnv2.coffeekraken.io/s-frontend-checker/SFrontendChecker.iife.js',
            });

            await page.evaluate(() => {
                const span = 30;
                function pan(str) {
                    const cleanedStr = str.replace(/<\/?[a-zA-Z0-9]+>/gm, '');
                    if (cleanedStr.length >= span) return str;
                    return `${str}${' '.repeat(span - cleanedStr.length)}`;
                }

                return new Promise((resolve) => {
                    const checker = new SFrontendChecker();

                    const pro = checker.check({
                        $context: document,
                    });

                    pro.on(
                        'checks.start',
                        (checksResult: ISFrontendCheckerCheckResult) => {
                            console.log('Launching tests...');
                        },
                    );
                    pro.on(
                        'check.start',
                        (checkObj: ISFrontendCheckerCheckObj) => {
                            console.log('---');
                        },
                    );
                    pro.on(
                        'check.complete',
                        (checkObj: ISFrontendCheckerCheckObj) => {
                            const color =
                                checkObj.result?.status ===
                                SFrontendChecker.STATUS_ERROR
                                    ? 'red'
                                    : checkObj.result?.status ===
                                      SFrontendChecker.STATUS_WARNING
                                    ? 'yellow'
                                    : 'green';
                            console.log(
                                `<${color}>${pan(
                                    `${checkObj.name}`,
                                )}</${color}>${`<cyan>${
                                    checkObj.duration.formatedDuration
                                }</cyan> | ${
                                    checkObj.result?.message ??
                                    checkObj.description
                                }`}`,
                            );
                            console.log(`${pan(' ')}    |`);
                            if (
                                checkObj.result.status !==
                                SFrontendChecker.STATUS_SUCCESS
                            ) {
                                if (checkObj.result.example) {
                                    console.log(
                                        `${pan(
                                            ' ',
                                        )}    | <yellow>Example</yellow>:`,
                                    );
                                    checkObj.result.example
                                        .split('\n')
                                        .map((line) => {
                                            console.log(
                                                `${pan(' ')}    | ${line}`,
                                            );
                                        });
                                    console.log(`${pan(' ')}    |`);
                                }
                                if (checkObj.result.elements?.length) {
                                    console.log(
                                        `${pan(
                                            ' ',
                                        )}    | <yellow>Elements</yellow>:`,
                                    );
                                    checkObj.result.elements.forEach(($elm) => {
                                        const $newElm = $elm.cloneNode();
                                        $newElm.innerHTML = '';
                                        const elementStr = $newElm.outerHTML;
                                        elementStr.split('\n').map((line) => {
                                            console.log(
                                                `${pan(' ')}    | ${line}`,
                                            );
                                        });
                                    });
                                    console.log(`${pan(' ')}    |`);
                                }
                                if (checkObj.result.moreLink) {
                                    console.log(
                                        `${pan(
                                            ' ',
                                        )}    | <yellow>More info</yellow>: ${
                                            checkObj.result.moreLink
                                        }`,
                                    );
                                    console.log(`${pan(' ')}    |`);
                                }
                            }
                        },
                    );
                    pro.on(
                        'checks.complete',
                        (checksResult: ISFrontendCheckerCheckResult) => {
                            console.log('---');
                            console.log(
                                `${pan(
                                    '<magenta>Executed</magenta> tests',
                                )}    | <magenta>${
                                    Object.keys(checksResult.checks).length
                                }</magenta>`,
                            );
                            console.log(
                                `${pan(
                                    '<green>Successfull</green> tests',
                                )}    | <green>${
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
                                `${pan(
                                    '<yellow>Warning</yellow> tests',
                                )}    | <yellow>${
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
                                `${pan('<red>Error</red> tests')}    | <red>${
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
                            console.log('---');
                            const scoreColor =
                                checksResult.score >= 66
                                    ? 'green'
                                    : checksResult.score >= 33
                                    ? 'yellow'
                                    : 'red';
                            console.log(
                                `${pan(
                                    'Front<yellow>score</yellow>',
                                )}    | <${scoreColor}>${
                                    checksResult.score
                                }</${scoreColor}>`,
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
