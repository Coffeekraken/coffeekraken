"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const s_builder_1 = __importDefault(require("@coffeekraken/s-builder"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const extension_1 = __importDefault(require("@coffeekraken/sugar/node/fs/extension"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const class_1 = __importDefault(require("@coffeekraken/sugar/shared/is/class"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const path_1 = __importDefault(require("path"));
const SSitemapBuilderBuildParamsInterface_1 = __importDefault(require("./interface/SSitemapBuilderBuildParamsInterface"));
class SSitemapBuilder extends s_builder_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        var _a;
        super((0, deepMerge_1.default)({
            sources: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        const config = s_sugar_config_1.default.get('sitemapBuilder');
        this.settings.sources = (0, deepMerge_1.default)((_a = config.sources) !== null && _a !== void 0 ? _a : {}, this.settings.sources);
    }
    /**
     * @name            build
     * @type            Function
     * @async
     *
     * This method allows you to generate your sitemap with all the added sources
     * and save it to disk, or just returns the result as a promise value
     *
     * @param       {Partial<ISSitemapBuilderBuildParams>}          [params={}]         The params for your build process
     * @return      {SPromise<ISSitemapBuilderBuildResult>}                    A promise resolved with the sitemap result when success
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(params = {}) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let sitemap = [];
            // @ts-ignore
            const finalParams = SSitemapBuilderBuildParamsInterface_1.default.apply(params);
            const duration = new s_duration_1.default();
            let sourcesId = finalParams.source.length
                ? finalParams.source
                : Object.keys(this.settings.sources);
            for (let i = 0; i < sourcesId.length; i++) {
                const sourceId = sourcesId[i];
                if (!this.settings.sources[sourceId]) {
                    throw new Error(`Sorry but the source "<yellow>${sourceId}</yellow>" is not available. Here's the sources you can use: ${Object.keys(this.settings.sources).join(',')}`);
                }
                const sourceObj = this.settings.sources[sourceId];
                // skip inactive sources
                if (!sourceObj.active)
                    continue;
                // load source
                // @ts-ignore
                const importedSource = (yield Promise.resolve().then(() => __importStar(require(sourceObj.path))))
                    .default;
                let buildFn;
                if ((0, class_1.default)(importedSource)) {
                    // instanciate new source
                    const sourceInstance = new importedSource(Object.assign({}, (0, deepMerge_1.default)((_a = sourceObj.settings) !== null && _a !== void 0 ? _a : {}, (_b = finalParams.sourcesSettings[sourceId]) !== null && _b !== void 0 ? _b : {})));
                    buildFn = sourceInstance.build.bind(sourceInstance);
                }
                else if (typeof importedSource === 'function') {
                    buildFn = importedSource;
                }
                const sourceDuration = new s_duration_1.default();
                // build
                const buildResultPromise = buildFn(finalParams);
                if (buildResultPromise instanceof s_promise_1.default) {
                    pipe(buildResultPromise);
                }
                const buildResult = yield buildResultPromise;
                sitemap = [...sitemap, ...(buildResult !== null && buildResult !== void 0 ? buildResult : [])];
                emit('log', {
                    value: `<yellow>[build]</yellow> "<magenta>${sourceId}</magenta>" sitemap builded with <magenta>${buildResult.length}</magenta> item(s) <green>successfully</green> in <yellow>${sourceDuration.end().formatedDuration}</yellow>`,
                });
            }
            if (finalParams.save) {
                emit('log', {
                    value: `<yellow>[save]</yellow> Saving your sitemap under "<cyan>${path_1.default.relative((0, packageRoot_1.default)(), finalParams.output)}</cyan>"`,
                });
                this.save(sitemap, finalParams.output);
            }
            emit('log', {
                value: `<yellow>[build]</yellow> Sitemap builded <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
            // resolve the build
            resolve(sitemap);
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
    /**
     * @name            save
     * @type            Function
     * @async
     *
     * This method takes all the sitemap items with an output path and save your sitemap
     *
     * @param       {ISSitemapBuilderResultItem[]}         items           Your sitemap items to save
     * @param       {String}                        path            The ourput path where you want to save yous sitemap
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    save(items, path) {
        switch ((0, extension_1.default)(path)) {
            case 'xml':
            default:
                let xmlStr = [
                    '<?xml version="1.0" encoding="UTF-8"?>',
                    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                    '   <url>',
                    '       <loc>/</loc>',
                    '   </url>',
                ];
                items.forEach((item) => {
                    const itemStr = [];
                    itemStr.push(`  <url>`);
                    for (let [key, value] of Object.entries(item)) {
                        itemStr.push(`<${key}>${value}</${key}>`);
                    }
                    itemStr.push('  </url>');
                    xmlStr.push(itemStr.join('\n'));
                });
                // ending xml
                xmlStr.push('</urlset>');
                // saving file
                (0, writeFileSync_1.default)(path, xmlStr.join('\n'));
                break;
        }
    }
}
exports.default = SSitemapBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsMEVBQW1EO0FBQ25ELHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsc0ZBQWdFO0FBQ2hFLDhGQUF3RTtBQUN4RSw0RkFBc0U7QUFDdEUsZ0ZBQTREO0FBQzVELDRGQUFzRTtBQUN0RSxnREFBMEI7QUFDMUIsMEhBQW9HO0FBOERwRyxNQUFxQixlQUFnQixTQUFRLG1CQUFVO0lBQ25EOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBNEM7O1FBQ3BELEtBQUssQ0FDRCxJQUFBLG1CQUFXLEVBQ1A7WUFDSSxPQUFPLEVBQUUsRUFBRTtTQUNkLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUEsbUJBQVcsRUFDL0IsTUFBQSxNQUFNLENBQUMsT0FBTyxtQ0FBSSxFQUFFLEVBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUN4QixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQ0YsU0FBK0MsRUFBRTtRQUVqRCxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ3RDLElBQUksT0FBTyxHQUFpQyxFQUFFLENBQUM7WUFFL0MsYUFBYTtZQUNiLE1BQU0sV0FBVyxHQUNiLDZDQUFxQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV4RCxNQUFNLFFBQVEs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