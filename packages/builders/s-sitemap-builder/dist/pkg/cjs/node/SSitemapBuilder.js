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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const path_2 = __importDefault(require("path"));
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
        super((0, object_1.__deepMerge)({
            sources: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        const config = s_sugar_config_1.default.get('sitemapBuilder');
        this.settings.sources = (0, object_1.__deepMerge)((_a = config.sources) !== null && _a !== void 0 ? _a : {}, this.settings.sources);
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
     * @return      {Promise<ISSitemapBuilderBuildResult>}                    A promise resolved with the sitemap result when success
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(params = {}) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
                const importedSource = (yield Promise.resolve().then(() => __importStar(require(sourceObj.path)))).default;
                let buildFn;
                if ((0, is_1.__isClass)(importedSource)) {
                    // instanciate new source
                    const sourceInstance = new importedSource(Object.assign({}, (0, object_1.__deepMerge)((_a = sourceObj.settings) !== null && _a !== void 0 ? _a : {}, (_b = finalParams.sourcesSettings[sourceId]) !== null && _b !== void 0 ? _b : {})));
                    buildFn = sourceInstance.build.bind(sourceInstance);
                }
                else if (typeof importedSource === 'function') {
                    buildFn = importedSource;
                }
                const sourceDuration = new s_duration_1.default();
                // build
                const buildResultPromise = buildFn(finalParams);
                const buildResult = yield buildResultPromise;
                sitemap = [...sitemap, ...(buildResult !== null && buildResult !== void 0 ? buildResult : [])];
                console.log(`<yellow>[build]</yellow> "<magenta>${sourceId}</magenta>" sitemap builded with <magenta>${buildResult.length}</magenta> item(s) <green>successfully</green> in <yellow>${sourceDuration.end().formatedDuration}</yellow>`);
            }
            if (finalParams.save) {
                console.log(`<yellow>[save]</yellow> Saving your sitemap under "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), finalParams.output)}</cyan>"`);
                this.save(sitemap, finalParams.output);
            }
            console.log(`<yellow>[build]</yellow> Sitemap builded <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`);
            // resolve the build
            resolve(sitemap);
        }));
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
        switch ((0, fs_1.__extension)(path)) {
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
                (0, fs_1.__writeFileSync)(path, xmlStr.join('\n'));
                break;
        }
    }
}
exports.default = SSitemapBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsMEVBQW1EO0FBQ25ELGtGQUEwRDtBQUMxRCwrQ0FBc0U7QUFDdEUsK0NBQW1EO0FBQ25ELHVEQUF5RDtBQUN6RCxtREFBNEQ7QUFDNUQsZ0RBQTBCO0FBQzFCLDBIQUFvRztBQThEcEcsTUFBcUIsZUFBZ0IsU0FBUSxtQkFBVTtJQUNuRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTRDOztRQUNwRCxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksT0FBTyxFQUFFLEVBQUU7U0FDZCxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFBLG9CQUFXLEVBQy9CLE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQUksRUFBRSxFQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDeEIsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUNGLFNBQStDLEVBQUU7UUFFakQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztZQUNqQyxJQUFJLE9BQU8sR0FBaUMsRUFBRSxDQUFDO1lBRS9DLGFBQWE7WUFDYixNQUFNLFdBQVcsR0FDYiw2Q0FBcUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7WUFFbkMsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxN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