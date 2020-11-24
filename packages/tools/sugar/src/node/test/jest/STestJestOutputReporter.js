"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const filename_1 = __importDefault(require("../../fs/filename"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
/**
 * @wip
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
        // console.log('test result', result);
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
