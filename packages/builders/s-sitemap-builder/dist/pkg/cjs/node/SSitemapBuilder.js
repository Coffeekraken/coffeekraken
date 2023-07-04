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
            var _a, _b, _c, _d;
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
                const importedSource = (yield import(sourceObj.path)).default;
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
                const buildResultItems = (_c = buildResult.items) !== null && _c !== void 0 ? _c : buildResult, buildResultLogs = (_d = buildResult.logs) !== null && _d !== void 0 ? _d : [];
                sitemap = [...sitemap, ...(buildResultItems !== null && buildResultItems !== void 0 ? buildResultItems : [])];
                console.log(`<yellow>[build]</yellow> "<magenta>${sourceId}</magenta>" sitemap builded with <magenta>${buildResult.length}</magenta> item(s) <green>successfully</green> in <yellow>${sourceDuration.end().formatedDuration}</yellow>`);
                buildResultLogs.forEach((log) => {
                    console.log(`- ${log}`);
                });
                console.log(' ');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELDBFQUFtRDtBQUNuRCxrRkFBMEQ7QUFDMUQsK0NBQXNFO0FBQ3RFLCtDQUFtRDtBQUNuRCx1REFBeUQ7QUFDekQsbURBQTREO0FBQzVELGdEQUEwQjtBQUMxQiwwSEFBb0c7QUFvRXBHLE1BQXFCLGVBQWdCLFNBQVEsbUJBQVU7SUFDbkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE0Qzs7UUFDcEQsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBVyxFQUMvQixNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLEVBQUUsRUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQ3hCLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FDRixTQUErQyxFQUFFO1FBRWpELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7WUFDakMsSUFBSSxPQUFPLEdBQWlDLEVBQUUsQ0FBQztZQUUvQyxhQUFhO1lBQ2IsTUFBTSxXQUFXLEdBQ2IsNkNBQXFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhELE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1lBRW5DLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFDckMsQ0FBQyxDQUFDLFdB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