var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __isPortFree } from '@coffeekraken/sugar/network';
import __compression from 'compression';
import __express from 'express';
import __SStaticServerStartParamsInterface from './interface/SStaticServerStartParamsInterface.js';
// import __vhost from 'vhost';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __fs from 'fs';
import __path from 'path';
import __expressHtaccessMiddleware from 'express-htaccess-middleware';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __bodyParser from 'body-parser';
export default class SStaticServer extends __SClass {
    /**
     * @name					constructor
     * @type 					Function
     * @constructor
     *
     * Constructor
     *
     * @since 					2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor() {
        super(Object.assign({}, __SSugarConfig.get('staticServer')));
        // instanciate a new express server
        this._express = __express();
    }
    /**
     * @name        start
     * @type           Function
     * @async
     *
     * This function take as parameter an Partial<ISStaticServerStartParams> object,
     * start a server using these parameters and returns an SPromise instance
     * through which you can subscribe for events, etc...
     *
     * @return      Promise<Function>           A promise that will be resolved when the server has started with a function to stop it
     *
     * @since       2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        var _a;
        const finalParams = __deepMerge((_a = this.settings) !== null && _a !== void 0 ? _a : {}, __SStaticServerStartParamsInterface.apply(params));
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this._express.use(__compression());
            this._express.use(__bodyParser.json({ limit: '120mb' }));
            const relativeRootDir = __path.relative(__packageRootDir(), finalParams.rootDir);
            this._express.use(__express.static(relativeRootDir));
            const htaccessFilePath = __path.resolve(__packageRootDir(), relativeRootDir, '.htaccess');
            if (__fs.existsSync(htaccessFilePath)) {
                console.log('S', htaccessFilePath);
                this._express.use(__expressHtaccessMiddleware({
                    file: htaccessFilePath,
                    verbose: true,
                    watch: true,
                }));
            }
            if (!(yield __isPortFree(finalParams.port))) {
                console.log(`Port <yellow>${finalParams.port}</yellow> already in use. Please make sure to make it free before retrying...`);
                return reject();
            }
            const server = this._express.listen(finalParams.port, () => __awaiter(this, void 0, void 0, function* () {
                var _b;
                yield __wait(100);
                // // 404
                // this._express.get('*', function (req, res) {
                //     res.status(404).send(
                //         `╰◝◟≖◞౪◟≖◞◜╯ Lost in the darkness your "${req.url}" certainly is...`,
                //     );
                // });
                // server started successfully
                console.log(`<yellow>Static server</yellow> started <green>successfully</green>`);
                console.log(`<yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`);
                (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `Root directory: <cyan>${finalParams.rootDir}</cyan>`);
                resolve(() => {
                    return new Promise((_resolve) => {
                        server.close(() => {
                            _resolve(null);
                        });
                    });
                });
            }));
            __onProcessExit(() => {
                console.log(`<red>[kill]</red> Gracefully killing the <cyan>static server</cyan>...`);
                return new Promise((_resolve) => {
                    server.close(() => __awaiter(this, void 0, void 0, function* () {
                        yield __wait(500);
                        _resolve(null);
                    }));
                });
            });
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxhQUFhLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLG1DQUFtQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ25HLCtCQUErQjtBQUMvQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLDJCQUEyQixNQUFNLDZCQUE2QixDQUFDO0FBRXRFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RCxPQUFPLFlBQVksTUFBTSxhQUFhLENBQUM7QUErQnZDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLFFBQVE7SUFhL0M7Ozs7Ozs7OztPQVNHO0lBQ0g7UUFDSSxLQUFLLG1CQUNFLGNBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQ3ZDLENBQUM7UUFFSCxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEtBQUssQ0FDRCxNQUFtRDs7UUFFbkQsTUFBTSxXQUFXLEdBQThCLFdBQVcsQ0FDdEQsTUFBQSxJQUFJLENB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