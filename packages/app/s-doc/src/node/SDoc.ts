import __SClass from '@coffeekraken/s-class';
import __SDocblock from '@coffeekraken/s-docblock';
import __SDocmap from '@coffeekraken/s-docmap';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __deepMerge } from '@coffeekraken/sugar/object';

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

export interface ISDocSettingsEndpoints {
    base?: string;
    doc?: string;
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
        // base url "/"
        express.get(this.settings.endpoints.base, (req, res) => {
            res.status(200);
            res.type('application/json');
            res.send(this.settings.categories);
        });
        console.log(
            `<yellow>[SDoc]</yellow> Exposing doc endpoint "<cyan>${this.settings.endpoints.base}</cyan>"`,
        );

        express.get(this.settings.endpoints.items, async (req, res) => {
            const filters = JSON.parse(decodeURIComponent(req.params.filters)),
                result = await this._docmap.search(filters);
            res.status(200);
            res.type('application/json');
            res.send(result.items ?? {});
        });
        console.log(
            `<yellow>[SDoc]</yellow> Exposing items endpoint "<cyan>${this.settings.endpoints.items}</cyan>"`,
        );

        express.get(this.settings.endpoints.item, async (req, res) => {
            const id = req.params.id;

            const item = this._docmapJson.map[id];
            if (item) {
                const docblock = new __SDocblock(item.path);
                item.docblocks = docblock.toObject();
            }

            res.status(200);
            res.type('application/json');
            res.send(item ?? {});
        });
        console.log(
            `<yellow>[SDoc]</yellow> Exposing item endpoint "<cyan>${this.settings.endpoints.item}</cyan>"`,
        );
    }
}
