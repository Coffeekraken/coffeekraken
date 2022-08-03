"use strict";
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
const node_fetch_1 = __importDefault(require("node-fetch"));
const express_1 = __importDefault(require("express"));
function start(stringArgs = '') {
    return new s_promise_1.default(({ resolve, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.all('*', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('req');
            // const credentials = {
            //     username: 'operations@buzzbrothers.ch',
            //     password: 'flatcar-naples-upwards-AVIONIC-naughty',
            // };
            // var screenshotClient = __browserstack.createScreenshotClient(
            //     credentials,
            // );
            // screenshotClient.generateScreenshots(
            //     {
            //         url: 'https://google.com',
            //         browsers: [
            //             {
            //                 os: 'Windows',
            //                 os_version: 'XP',
            //                 browser: 'ie',
            //                 browser_version: '7.0',
            //             },
            //         ],
            //     },
            //     (error, job) => {
            //         console.log('ERROR', error);
            //         console.log('JOB', job);
            //     },
            // );
            // const data = {
            //     url: 'www.google.com',
            //     // callback_url: 'http://staging.example.com',
            //     win_res: '1024x768',
            //     mac_res: '1920x1080',
            //     quality: 'compressed',
            //     wait_time: 5,
            //     orientation: 'portrait',
            //     browsers: [
            //         {
            //             os: 'Windows',
            //             os_version: 'XP',
            //             browser: 'ie',
            //             browser_version: '7.0',
            //         },
            //     ],
            // };
            // // console.log(JSON.stringify(data));
            // const response = await __fetch(
            //     'https://api.browserstack.com/5/worker',
            //     {
            //         method: 'post',
            //         // mode: 'cors', // no-cors, *cors, same-origin
            //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //         // credentials: 'same-origin', // include, *same-origin, omit
            //         headers: {
            //             Accept: 'application/json',
            //             'Content-Type': 'application/json',
            //             Authorization: `Basic ${Buffer.from(
            //                 'olivierbossel:yOBXOfHyasdoFUqqHVNs',
            //             ).toString('base64')}`,
            //         },
            //         body: JSON.stringify({
            //             os: 'OS X',
            //             os_version: 'Mojave',
            //             url: 'https://browserstack.com',
            //             browser: 'chrome',
            //             browser_version: '75.0',
            //         }),
            //     },
            // );
            // const json = await response.text();
            // console.log('SSS', json);
            const screenshotResponse = yield (0, node_fetch_1.default)('https://api.browshot.com/api/v1/screenshot/create?key=HcS2Mvnp7DsFXSlVBnaRTAmkXtJ&url=https://google.com&instance_id=12', {
                method: 'get',
                // headers: {
                //     Accept: 'application/json',
                //     'Content-Type': 'application/json',
                //     Authorization: `Basic ${Buffer.from(
                //         'olivierbossel:yOBXOfHyasdoFUqqHVNs',
                //     ).toString('base64')}`,
                // },
            });
            const screenshotJson = yield screenshotResponse.text();
            console.log('SSS', screenshotJson);
            // var screenshotClient = __browserstack.createScreenshotClient(
            //     credentials,
            // );
            // screenshotClient.getBrowsers(function (error, browsers) {
            //     console.log(
            //         'The following browsers are available for screenshots',
            //     );
            //     console.log(browsers[browsers.length - 1]);
            //     screenshotClient.generateScreenshots(
            //         {
            //             url: 'https://olivierbossel.com',
            //             browsers: [
            //                 // browsers.pop(),
            //                 {
            //                     os: 'OS X',
            //                     os_version: 'Monterey',
            //                     browser: 'chrome',
            //                     browser_version: '100.0',
            //                 },
            //             ],
            //             // local: true,
            //         },
            //         (error, job) => {
            //             console.log('END', error.message, job);
            //         },
            //     );
            // });
            // console.log(screenshotClient);
        }));
        app.listen(9991, () => {
            console.log('listening on port 9991');
        });
    }));
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBRWpELDREQUFpQztBQUVqQyxzREFBZ0M7QUFFaEMsU0FBd0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQ3pDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDcEQsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBUyxHQUFFLENBQUM7UUFFeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFbkIsd0JBQXdCO1lBQ3hCLDhDQUE4QztZQUM5QywwREFBMEQ7WUFDMUQsS0FBSztZQUVMLGdFQUFnRTtZQUNoRSxtQkFBbUI7WUFDbkIsS0FBSztZQUVMLHdDQUF3QztZQUN4QyxRQUFRO1lBQ1IscUNBQXFDO1lBQ3JDLHNCQUFzQjtZQUN0QixnQkFBZ0I7WUFDaEIsaUNBQWlDO1lBQ2pDLG9DQUFvQztZQUNwQyxpQ0FBaUM7WUFDakMsMENBQTBDO1lBQzFDLGlCQUFpQjtZQUNqQixhQUFhO1lBQ2IsU0FBUztZQUNULHdCQUF3QjtZQUN4Qix1Q0FBdUM7WUFDdkMsbUNBQW1DO1lBQ25DLFNBQVM7WUFDVCxLQUFLO1lBRUwsaUJBQWlCO1lBQ2pCLDZCQUE2QjtZQUM3QixxREFBcUQ7WUFDckQsMkJBQTJCO1lBQzNCLDRCQUE0QjtZQUM1Qiw2QkFBNkI7WUFDN0Isb0JBQW9CO1lBQ3BCLCtCQUErQjtZQUMvQixrQkFBa0I7WUFDbEIsWUFBWTtZQUNaLDZCQUE2QjtZQUM3QixnQ0FBZ0M7WUFDaEMsNkJBQTZCO1lBQzdCLHNDQUFzQztZQUN0QyxhQUFhO1lBQ2IsU0FBUztZQUNULEtBQUs7WUFFTCx3Q0FBd0M7WUFDeEMsa0NBQWtDO1lBQ2xDLCtDQUErQztZQUMvQyxRQUFRO1lBQ1IsMEJBQTBCO1lBQzFCLDBEQUEwRDtZQUMxRCx3RkFBd0Y7WUFDeEYsd0VBQXdFO1lBQ3hFLHFCQUFxQjtZQUNyQiwwQ0FBMEM7WUFDMUMsa0RBQWtEO1lBQ2xELG1EQUFtRDtZQUNuRCx3REFBd0Q7WUFDeEQsc0NBQXNDO1lBQ3RDLGFBQWE7WUFDYixpQ0FBaUM7WUFDakMsMEJBQTBCO1lBQzFCLG9DQUFvQztZQUNwQywrQ0FBK0M7WUFDL0MsaUNBQWlDO1lBQ2pDLHVDQUF1QztZQUN2QyxjQUFjO1lBQ2QsU0FBUztZQUNULEtBQUs7WUFDTCxzQ0FBc0M7WUFFdEMsNEJBQTRCO1lBRTVCLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFBLG9CQUFPLEVBQ3BDLHlIQUF5SCxFQUN6SDtnQkFDSSxNQUFNLEVBQUUsS0FBSztnQkFDYixhQUFhO2dCQUNiLGtDQUFrQztnQkFDbEMsMENBQTBDO2dCQUMxQywyQ0FBMkM7Z0JBQzNDLGdEQUFnRDtnQkFDaEQsOEJBQThCO2dCQUM5QixLQUFLO2FBQ1IsQ0FDSixDQUFDO1lBQ0YsTUFBTSxjQUFjLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV2RCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztZQUVuQyxnRUFBZ0U7WUFDaEUsbUJBQW1CO1lBQ25CLEtBQUs7WUFFTCw0REFBNEQ7WUFDNUQsbUJBQW1CO1lBQ25CLGtFQUFrRTtZQUNsRSxTQUFTO1lBQ1Qsa0RBQWtEO1lBRWxELDRDQUE0QztZQUM1QyxZQUFZO1lBQ1osZ0RBQWdEO1lBQ2hELDBCQUEwQjtZQUMxQixxQ0FBcUM7WUFDckMsb0JBQW9CO1lBQ3BCLGtDQUFrQztZQUNsQyw4Q0FBOEM7WUFDOUMseUNBQXlDO1lBQ3pDLGdEQUFnRDtZQUNoRCxxQkFBcUI7WUFDckIsaUJBQWlCO1lBQ2pCLDhCQUE4QjtZQUM5QixhQUFhO1lBQ2IsNEJBQTRCO1lBQzVCLHNEQUFzRDtZQUN0RCxhQUFhO1lBQ2IsU0FBUztZQUNULE1BQU07WUFFTixpQ0FBaUM7UUFDckMsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXRJRCx3QkFzSUMifQ==