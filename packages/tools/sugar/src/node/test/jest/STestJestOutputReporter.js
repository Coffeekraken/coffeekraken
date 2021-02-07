"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = STestJestOutputReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0T3V0cHV0UmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVzdEplc3RPdXRwdXRSZXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLGlFQUE4QztBQUM5Qyx5RUFBbUQ7QUFFbkQ7Ozs7O0dBS0c7QUFFSCx3QkFBd0I7QUFDeEIsTUFBTSx1QkFBdUI7SUFDM0IsWUFBWSxZQUFZLEVBQUUsT0FBTztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUMxQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsZ0ZBQWdGLElBQUksQ0FBQyxhQUFhLFlBQVksQ0FDL0csQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBRztRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQ1QsMkNBQTJDLGtCQUFhLENBQ3RELEdBQUcsQ0FBQyxJQUFJLENBQ1QsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLHFCQUFhLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQzdELENBQUM7SUFDSixDQUFDO0lBRUQsWUFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNO1FBQ3RCLElBQUksTUFBTSxDQUFDLGVBQWUsS0FBSyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FDVCx1Q0FBdUMsa0JBQWEsQ0FDbEQsR0FBRyxDQUFDLElBQUksQ0FDVCx1QkFBdUIsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxxQkFBYSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUN0RSxDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQ1QsMkNBQTJDLGtCQUFhLENBQ3RELEdBQUcsQ0FBQyxJQUFJ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