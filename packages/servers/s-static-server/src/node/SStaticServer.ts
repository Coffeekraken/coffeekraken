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
import __path from 'path';

import { __deepMerge } from '@coffeekraken/sugar/object';

import __bodyParser from 'body-parser';

/**
 * @name            SStaticServer
 * @namespace       node
 * @type            Class
 * @extends         SEventEmitter
 * @platform        node
 * @status          beta
 * @private
 *
 * This class represent a static server
 *
 * @param       {ISStaticServerSettings}        [settings={}]           Some settings to configure your static server
 *
 * @example         js
 * import SStaticServer from '@coffeekraken/s-static-server';
 * const server = new SStaticServer();
 * server.start();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISStaticServerStartParams {
    port: number;
    hostname: string;
    rootDir: string;
}

export interface ISStaticServerSettings extends ISStaticServerStartParams {}

export default class SStaticServer extends __SClass {
    /**
     * @name            _express
     * @type            Object
     * @private
     *
     * Store the express server instance
     *
     * @since       2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _express;

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
        super({
            ...__SSugarConfig.get('staticServer'),
        });

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
    start(
        params: Partial<ISStaticServerStartParams> | string,
    ): Promise<any | Function> {
        const finalParams: ISStaticServerStartParams = __deepMerge(
            this.settings ?? {},
            __SStaticServerStartParamsInterface.apply(params),
        );

        return new Promise(async (resolve, reject) => {
            this._express.use(__compression());
            this._express.use(__bodyParser.json({ limit: '120mb' }));
            const relativeRootDir = __path.relative(
                __packageRootDir(),
                finalParams.rootDir,
            );
            _console.log('rela', relativeRootDir);
            this._express.use(__express.static(relativeRootDir));

            if (!(await __isPortFree(finalParams.port))) {
                console.log(
                    `Port <yellow>${finalParams.port}</yellow> already in use. Please make sure to make it free before retrying...`,
                );
                return reject();
            }

            const server = this._express.listen(finalParams.port, async () => {
                await __wait(100);

                // // 404
                // this._express.get('*', function (req, res) {
                //     res.status(404).send(
                //         `╰◝◟≖◞౪◟≖◞◜╯ Lost in the darkness your "${req.url}" certainly is...`,
                //     );
                // });

                // server started successfully
                console.log(
                    `<yellow>Static server</yellow> started <green>successfully</green>`,
                );
                console.log(
                    `<yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`,
                );
                console.verbose?.(
                    `Root directory: <cyan>${finalParams.rootDir}</cyan>`,
                );

                resolve(() => {
                    return new Promise((_resolve) => {
                        server.close(() => {
                            _resolve(null);
                        });
                    });
                });
            });

            __onProcessExit(() => {
                console.log(
                    `<red>[kill]</red> Gracefully killing the <cyan>static server</cyan>...`,
                );
                return new Promise((_resolve) => {
                    server.close(async () => {
                        await __wait(500);
                        _resolve(null);
                    });
                });
            });
        });
    }
}
