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
import __SPromise from '@coffeekraken/s-promise';
import puppeteer from 'puppeteer';
import __SFrontendChecker from '../shared/SFrontendChecker';
export default class SFrontendChecker extends __SFrontendChecker {
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
        return new __SPromise(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer.launch({
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
                        length = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxrQkFBa0IsTUFBTSw0QkFBNEIsQ0FBQztBQWdDNUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFDakIsU0FBUSxrQkFBa0I7SUFLMUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxXQUErQyxFQUFFO1FBQ3pELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQWJwQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFjMUIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUssQ0FDRCxNQUFxQzs7UUFFckMsTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLFdBQVcsRUFBRSxLQUFLLElBQ2YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztRQUVGLElBQUksQ0FBQyxDQUFBLE1BQUEsV0FBVyxDQUFDLEdBQUcsMENBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBLEVBQUU7WUFDMUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxXQUFXLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNsRDtRQUVELE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzlDLE1BQU0sT0FBTyxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFDbkMsUUFBUSxFQUFFLEtBQUs7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQzdCLFNBQVMsRUFBRSxrQkFBa0I7YUFDaEMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUV0RCxpRUFBaUU7WUFDakUsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNwQixPQUFPLEVBQUUsNEJBQTRCO2FBQ3hDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQU8sR0FBRyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFckIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBRTVDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FDaEMsbUNBQW1DLENBQ3RDLENBQUM7Z0JBQ0YsSUFBSSxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDekIsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQ3RDLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFMUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUVmLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO3dCQUM5QyxNQUFNLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQyxhQUFhLEVBQUU7NEJBQ3ZDLE1BQU0sRUFBRSxLQUFLO3lCQUNoQixDQUFDLENBQUM7d0JBQ0gsTUFBTSxHQUFHLENBQUMsQ0FBQzt3QkFFWCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztxQkFDL0I7eUJBQU07d0JBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUMsYUFBYSxFQUFFOzRCQUN2QyxNQUFNLEVBQUUsTUFBTTt5QkFDakIsQ0FBQyxDQUFDO3dCQUNILE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7cUJBQ3hEO29CQUVELE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQzt3QkFDcEIsT0FBTyxFQUFFLDZCQUE2QixNQUFNLEdBQUc7cUJBQ2xELENBQUMsQ0FBQztvQkFDSCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO3dCQUNyQixNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDL0IsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTztpQkFDVjtnQkFFRCxRQUFRLEdBQUcsRUFBRTtvQkFDVCxLQUFLLEtBQUs7d0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FDUCxTQUFTLEdBQUcsQ0FBQyxNQUFNLENBQ2YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUM3QixTQUFTLENBQ2IsQ0FBQzt3QkFDRixNQUFNO29CQUNWO3dCQUNJLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUNiLFlBQVksRUFDWix1QkFBdUIsQ0FDMUIsQ0FBQzt3QkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQixNQUFNO2lCQUNiO1lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUVILGlEQUFpRDtZQUNqRCw0QkFBNEI7WUFDNUIsTUFBTTtZQUNOLDhCQUE4QjtZQUU5QixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3BCLEdBQUcsRUFBRSwyRUFBMkU7YUFDbkYsQ0FBQyxDQUFDO1lBRUgsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtnQkFDckIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixTQUFTLEdBQUcsQ0FBQyxHQUFHO29CQUNaLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzFELElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJO3dCQUFFLE9BQU8sR0FBRyxDQUFDO29CQUMxQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUMzRCxDQUFDO2dCQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDM0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO29CQUV2QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO3dCQUN0QixRQUFRLEVBQUUsUUFBUTtxQkFDckIsQ0FBQyxDQUFDO29CQUVILEdBQUcsQ0FBQyxFQUFFLENBQ0YsY0FBYyxFQUNkLENBQUMsWUFBMEMsRUFBRSxFQUFFO3dCQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7b0JBQ3RDLENBQUMsQ0FDSixDQUFDO29CQUNGLEdBQUcsQ0FBQyxFQUFFLENBQ0YsYUFBYSxFQUNiLENBQUMsUUFBbUMsRUFBRSxFQUFFO3dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QixDQUFDLENBQ0osQ0FBQztvQkFDRixHQUFHLENBQUMsRUFBRSxDQUNGLGdCQUFnQixFQUNoQixDQUFDLFFBQW1DLEVBQUUsRUFBRTs7d0JBQ3BDLE1BQU0sS0FBSyxHQUNQLENBQUEsTUFBQSxRQUFRLENBQUMsTUFBTSwwQ0FBRSxNQUFNOzRCQUN2QixnQkFBZ0IsQ0FBQyxZQUFZOzRCQUN6QixDQUFDLENBQUMsS0FBSzs0QkFDUCxDQUFDLENBQUMsQ0FBQSxNQUFBLFFBQVEsQ0FBQyxNQUFNLDBDQUFFLE1BQU07Z0NBQ3ZCLGdCQUFnQixDQUFDLGNBQWM7Z0NBQ2pDLENBQUMsQ0FBQyxRQUFRO2dDQUNWLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsSUFBSSxLQUFLLElBQUksR0FBRyxDQUNaLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUNyQixLQUFLLEtBQUssSUFBSSxTQUNYLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQ3RCLGFBQ0ksTUFBQSxNQUFBLFFBQVEsQ0FBQyxNQUFNLDBDQUFFLE9BQU8sbUNBQ3hCLFFBQVEsQ0FBQyxXQUNiLEVBQUUsRUFBRSxDQUNQLENBQUM7d0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2hDLElBQ0ksUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNOzRCQUN0QixnQkFBZ0IsQ0FBQyxjQUFjLEVBQ2pDOzRCQUNFLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0NBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsR0FBRyxHQUFHLENBQ0YsR0FBRyxDQUNOLGlDQUFpQyxDQUNyQyxDQUFDO2dDQUNGLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTztxQ0FDbEIsS0FBSyxDQUFDLElBQUksQ0FBQztxQ0FDWCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQ0FDVixPQUFPLENBQUMsR0FBRyxDQUNQLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUM3QixDQUFDO2dDQUNOLENBQUMsQ0FBQyxDQUFDO2dDQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUNuQzs0QkFDRCxJQUFJLE1BQUEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLDBDQUFFLE1BQU0sRUFBRTtnQ0FDbEMsT0FBTyxDQUFDLEdBQUcsQ0FDUCxHQUFHLEdBQUcsQ0FDRixHQUFHLENBQ04sa0NBQWtDLENBQ3RDLENBQUM7Z0NBQ0YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0NBQ3RDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQ0FDakMsT0FBTyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7b0NBQ3ZCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7b0NBQ3JDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0NBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQzdCLENBQUM7b0NBQ04sQ0FBQyxDQUFDLENBQUM7Z0NBQ1AsQ0FBQyxDQUFDLENBQUM7Z0NBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7NkJBQ25DOzRCQUNELElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0NBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsR0FBRyxHQUFHLENBQ0YsR0FBRyxDQUNOLHFDQUNHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFDcEIsRUFBRSxDQUNMLENBQUM7Z0NBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7NkJBQ25DO3lCQUNKO29CQUNMLENBQUMsQ0FDSixDQUFDO29CQUNGLEdBQUcsQ0FBQyxFQUFFLENBQ0YsaUJBQWlCLEVBQ2pCLENBQUMsWUFBMEMsRUFBRSxFQUFFO3dCQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUNQLEdBQUcsR0FBRyxDQUNGLG1DQUFtQyxDQUN0QyxrQkFDRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUNyQyxZQUFZLENBQ2YsQ0FBQzt3QkFDRixPQUFPLENBQUMsR0FBRyxDQUNQLEdBQUcsR0FBRyxDQUNGLGtDQUFrQyxDQUNyQyxnQkFDRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQ25DLENBQUMsT0FBTyxFQUFFLEVBQUU7OzRCQUNSLElBQ0ksQ0FBQSxNQUFBLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2lDQUN2QixNQUFNLDBDQUFFLE1BQU07Z0NBQ25CLGdCQUFnQixDQUFDLGNBQWMsRUFDakM7Z0NBQ0UsT0FBTyxJQUFJLENBQUM7NkJBQ2Y7NEJBQ0QsT0FBTyxLQUFLLENBQUM7d0JBQ2pCLENBQUMsQ0FDSixDQUFDLE1BQ04sVUFBVSxDQUNiLENBQUM7d0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FDUCxHQUFHLEdBQUcsQ0FDRixnQ0FBZ0MsQ0FDbkMsaUJBQ0csTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUNuQyxDQUFDLE9BQU8sRUFBRSxFQUFFOzs0QkFDUixJQUNJLENBQUEsTUFBQSxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQ0FDdkIsTUFBTSwwQ0FBRSxNQUFNO2dDQUNuQixnQkFBZ0IsQ0FBQyxjQUFjLEVBQ2pDO2dDQUNFLE9BQU8sSUFBSSxDQUFDOzZCQUNmOzRCQUNELE9BQU8sS0FBSyxDQUFDO3dCQUNqQixDQUFDLENBQ0osQ0FBQyxNQUNOLFdBQVcsQ0FDZCxDQUFDO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQ1AsR0FBRyxHQUFHLENBQUMsd0JBQXdCLENBQUMsY0FDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUNuQyxDQUFDLE9BQU8sRUFBRSxFQUFFOzs0QkFDUixJQUNJLENBQUEsTUFBQSxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQ0FDdkIsTUFBTSwwQ0FBRSxNQUFNO2dDQUNuQixnQkFBZ0IsQ0FBQyxZQUFZLEVBQy9CO2dDQUNFLE9BQU8sSUFBSSxDQUFDOzZCQUNmOzRCQUNELE9BQU8sS0FBSyxDQUFDO3dCQUNqQixDQUFDLENBQ0osQ0FBQyxNQUNOLFFBQVEsQ0FDWCxDQUFDO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25CLE1BQU0sVUFBVSxHQUNaLFlBQVksQ0FBQyxLQUFLLElBQUksRUFBRTs0QkFDcEIsQ0FBQyxDQUFDLE9BQU87NEJBQ1QsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksRUFBRTtnQ0FDMUIsQ0FBQyxDQUFDLFFBQVE7Z0NBQ1YsQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxHQUFHLEdBQUcsQ0FDRiw2QkFBNkIsQ0FDaEMsVUFBVSxVQUFVLElBQ2pCLFlBQVksQ0FBQyxLQUNqQixLQUFLLFVBQVUsR0FBRyxDQUNyQixDQUFDO3dCQUVGLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDMUIsQ0FBQyxDQUNKLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRW5CLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9