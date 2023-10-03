import __SClass from '@coffeekraken/s-class';
import __SDocblock from '@coffeekraken/s-docblock';
import __SDocmap from '@coffeekraken/s-docmap';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __base64 } from '@coffeekraken/sugar/crypto';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __bodyParser from 'body-parser';
import __compression from 'compression';
import __cors from 'cors';
import __express from 'express';
import __SDocServeParamsInterface from './interface/SDocServeParamsInterface.js';

/**
 * @name                SDoc
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent the s-doc backend side of the documentation system.
 * It allows you to expose some endpoints on an express based server that will
 * serve the different documentation informations as well as the actual documentation
 * (rendered or not).
 *
 * @param           {ISDocSettings}          [settings={}]           Some settings to configure your doc instance
 *
 * @example         js
 * import __SDoc from '@coffeekraken/s-doc';
 * const doc = new __SDoc();
 * doc.initOnExpressServer(myExpressApp);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISDocServeParams {
    port: number;
}

export interface ISDocSettingsEndpoints {
    base?: string;
    item?: string;
    items?: string;
}

export interface ISDocSettingsCategory {
    title: string;
    description: string;
    filters?: Record<string, string>;
    children?: Record<string, ISDocSettingsCategory>;
}

export interface ISDocSettings {
    categories: Record<string, ISDocSettingsCategory>;
    endpoints?: ISDocSettings;
}

export default class SDoc extends __SClass {
    _docmap: __SDocmap;
    _docmapJson: any;

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: ISDocSettings) {
        super(__deepMerge(__SSugarConfig.get('doc') ?? {}, settings ?? {}));

        (async () => {
            this._docmap = new __SDocmap();
            this._docmapJson = await this._docmap.read();
        })();
    }

    serve(params: __SDocServeParamsInterface | string): Promise<any> {
        return new Promise((resolve) => {
            const finalParams = __SDocServeParamsInterface.apply(params);
            const app = __express();
            app.use(__compression());
            this.initOnExpressServer(app);
            const server = app.listen(finalParams.port, async () => {
                await __wait(100);

                // 404
                app.get('*', function (req, res) {
                    res.status(404).send(
                        `╰◝◟≖◞౪◟≖◞◜╯ Lost in the darkness your "${req.url}" certainly is...`,
                    );
                });

                // server started successfully
                console.log(
                    `<yellow>SDoc server</yellow> started <green>successfully</green>`,
                );
                console.log(
                    `<yellow>http://localhost</yellow>:<cyan>${finalParams.port}</cyan>`,
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
                    `<red>[kill]</red> Gracefully killing the <cyan>doc server</cyan>...`,
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

    /**
     * @name            initOnExpressServer
     * @type            Function
     *
     * This method simply take an express app as parameter and
     * will expose some documentation enpoints like "/api/doc/...".
     * These endpoints are customizable through the .sugar/doc.config.ts file.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    initOnExpressServer(express: any): void {
        // cors
        const cors = __cors();

        // body parser
        express.use(__bodyParser.urlencoded({ extended: true }));
        // express.use(__bodyParser.json());

        // base url "/"
        express.get(this.settings.endpoints.base, cors, (req, res) => {
            res.status(200);
            res.type('application/json');
            res.send(this.settings.categories);
        });
        console.log(
            `<yellow>[SDoc]</yellow> Exposing doc endpoint "<cyan>${this.settings.endpoints.base}</cyan>"`,
        );

        express.get(
            `${this.settings.endpoints.base}${this.settings.endpoints.items}/:filters`,
            cors,
            async (req, res) => {
                const filters = JSON.parse(
                        __base64.decrypt(req.params.filters),
                    ),
                    result = await this._docmap.search(filters);

                res.status(200);
                res.type('application/json');
                res.send(result.items ?? {});
            },
        );
        console.log(
            `<yellow>[SDoc]</yellow> Exposing items endpoint "<cyan>${this.settings.endpoints.items}</cyan>"`,
        );

        express.get(
            `${this.settings.endpoints.base}${this.settings.endpoints.item}`,
            cors,
            async (req, res) => {
                const id = req.params.id;

                const item = this._docmapJson.map[id];

                if (!item) {
                    res.status(200);
                    res.type('application/json');
                    res.send({});
                }

                if (item.type.raw?.toLowerCase?.() === 'markdown') {
                    // render the markdown
                    const builder = new __SMarkdownBuilder({});
                    const mdResult = await builder.build({
                        inPath: item.path,
                        target: 'html',
                        save: false,
                        log: false,
                    });
                    item.docHtml = mdResult[0].code;
                } else if (item) {
                    const docblock = new __SDocblock(item.path);
                    await docblock.parse();
                    item.docblocks = docblock.toObject().filter((db) => {
                        return db.id === id;
                    });
                }

                res.status(200);
                res.type('application/json');
                res.send(item ?? {});
            },
        );
        console.log(
            `<yellow>[SDoc]</yellow> Exposing item endpoint "<cyan>${this.settings.endpoints.item}</cyan>"`,
        );
    }
}
