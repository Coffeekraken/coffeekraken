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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUNuRCxzRUFBK0M7QUFDL0MsMEZBQWtFO0FBQ2xFLGtGQUEwRDtBQUMxRCwyREFBc0Q7QUFDdEQsdURBQXlEO0FBQ3pELHlEQUE4RDtBQUM5RCw4REFBdUM7QUFDdkMsOERBQXdDO0FBQ3hDLGdEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsMEdBQWlGO0FBZ0RqRixNQUFxQixJQUFLLFNBQVEsaUJBQVE7SUFJdEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF3Qjs7UUFDaEMsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxNQUFBLHdCQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQ0FBSSxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVwRSxDQUFDLEdBQVMsRUFBRTtZQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakQsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUEyQztRQUM3QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxXQUFXLEdBQUcscUNBQTBCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdELE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQVMsR0FBRSxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxxQkFBYSxHQUFFLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FB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