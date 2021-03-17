"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filename_1 = __importDefault(require("../../fs/filename"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
/**
 * @status              wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */
// my-custom-reporter.js
class STestJestOutputReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
    }
    onRunStart(metas, vars) {
        console.log(`<bgYellow><black> Starting tests </black></bgYellow> estimated time: <yellow>${vars.estimatedTime}s</yellow>`);
    }
    onTestStart(obj) {
        console.log(`#temp #mb:0 <yellow>│</yellow> <bgCyan> ${filename_1.default(obj.path)} </bgCyan> ${obj.path.replace(`${packageRoot_1.default()}/`, '')}`);
    }
    onTestResult(obj, result) {
        if (result.numFailingTests === 0) {
            console.log(`<yellow>│</yellow> <bgGreen><black> ${filename_1.default(obj.path)} </black></bgGreen> ${obj.path.replace(`${packageRoot_1.default()}/`, '')}`);
        }
        else {
            console.log(`#mb:0 <yellow>│</yellow> <bgRed><black> ${filename_1.default(obj.path)} </black></bgRed> ${obj.path.replace(`${packageRoot_1.default()}/`, '')}`);
            console.log(`<yellow>│</yellow>`);
            result.testResults.forEach((resObj) => {
                if (resObj.status === 'passed') {
                    console.log(`<yellow>│</yellow> <bgGreen><black> Passed </black></bgGreen> ${resObj.title}`);
                }
                else if (resObj.status === 'failed') {
                    console.log(`<yellow>│</yellow> <bgRed><black> Failed </black></bgRed> <red>${resObj.title}</red>`);
                }
            });
        }
    }
    onRunComplete(contexts, result) {
        result.testResults.forEach((resultObj) => {
            if (resultObj.failureMessage) {
                console.log(`<bgRed><black> ${resultObj.testFilePath.replace(`${packageRoot_1.default()}/`, '')} </black></bgRed>`);
                const lines = resultObj.failureMessage.split('\n').map((line, i) => {
                    if (i === 0) {
                        return `<yellow>${line}</yellow>`;
                    }
                    else if (line.trim().slice(0, 8) === 'Expected') {
                        return `<green>${line}</green>`;
                    }
                    else if (line.trim().slice(0, 8) === 'Received') {
                        return `<red>${line}</red>`;
                    }
                    else if (line.trim().slice(0, 3) === 'at ') {
                        return `<cyan>${line}</cyan>`;
                    }
                    return line;
                });
                console.log(`<white>${lines.join('\n')}\n</white>`);
            }
        });
        const titleBg = result.numFailedTests > 0 ? 'bgRed' : 'bgGreen';
        console.log(`<${titleBg}><black> Stats </black></${titleBg}>\n`);
        console.log(`- <yellow>total</yellow>  tests: <yellow>${result.numTotalTests}</yellow>`);
        console.log(`- <green>passed</green> tests: <green>${result.numPassedTests}</green>`);
        console.log(`- <red>failed</red> tests: <red>${result.numFailedTests}</red>`);
    }
}
exports.default = STestJestOutputReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0T3V0cHV0UmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVzdEplc3RPdXRwdXRSZXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxpRUFBOEM7QUFDOUMseUVBQW1EO0FBRW5EOzs7OztHQUtHO0FBRUgsd0JBQXdCO0FBQ3hCLE1BQU0sdUJBQXVCO0lBQzNCLFlBQVksWUFBWSxFQUFFLE9BQU87UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNwQixPQUFPLENBQUMsR0FBRyxDQUNULGdGQUFnRixJQUFJLENBQUMsYUFBYSxZQUFZLENBQy9HLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQUc7UUFDYixPQUFPLENBQUMsR0FBRyxDQUNULDJDQUEyQyxrQkFBYSxDQUN0RCxHQUFHLENBQUMsSUFBSSxDQUNULGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxxQkFBYSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUM3RCxDQUFDO0lBQ0osQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFHLEVBQUUsTUFBTTtRQUN0QixJQUFJLE1BQU0sQ0FBQyxlQUFlLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQ1QsdUNBQXVDLGtCQUFhLENBQ2xELEdBQUcsQ0FBQyxJQUFJLENBQ1QsdUJBQXVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcscUJBQWEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FDdEUsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUNULDJDQUEyQyxrQkFBYSxDQUN0RCxHQUFHLENBQUMsSUFB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