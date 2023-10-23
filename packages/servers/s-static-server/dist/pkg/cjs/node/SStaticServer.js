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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const network_1 = require("@coffeekraken/sugar/network");
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const SStaticServerStartParamsInterface_js_1 = __importDefault(require("./interface/SStaticServerStartParamsInterface.js"));
// import __vhost from 'vhost';
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const fs_1 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const express_htaccess_middleware_1 = __importDefault(require("express-htaccess-middleware"));
const object_1 = require("@coffeekraken/sugar/object");
const body_parser_1 = __importDefault(require("body-parser"));
class SStaticServer extends s_class_1.default {
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
        super(Object.assign({}, s_sugar_config_1.default.get('staticServer')));
        // instanciate a new express server
        this._express = (0, express_1.default)();
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
        const finalParams = (0, object_1.__deepMerge)((_a = this.settings) !== null && _a !== void 0 ? _a : {}, SStaticServerStartParamsInterface_js_1.default.apply(params));
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this._express.use((0, compression_1.default)());
            this._express.use(body_parser_1.default.json({ limit: '120mb' }));
            const relativeRootDir = path_2.default.relative((0, path_1.__packageRootDir)(), finalParams.rootDir);
            this._express.use(express_1.default.static(relativeRootDir));
            const htaccessFilePath = path_2.default.resolve((0, path_1.__packageRootDir)(), relativeRootDir, '.htaccess');
            if (fs_1.default.existsSync(htaccessFilePath)) {
                this._express.use((0, express_htaccess_middleware_1.default)({
                    file: htaccessFilePath,
                    verbose: true,
                    watch: true,
                }));
            }
            if (!(yield (0, network_1.__isPortFree)(finalParams.port))) {
                console.log(`Port <yellow>${finalParams.port}</yellow> already in use. Please make sure to make it free before retrying...`);
                return reject();
            }
            const server = this._express.listen(finalParams.port, () => __awaiter(this, void 0, void 0, function* () {
                var _b;
                yield (0, datetime_1.__wait)(100);
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
            (0, process_1.__onProcessExit)(() => {
                console.log(`<red>[kill]</red> Gracefully killing the <cyan>static server</cyan>...`);
                return new Promise((_resolve) => {
                    server.close(() => __awaiter(this, void 0, void 0, function* () {
                        yield (0, datetime_1.__wait)(500);
                        _resolve(null);
                    }));
                });
            });
        }));
    }
}
exports.default = SStaticServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCwyREFBc0Q7QUFDdEQseURBQTJEO0FBQzNELDhEQUF3QztBQUN4QyxzREFBZ0M7QUFDaEMsNEhBQW1HO0FBQ25HLCtCQUErQjtBQUMvQixtREFBNEQ7QUFDNUQseURBQThEO0FBQzlELDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsOEZBQXNFO0FBRXRFLHVEQUF5RDtBQUV6RCw4REFBdUM7QUErQnZDLE1BQXFCLGFBQWMsU0FBUSxpQkFBUTtJQWEvQzs7Ozs7Ozs7O09BU0c7SUFDSDtRQUNJLEtBQUssbUJBQ0Usd0JBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQ3ZDLENBQUM7UUFFSCxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFBLGlCQUFTLEdBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEtBQUssQ0FDRCxNQUFtRDs7UUFFbkQsTUFBTSxXQUFXLEdBQThCLElBQUEsb0JBQVcsRUFDdEQsTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLEVBQ25CLDhDQUFtQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FDcEQsQ0FBQztRQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBQSxxQkFBYSxHQUFFLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTSxlQUFlLEdBQUcsY0FBTSxDQUFDLFFBQVEsQ0FD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