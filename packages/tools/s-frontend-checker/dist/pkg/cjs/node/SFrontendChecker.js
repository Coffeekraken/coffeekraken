"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const SFrontendChecker_1 = __importDefault(require("../shared/SFrontendChecker"));
class SFrontendChecker extends SFrontendChecker_1.default {
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
    constructor(settings = {}) {
        super(settings);
        this._areChecksRunning = false;
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
    isChecking() {
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
    check(params) {
        var _a;
        const finalParams = Object.assign({ includeLazy: false }, (params !== null && params !== void 0 ? params : {}));
        if (!((_a = finalParams.url) === null || _a === void 0 ? void 0 : _a.match(/^https?\:\/\//))) {
            finalParams.url = `https://${finalParams.url}`;
        }
        return new s_promise_1.default(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch({
                headless: 'new',
            });
            const page = yield browser.newPage();
            yield page.goto(finalParams.url, {
                waitUntil: 'domcontentloaded',
            });
            yield page.setViewport({ width: 1920, height: 1280 });
            // add a flag to be able to detect pupetter in the page execution
            yield page.addScriptTag({
                content: `window.isPuppeteer = true;`,
            });
            page.on('console', (msg) => __awaiter(this, void 0, void 0, function* () {
                let str = msg.text();
                str = str.replace(/\|/gm, '<grey>│</grey>');
                const fetchImagesMatches = str.match(/^fetchImage:([a-zA-Z0-9_-]+):(.*)/);
                if (fetchImagesMatches === null || fetchImagesMatches === void 0 ? void 0 : fetchImagesMatches[2]) {
                    const fetchImageId = fetchImagesMatches[1], fetchImageUrl = fetchImagesMatches[2];
                    let length = 0;
                    if (fetchImageUrl.match(/\.(css|js|ts|jsx|tsx)/)) {
                        const request = yield fetch(fetchImageUrl, {
                            method: 'GET',
                        });
                        length = ;
                        console.log('LEN', request);
                    }
                    else {
                        const request = yield fetch(fetchImageUrl, {
                            method: 'HEAD',
                        });
                        length = yield request.headers.get('content-length');
                    }
                    yield page.addScriptTag({
                        content: `window.fetchedImageSize = ${length};`,
                    });
                    yield page.evaluate(() => {
                        window.fetchImageResolve();
                    });
                    return;
                }
                switch (str) {
                    case '---':
                        console.log(`<grey>${`⎯`.repeat(process.stdout.columns - 4)}</grey>`);
                        break;
                    default:
                        str = str.replace(/\`(.*)\`/gm, `<magenta>$1</magenta>`);
                        console.log(str);
                        break;
                }
            }));
            // const body = await page.evaluateHandle(() => {
            //     return document.body;
            // });
            // _console.log('body', body);
            yield page.addScriptTag({
                url: 'https://cdnv2.coffeekraken.io/s-frontend-checker/SFrontendChecker.iife.js',
            });
            yield page.evaluate(() => {
                const span = 30;
                function pan(str) {
                    const cleanedStr = str.replace(/<\/?[a-zA-Z0-9]+>/gm, '');
                    if (cleanedStr.length >= span)
                        return str;
                    return `${str}${' '.repeat(span - cleanedStr.length)}`;
                }
                return new Promise((resolve) => {
                    const checker = new SFrontendChecker();
                    const pro = checker.check({
                        $context: document,
                    });
                    pro.on('checks.start', (checksResult) => {
                        console.log('Launching tests...');
                    });
                    pro.on('check.start', (checkObj) => {
                        console.log('---');
                    });
                    pro.on('check.complete', (checkObj) => {
                        var _a, _b, _c, _d, _e;
                        const color = ((_a = checkObj.result) === null || _a === void 0 ? void 0 : _a.status) ===
                            SFrontendChecker.STATUS_ERROR
                            ? 'red'
                            : ((_b = checkObj.result) === null || _b === void 0 ? void 0 : _b.status) ===
                                SFrontendChecker.STATUS_WARNING
                                ? 'yellow'
                                : 'green';
                        console.log(`<${color}>${pan(`${checkObj.name}`)}</${color}>${`<cyan>${checkObj.duration.formatedDuration}</cyan> | ${(_d = (_c = checkObj.result) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : checkObj.description}`}`);
                        console.log(`${pan(' ')}    |`);
                        if (checkObj.result.status !==
                            SFrontendChecker.STATUS_SUCCESS) {
                            if (checkObj.result.example) {
                                console.log(`${pan(' ')}    | <yellow>Example</yellow>:`);
                                checkObj.result.example
                                    .split('\n')
                                    .map((line) => {
                                    console.log(`${pan(' ')}    | ${line}`);
                                });
                                console.log(`${pan(' ')}    |`);
                            }
                            if ((_e = checkObj.result.elements) === null || _e === void 0 ? void 0 : _e.length) {
                                console.log(`${pan(' ')}    | <yellow>Elements</yellow>:`);
                                checkObj.result.elements.forEach(($elm) => {
                                    const $newElm = $elm.cloneNode();
                                    $newElm.innerHTML = '';
                                    const elementStr = $newElm.outerHTML;
                                    elementStr.split('\n').map((line) => {
                                        console.log(`${pan(' ')}    | ${line}`);
                                    });
                                });
                                console.log(`${pan(' ')}    |`);
                            }
                            if (checkObj.result.moreLink) {
                                console.log(`${pan(' ')}    | <yellow>More info</yellow>: ${checkObj.result.moreLink}`);
                                console.log(`${pan(' ')}    |`);
                            }
                        }
                    });
                    pro.on('checks.complete', (checksResult) => {
                        console.log('---');
                        console.log(`${pan('<magenta>Executed</magenta> tests')}    | <magenta>${Object.keys(checksResult.checks).length}</magenta>`);
                        console.log(`${pan('<green>Successfull</green> tests')}    | <green>${Object.keys(checksResult.checks).filter((checkId) => {
                            var _a;
                            if (((_a = checksResult.checks[checkId]
                                .result) === null || _a === void 0 ? void 0 : _a.status) ===
                                SFrontendChecker.STATUS_SUCCESS) {
                                return true;
                            }
                            return false;
                        }).length}</green>`);
                        console.log(`${pan('<yellow>Warning</yellow> tests')}    | <yellow>${Object.keys(checksResult.checks).filter((checkId) => {
                            var _a;
                            if (((_a = checksResult.checks[checkId]
                                .result) === null || _a === void 0 ? void 0 : _a.status) ===
                                SFrontendChecker.STATUS_WARNING) {
                                return true;
                            }
                            return false;
                        }).length}</yellow>`);
                        console.log(`${pan('<red>Error</red> tests')}    | <red>${Object.keys(checksResult.checks).filter((checkId) => {
                            var _a;
                            if (((_a = checksResult.checks[checkId]
                                .result) === null || _a === void 0 ? void 0 : _a.status) ===
                                SFrontendChecker.STATUS_ERROR) {
                                return true;
                            }
                            return false;
                        }).length}</red>`);
                        console.log('---');
                        const scoreColor = checksResult.score >= 66
                            ? 'green'
                            : checksResult.score >= 33
                                ? 'yellow'
                                : 'red';
                        console.log(`${pan('Front<yellow>score</yellow>')}    | <${scoreColor}>${checksResult.score}</${scoreColor}>`);
                        resolve(checksResult);
                    });
                });
            });
            yield page.close();
            resolve();
        }));
    }
}
exports.default = SFrontendChecker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCwwREFBa0M7QUFDbEMsa0ZBQTREO0FBZ0M1RCxNQUFxQixnQkFDakIsU0FBUSwwQkFBa0I7SUFLMUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxXQUErQyxFQUFFO1FBQ3pELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQWJwQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFjMUIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUssQ0FDRCxNQUFxQzs7UUFFckMsTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLFdBQVcsRUFBRSxLQUFLLElBQ2YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztRQUVGLElBQUksQ0FBQyxDQUFBLE1BQUEsV0FBVyxDQUFDLEdBQUcsMENBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBLEVBQUU7WUFDMUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxXQUFXLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNsRDtRQUVELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM5QyxNQUFNLE9BQU8sR0FBRyxNQUFNLG1CQUFTLENBQUMsTUFBTSxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsS0FBSzthQUNsQixDQUFDLENBQUM7WUFDSCxNQUFNLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcs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