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
const path_2 = __importDefault(require("path"));
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
            _console.log('rela', relativeRootDir);
            this._express.use(express_1.default.static(relativeRootDir));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCwyREFBc0Q7QUFDdEQseURBQTJEO0FBQzNELDhEQUF3QztBQUN4QyxzREFBZ0M7QUFDaEMsNEhBQW1HO0FBQ25HLCtCQUErQjtBQUMvQixtREFBNEQ7QUFDNUQseURBQThEO0FBQzlELGdEQUEwQjtBQUUxQix1REFBeUQ7QUFFekQsOERBQXVDO0FBK0J2QyxNQUFxQixhQUFjLFNBQVEsaUJBQVE7SUFhL0M7Ozs7Ozs7OztPQVNHO0lBQ0g7UUFDSSxLQUFLLG1CQUNFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUN2QyxDQUFDO1FBRUgsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBQSxpQkFBUyxHQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxLQUFLLENBQ0QsTUFBbUQ7O1FBRW5ELE1BQU0sV0FBVyxHQUE4QixJQUFBLG9CQUFXLEVBQ3RELE1BQUEsSUFBSSxDQUFDLFFBQVEsbUNBQUksRUFBRSxFQUNuQiw4Q0FBbUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQ3BELENBQUM7UUFFRixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUEscUJBQWEsR0FBRSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sZUFBZSxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQ25DLElBQUEsdUJBQWdCLEdBQUUsRUFDbEIsV0FBVyxDQUFDLE9BQU8sQ0FDdEIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFFckQsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFBLHNCQUFZLEVBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsZ0JBQWdCLFdBQVcsQ0FBQyxJQUFJLCtFQUErRSxDQUNsSCxDQUFDO2dCQUNGLE9BQU8sTUFBTSxFQUFFLENBQUM7YUFDbkI7WUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQVMsRUFBRTs7Z0JBQzdELE1BQU0sSUFBQSxpQkFBTSxFQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVsQixTQUFTO2dCQUNULCtDQUErQztnQkFDL0MsNEJBQTRCO2dCQUM1QixnRkFBZ0Y7Z0JBQ2hGLFNBQVM7Z0JBQ1QsTUFBTTtnQkFFTiw4QkFBOEI7Z0JBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQ1Asb0VBQW9FLENBQ3ZFLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FDUCxrQkFBa0IsV0FBVyxDQUFDLFFBQVEsbUJBQW1CLFdBQVcsQ0FBQyxJQUFJLFNBQVMsQ0FDckYsQ0FBQztnQkFDRixNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLHlCQUF5QixXQUFXLENBQUMsT0FBTyxTQUFTLENBQ3hELENBQUM7Z0JBRUYsT0FBTyxDQUFDLEdBQUcsRUFBRTtvQkFDVCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFOzRCQUNkLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbkIsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO1lBRUgsSUFBQSx5QkFBZSxFQUFDLEdBQUcsRUFBRTtnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FDUCx3RUFBd0UsQ0FDM0UsQ0FBQztnQkFDRixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBUyxFQUFFO3dCQUNwQixNQUFNLElBQUEsaUJBQU0sRUFBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBbEhELGdDQWtIQyJ9