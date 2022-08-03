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
import __fetch from 'node-fetch';
import __express from 'express';
export default function start(stringArgs = '') {
    return new __SPromise(({ resolve, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
        const app = __express();
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
            const screenshotResponse = yield __fetch('https://api.browshot.com/api/v1/screenshot/create?key=HcS2Mvnp7DsFXSlVBnaRTAmkXtJ&url=https://google.com&instance_id=12', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sT0FBTyxNQUFNLFlBQVksQ0FBQztBQUVqQyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFFaEMsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDekMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3BELE1BQU0sR0FBRyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBRXhCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5CLHdCQUF3QjtZQUN4Qiw4Q0FBOEM7WUFDOUMsMERBQTBEO1lBQzFELEtBQUs7WUFFTCxnRUFBZ0U7WUFDaEUsbUJBQW1CO1lBQ25CLEtBQUs7WUFFTCx3Q0FBd0M7WUFDeEMsUUFBUTtZQUNSLHFDQUFxQztZQUNyQyxzQkFBc0I7WUFDdEIsZ0JBQWdCO1lBQ2hCLGlDQUFpQztZQUNqQyxvQ0FBb0M7WUFDcEMsaUNBQWlDO1lBQ2pDLDBDQUEwQztZQUMxQyxpQkFBaUI7WUFDakIsYUFBYTtZQUNiLFNBQVM7WUFDVCx3QkFBd0I7WUFDeEIsdUNBQXVDO1lBQ3ZDLG1DQUFtQztZQUNuQyxTQUFTO1lBQ1QsS0FBSztZQUVMLGlCQUFpQjtZQUNqQiw2QkFBNkI7WUFDN0IscURBQXFEO1lBQ3JELDJCQUEyQjtZQUMzQiw0QkFBNEI7WUFDNUIsNkJBQTZCO1lBQzdCLG9CQUFvQjtZQUNwQiwrQkFBK0I7WUFDL0Isa0JBQWtCO1lBQ2xCLFlBQVk7WUFDWiw2QkFBNkI7WUFDN0IsZ0NBQWdDO1lBQ2hDLDZCQUE2QjtZQUM3QixzQ0FBc0M7WUFDdEMsYUFBYTtZQUNiLFNBQVM7WUFDVCxLQUFLO1lBRUwsd0NBQXdDO1lBQ3hDLGtDQUFrQztZQUNsQywrQ0FBK0M7WUFDL0MsUUFBUTtZQUNSLDBCQUEwQjtZQUMxQiwwREFBMEQ7WUFDMUQsd0ZBQXdGO1lBQ3hGLHdFQUF3RTtZQUN4RSxxQkFBcUI7WUFDckIsMENBQTBDO1lBQzFDLGtEQUFrRDtZQUNsRCxtREFBbUQ7WUFDbkQsd0RBQXdEO1lBQ3hELHNDQUFzQztZQUN0QyxhQUFhO1lBQ2IsaUNBQWlDO1lBQ2pDLDBCQUEwQjtZQUMxQixvQ0FBb0M7WUFDcEMsK0NBQStDO1lBQy9DLGlDQUFpQztZQUNqQyx1Q0FBdUM7WUFDdkMsY0FBYztZQUNkLFNBQVM7WUFDVCxLQUFLO1lBQ0wsc0NBQXNDO1lBRXRDLDRCQUE0QjtZQUU1QixNQUFNLGtCQUFrQixHQUFHLE1BQU0sT0FBTyxDQUNwQyx5SEFBeUgsRUFDekg7Z0JBQ0ksTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsYUFBYTtnQkFDYixrQ0FBa0M7Z0JBQ2xDLDBDQUEwQztnQkFDMUMsMkNBQTJDO2dCQUMzQyxnREFBZ0Q7Z0JBQ2hELDhCQUE4QjtnQkFDOUIsS0FBSzthQUNSLENBQ0osQ0FBQztZQUNGLE1BQU0sY0FBYyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFbkMsZ0VBQWdFO1lBQ2hFLG1CQUFtQjtZQUNuQixLQUFLO1lBRUwsNERBQTREO1lBQzVELG1CQUFtQjtZQUNuQixrRUFBa0U7WUFDbEUsU0FBUztZQUNULGtEQUFrRDtZQUVsRCw0Q0FBNEM7WUFDNUMsWUFBWTtZQUNaLGdEQUFnRDtZQUNoRCwwQkFBMEI7WUFDMUIscUNBQXFDO1lBQ3JDLG9CQUFvQjtZQUNwQixrQ0FBa0M7WUFDbEMsOENBQThDO1lBQzlDLHlDQUF5QztZQUN6QyxnREFBZ0Q7WUFDaEQscUJBQXFCO1lBQ3JCLGlCQUFpQjtZQUNqQiw4QkFBOEI7WUFDOUIsYUFBYTtZQUNiLDRCQUE0QjtZQUM1QixzREFBc0Q7WUFDdEQsYUFBYTtZQUNiLFNBQVM7WUFDVCxNQUFNO1lBRU4saUNBQWlDO1FBQ3JDLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==