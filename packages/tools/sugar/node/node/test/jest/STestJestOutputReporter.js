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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0T3V0cHV0UmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS90ZXN0L2plc3QvU1Rlc3RKZXN0T3V0cHV0UmVwb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsaUVBQThDO0FBQzlDLHlFQUFtRDtBQUVuRDs7Ozs7R0FLRztBQUVILHdCQUF3QjtBQUN4QixNQUFNLHVCQUF1QjtJQUMzQixZQUFZLFlBQVksRUFBRSxPQUFPO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzFCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxnRkFBZ0YsSUFBSSxDQUFDLGFBQWEsWUFBWSxDQUMvRyxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFHO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FDVCwyQ0FBMkMsa0JBQWEsQ0FDdEQsR0FBRyxDQUFDLElBQUksQ0FDVCxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcscUJBQWEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FDN0QsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBRyxFQUFFLE1BQU07UUFDdEIsSUFBSSxNQUFNLENBQUMsZUFBZSxLQUFLLENBQUMsRUFBRTtZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUNULHVDQUF1QyxrQkFBYSxDQUNsRCxHQUFHLENBQUMsSUFBSSxDQUNULHVCQUF1QixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLHFCQUFhLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQ3RFLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FDVCwy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