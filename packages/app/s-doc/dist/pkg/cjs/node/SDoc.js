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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const s_markdown_builder_1 = __importDefault(require("@coffeekraken/s-markdown-builder"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const crypto_1 = require("@coffeekraken/sugar/crypto");
const datetime_1 = require("@coffeekraken/sugar/datetime");
const object_1 = require("@coffeekraken/sugar/object");
const process_1 = require("@coffeekraken/sugar/process");
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const SDocServeParamsInterface_js_1 = __importDefault(require("./interface/SDocServeParamsInterface.js"));
class SDoc extends s_class_1.default {
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
        super((0, object_1.__deepMerge)((_a = s_sugar_config_1.default.get('doc')) !== null && _a !== void 0 ? _a : {}, settings !== null && settings !== void 0 ? settings : {}));
        (() => __awaiter(this, void 0, void 0, function* () {
            this._docmap = new s_docmap_1.default();
            this._docmapJson = yield this._docmap.read();
        }))();
    }
    serve(params) {
        return new Promise((resolve) => {
            const finalParams = SDocServeParamsInterface_js_1.default.apply(params);
            const app = (0, express_1.default)();
            app.use((0, compression_1.default)());
            this.initOnExpressServer(app);
            const server = app.listen(finalParams.port, () => __awaiter(this, void 0, void 0, function* () {
                yield (0, datetime_1.__wait)(100);
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
            (0, process_1.__onProcessExit)(() => {
                console.log(`<red>[kill]</red> Gracefully killing the <cyan>doc server</cyan>...`);
                return new Promise((_resolve) => {
                    server.close(() => __awaiter(this, void 0, void 0, function* () {
                        yield (0, datetime_1.__wait)(500);
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
        const cors = (0, cors_1.default)();
        // body parser
        express.use(body_parser_1.default.urlencoded({ extended: true }));
        // express.use(__bodyParser.json());
        // base url "/"
        express.get(this.settings.endpoints.base, cors, (req, res) => {
            res.status(200);
            res.type('application/json');
            res.send(this.settings.categories);
        });
        console.log(`<yellow>[SDoc]</yellow> Exposing doc endpoint "<cyan>${this.settings.endpoints.base}</cyan>"`);
        express.get(`${this.settings.endpoints.base}${this.settings.endpoints.items}/:filters`, cors, (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const filters = JSON.parse(crypto_1.__base64.decrypt(req.params.filters)), result = yield this._docmap.search(filters);
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
                const builder = new s_markdown_builder_1.default({});
                const mdResult = yield builder.build({
                    inPath: item.path,
                    target: 'html',
                    save: false,
                    log: false,
                });
                item.docHtml = mdResult[0].code;
            }
            else if (item) {
                const docblock = new s_docblock_1.default(item.path);
                yield docblock.parse();
                item.docblocks = docblock.toObject().filter((db) => {
                    return db.id === id;
                });
            }
            res.status(200);
            res.type('application/json');
            res.send(item !== null && item !== void 0 ? item : {});
        }));
        console.log(`<yellow>[SDoc]</yellow> Exposing item endpoint "<cyan>${this.settings.endpoints.item}</cyan>"`);
    }
}
exports.default = SDoc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUNuRCxzRUFBK0M7QUFDL0MsMEZBQWtFO0FBQ2xFLGtGQUEwRDtBQUMxRCx1REFBc0Q7QUFDdEQsMkRBQXNEO0FBQ3RELHVEQUF5RDtBQUN6RCx5REFBOEQ7QUFDOUQsOERBQXVDO0FBQ3ZDLDhEQUF3QztBQUN4QyxnREFBMEI7QUFDMUIsc0RBQWdDO0FBQ2hDLDBHQUFpRjtBQWdEakYsTUFBcUIsSUFBSyxTQUFRLGlCQUFRO0lBSXRDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0I7O1FBQ2hDLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsTUFBQSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEUsQ0FBQyxHQUFTLEVBQUU7WUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pELENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztJQUNULENBQUM7SUFFRCxLQUFLLENBQUMsTUFBMkM7UUFDN0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLE1BQU0sV0FBVyxHQUFHLHFDQUEwQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3RCxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFTLEdBQUUsQ0FBQztZQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEscUJBQWEsR0FBRSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLG1C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