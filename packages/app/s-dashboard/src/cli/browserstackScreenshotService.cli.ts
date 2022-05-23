import __SPromise from '@coffeekraken/s-promise';
import __browserstack from 'browserstack';
import __fetch from 'node-fetch';

import __express from 'express';

export default function start(stringArgs = '') {
    return new __SPromise(async ({ resolve, pipe, emit }) => {
        const app = __express();

        app.all('*', async (req, res, next) => {
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

            const screenshotResponse = await __fetch(
                'https://api.browshot.com/api/v1/screenshot/create?key=HcS2Mvnp7DsFXSlVBnaRTAmkXtJ&url=https://google.com&instance_id=12',
                {
                    method: 'get',
                    // headers: {
                    //     Accept: 'application/json',
                    //     'Content-Type': 'application/json',
                    //     Authorization: `Basic ${Buffer.from(
                    //         'olivierbossel:yOBXOfHyasdoFUqqHVNs',
                    //     ).toString('base64')}`,
                    // },
                },
            );
            const screenshotJson = await screenshotResponse.text();

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
        });

        app.listen(9991, () => {
            console.log('listening on port 9991');
        });
    });
}
