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
const string_1 = require("@coffeekraken/sugar/string");
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
        const span = 25;
        function pan(str) {
            let finalStr = str.trim();
            const cleanedStr = finalStr
                .replace(/<\/?[a-zA-Z0-9]+>/gm, '')
                .replace(/\%space/gm, '');
            if (!cleanedStr) {
                return ' '.repeat(span - 2);
            }
            finalStr = finalStr.replace(/\s?\%space\s?/, ' '.repeat(span - cleanedStr.length));
            return finalStr;
        }
        function processLine(str) {
            return str
                .replace(/\|/gm, '<grey>│</grey>')
                .replace('---', `<grey>${`⎯`.repeat(process.stdout.columns - 4)}</grey>`);
        }
        let lastCheckName, lastCheckLines = 0;
        function logCheck(checkObj) {
            var _a, _b, _c;
            // exclude all non SFrontendChecker related logs
            if (typeof checkObj === 'string' && !((_a = checkObj.startsWith) === null || _a === void 0 ? void 0 : _a.call(checkObj, '!'))) {
                return;
            }
            if (typeof checkObj === 'string' && checkObj.startsWith('!')) {
                console.log(processLine(checkObj.replace(/^\!/, '')));
                return;
            }
            let statusColor = 'yellow';
            if ((_b = checkObj.result) === null || _b === void 0 ? void 0 : _b.status) {
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
            if (lastCheckName &&
                lastCheckName === checkObj.name &&
                lastCheckLines) {
                process.stdout.moveCursor(0, lastCheckLines * -1);
                process.stdout.cursorTo(0);
                process.stdout.clearScreenDown();
            }
            let value = (_c = checkObj.description) !== null && _c !== void 0 ? _c : '';
            if (checkObj.result &&
                checkObj.result.status !== SFrontendChecker.STATUS_SUCCESS) {
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
            let finalLines = [];
            lines.forEach((line) => {
                const lns = (0, string_1.__splitEvery)(line, process.stdout.columns - 4 - 4 - span);
                finalLines = [...finalLines, ...(lns !== null && lns !== void 0 ? lns : [])];
            });
            // console.log(finalLines);
            let clearLines = 0;
            if (lastCheckName &&
                lastCheckName !== checkObj.name &&
                lastCheckLines) {
                clearLines = lastCheckLines;
            }
            console.log(processLine(`${pan(`<${statusColor}>${checkObj.name}</${statusColor}> %space`)} | ${finalLines[0]}`));
            for (let i = 0; i < finalLines.length; i++) {
                if (i === 0)
                    continue;
                console.log(processLine(`${pan(`%space`)}  | ${finalLines[i]}`));
            }
            console.log(processLine('---'));
            // update last check name
            lastCheckName = checkObj.name;
            lastCheckLines = finalLines.length + 1;
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
            let lastLogLines = 0;
            page.on('console', (checkObjOrString) => __awaiter(this, void 0, void 0, function* () {
                var _b;
                let str = checkObjOrString.text().replace(/█/gm, '').trim();
                const fetchAssetsMatches = str.match(/^fetchAsset:(.*)/);
                if (fetchAssetsMatches === null || fetchAssetsMatches === void 0 ? void 0 : fetchAssetsMatches[1]) {
                    const fetchAssetUrl = fetchAssetsMatches[1];
                    let length = 0;
                    // try head request first
                    const headController = new AbortController();
                    const headTimeoutId = setTimeout(() => headController.abort(), 3000);
                    try {
                        const headRequest = yield fetch(fetchAssetUrl, {
                            method: 'HEAD',
                            signal: headController.signal,
                        });
                        length = yield headRequest.headers.get('content-length');
                    }
                    catch (error) {
                        // console.log(error);
                    }
                    finally {
                        clearTimeout(headTimeoutId);
                    }
                    if (!length) {
                        const getController = new AbortController();
                        const getTimeoutId = setTimeout(() => getController.abort(), 3000);
                        try {
                            const getRequest = yield fetch(fetchAssetUrl, {
                                method: 'GET',
                                signal: getController.signal,
                            });
                            length =
                                (_b = getRequest.headers.get('content-length')) !== null && _b !== void 0 ? _b : (yield getRequest.blob()).size;
                        }
                        catch (error) {
                            // console.log(error);
                        }
                        finally {
                            clearTimeout(getTimeoutId);
                        }
                    }
                    yield page.addScriptTag({
                        content: `window.fetchedAssetSize = ${length};`,
                    });
                    yield page.evaluate(() => {
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
                }
                catch (e) {
                    // console.log(e);
                }
                logCheck(str);
            }));
            yield page.addScriptTag({
                url: 'https://cdnv2.coffeekraken.io/s-frontend-checker/SFrontendChecker.iife.js',
            });
            yield page.evaluate(() => {
                const log = function (obj) {
                    var _a;
                    try {
                        const json = JSON.stringify(obj);
                        ((_a = window._console) !== null && _a !== void 0 ? _a : window.console).log(json);
                    }
                    catch (e) { }
                };
                return new Promise((resolve) => {
                    const checker = new SFrontendChecker();
                    const pro = checker.check({
                        $context: document,
                    });
                    pro.on('checks.start', (checksResult) => { });
                    pro.on('check.log', (checkObj) => {
                        log(checkObj);
                    });
                    pro.on('check.start', (checkObj) => {
                        log(checkObj);
                    });
                    pro.on('check.complete', (checkObj) => {
                        log(checkObj);
                    });
                    pro.on('checks.complete', (checksResult) => {
                        console.log(`!<magenta>Executed</magenta> tests           <grey>:</grey> <magenta>${Object.keys(checksResult.checks).length}</magenta>`);
                        console.log(`!<green>Successfull</green> tests        <grey>:</grey> <green>${Object.keys(checksResult.checks).filter((checkId) => {
                            var _a;
                            if (((_a = checksResult.checks[checkId]
                                .result) === null || _a === void 0 ? void 0 : _a.status) ===
                                SFrontendChecker.STATUS_SUCCESS) {
                                return true;
                            }
                            return false;
                        }).length}</green>`);
                        console.log(`!<yellow>Warning</yellow> tests            <grey>:</grey> <yellow>${Object.keys(checksResult.checks).filter((checkId) => {
                            var _a;
                            if (((_a = checksResult.checks[checkId]
                                .result) === null || _a === void 0 ? void 0 : _a.status) ===
                                SFrontendChecker.STATUS_WARNING) {
                                return true;
                            }
                            return false;
                        }).length}</yellow>`);
                        console.log(`!<red>Error</red> tests              <grey>:</grey> <red>${Object.keys(checksResult.checks).filter((checkId) => {
                            var _a;
                            if (((_a = checksResult.checks[checkId]
                                .result) === null || _a === void 0 ? void 0 : _a.status) ===
                                SFrontendChecker.STATUS_ERROR) {
                                return true;
                            }
                            return false;
                        }).length}</red>`);
                        console.log('!---');
                        const scoreColor = checksResult.score >= 66
                            ? 'green'
                            : checksResult.score >= 33
                                ? 'yellow'
                                : 'red';
                        console.log(`!Front<yellow>score</yellow>               <grey>:</grey> <${scoreColor}>${checksResult.score}</${scoreColor}><grey>/100</grey>`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCx1REFBMEQ7QUFDMUQsMERBQWtDO0FBQ2xDLGtGQUE0RDtBQWdDNUQsTUFBcUIsZ0JBQ2pCLFNBQVEsMEJBQWtCO0lBSzFCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksV0FBK0MsRUFBRTtRQUN6RCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFicEIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBYzFCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxLQUFLLENBQ0QsTUFBcUM7O1FBRXJDLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixXQUFXLEVBQUUsS0FBSyxJQUNmLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7UUFFRixJQUFJLENBQUMsQ0FBQSxNQUFBLFdBQVcsQ0FBQyxHQUFHLDBDQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQSxFQUFFO1lBQzFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsV0FBVyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDbEQ7UUFFRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEIsU0FBUyxHQUFHLENBQUMsR0FBRztZQUNaLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUUxQixNQUFNLFVBQVUsR0FBRyxRQUFRO2lCQUN0QixPQUFPLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDO2lCQUNsQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTlCLElBQUksQ0FBQyxVQUFVLEVBQUU7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