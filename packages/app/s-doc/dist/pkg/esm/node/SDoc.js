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
import __SDocblock from '@coffeekraken/s-docblock';
import __SDocmap from '@coffeekraken/s-docmap';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __bodyParser from 'body-parser';
import __cors from 'cors';
import __express from 'express';
import __SDocServeParamsInterface from './interface/SDocServeParamsInterface';
export default class SDoc extends __SClass {
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
    constructor(settings) {
        var _a;
        super(__deepMerge((_a = __SSugarConfig.get('doc')) !== null && _a !== void 0 ? _a : {}, settings !== null && settings !== void 0 ? settings : {}));
        (() => __awaiter(this, void 0, void 0, function* () {
            this._docmap = new __SDocmap();
            this._docmapJson = yield this._docmap.read();
        }))();
    }
    serve(params) {
        return new Promise((resolve) => {
            const finalParams = __SDocServeParamsInterface.apply(params);
            const app = __express();
            this.initOnExpressServer(app);
            const server = app.listen(finalParams.port, () => __awaiter(this, void 0, void 0, function* () {
                yield __wait(100);
                // 404
                app.get('*', function (req, res) {
                    res.status(404).send(`╰◝◟≖◞౪◟≖◞◜╯ Lost in the darkness your "${req.url}" certainly is...`);
                });
                // server started successfully
                console.log(`<yellow>SDoc server</yellow> started <green>successfully</green>`);
                console.log(`<yellow>http://localhost</yellow>:<cyan>${finalParams.port}</cyan>`);
                resolve(() => {
                    return new Promise((_resolve) => {
                        server.close(() => {
                            _resolve(null);
                        });
                    });
                });
            }));
            __onProcessExit(() => {
                console.log(`<red>[kill]</red> Gracefully killing the <cyan>doc server</cyan>...`);
                return new Promise((_resolve) => {
                    server.close(() => __awaiter(this, void 0, void 0, function* () {
                        yield __wait(500);
                        _resolve(null);
                    }));
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
    initOnExpressServer(express) {
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
        console.log(`<yellow>[SDoc]</yellow> Exposing doc endpoint "<cyan>${this.settings.endpoints.base}</cyan>"`);
        express.post(`${this.settings.endpoints.base}${this.settings.endpoints.items}`, cors, (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const filters = JSON.parse(Object.keys(req.body)[0]), result = yield this._docmap.search(filters);
            res.status(200);
            res.type('application/json');
            res.send((_a = result.items) !== null && _a !== void 0 ? _a : {});
        }));
        console.log(`<yellow>[SDoc]</yellow> Exposing items endpoint "<cyan>${this.settings.endpoints.items}</cyan>"`);
        express.get(`${this.settings.endpoints.base}${this.settings.endpoints.item}`, cors, (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c;
            const id = req.params.id;
            const item = this._docmapJson.map[id];
            if (!item) {
                res.status(200);
                res.type('application/json');
                res.send({});
            }
            if (((_c = (_b = item.type.raw) === null || _b === void 0 ? void 0 : _b.toLowerCase) === null || _c === void 0 ? void 0 : _c.call(_b)) === 'markdown') {
                // render the markdown
                const builder = new __SMarkdownBuilder({});
                const mdResult = yield builder.build({
                    inPath: item.path,
                    target: 'html',
                    save: false,
                    log: false,
                });
                item.docHtml = mdResult[0].code;
            }
            else if (item) {
                const docblock = new __SDocblock(item.path);
                yield docblock.parse();
                item.docblocks = docblock.toObject();
            }
            res.status(200);
            res.type('application/json');
            res.send(item !== null && item !== void 0 ? item : {});
        }));
        console.log(`<yellow>[SDoc]</yellow> Exposing item endpoint "<cyan>${this.settings.endpoints.item}</cyan>"`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sa0JBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTywwQkFBMEIsTUFBTSxzQ0FBc0MsQ0FBQztBQWdEOUUsTUFBTSxDQUFDLE9BQU8sT0FBTyxJQUFLLFNBQVEsUUFBUTtJQUl0Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXdCOztRQUNoQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEUsQ0FBQyxHQUFTLEVBQUU7WUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakQsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1Qs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