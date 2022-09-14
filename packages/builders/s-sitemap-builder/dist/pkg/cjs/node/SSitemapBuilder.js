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
                    value: `<yellow>[save]</yellow> Saving your sitemap under "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), finalParams.output)}</cyan>"`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsMEVBQW1EO0FBQ25ELHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsK0NBQXNFO0FBQ3RFLCtDQUFtRDtBQUNuRCx1REFBeUQ7QUFDekQsbURBQTREO0FBQzVELGdEQUEwQjtBQUMxQiwwSEFBb0c7QUE4RHBHLE1BQXFCLGVBQWdCLFNBQVEsbUJBQVU7SUFDbkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE0Qzs7UUFDcEQsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBVyxFQUMvQixNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLEVBQUUsRUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQ3hCLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FDRixTQUErQyxFQUFFO1FBRWpELE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDdEMsSUFBSSxPQUFPLEdBQWlDLEVBQUUsQ0FBQztZQUUvQyxhQUFhO1lBQ2IsTUFBTSxXQUFXLEdBQ2IsNkNBQXFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhELE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1lBRW5DLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFDckMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNO2dCQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXpDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTlCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDWCxpQ0FBaUMsUUFBUSxnRUFBZ0UsTUFBTSxDQUFDLElBQUksQ0FDaEgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQ3hCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ2hCLENBQUM7aUJBQ0w7Z0JBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRWxELHdCQUF3QjtnQkFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO29CQUFFLFNBQVM7Z0JBRWhDLGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixNQUFNLGNBQWMsR0FBRyxDQUFDLHdEQUFhLFNBQVMsQ0FBQyxJQUFJLEdBQUMsQ0FBQztxQkFDaEQsT0FBTyxDQUFDO2dCQUViLElBQUksT0FBTyxDQUFDO2dCQUVaLElBQUksSUFBQSxjQUFTLEVBQUMsY0FBYyxDQUFDLEVBQUU7b0JBQzNCLHlCQUF5QjtvQkFDekIsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLG1CQUNsQyxJQUFBLG9CQUFXLEVBQ1YsTUFBQSxTQUFTLENBQUMsUUFBUSxtQ0FBSSxFQUFFLEVBQ3hCLE1BQUEsV0FBVyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsbUNBQUksRUFBRSxDQUM5QyxFQUNILENBQUM7b0JBQ0gsT0FBTyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUN2RDtxQkFBTSxJQUFJLE9BQU8sY0FBYyxLQUFLLFVBQVUsRUFBRTtvQkFDN0MsT0FBTyxHQUFHLGNBQWMsQ0FBQztpQkFDNUI7Z0JBRUQsTUFBTSxjQUFjLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7Z0JBQ3pDLFFBQVE7Z0JBQ1IsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2hELElBQUksa0JBQWtCLFlBQVksbUJBQVUsRUFBRTtvQkFDMUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQzVCO2dCQUNELE1BQU0sV0FBVyxHQUFHLE1BQU0sa0JBQWtCLENBQUM7Z0JBQzdDLE9BQU8sR0FBRyxDQUFDLEdBQUcsT0FBTyxFQUFFLEdBQUcsQ0FBQyxXQUFXLGFBQVgsV0FBVyxjQUFYLFdBQVcsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSxzQ0FBc0MsUUFBUSw2Q0FDakQsV0FBVyxDQUFDLE1BQ2hCLDZEQUNJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFDekIsV0FBVztpQkFDZCxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsNERBQTRELGNBQU0sQ0FBQyxRQUFRLENBQzlFLElBQUEsdUJBQWdCLEdBQUUsRUFDbEIsV0FBVyxDQUFDLE1BQU0sQ0FDckIsVUFBVTtpQkFDZCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFDO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsbUZBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixXQUFXO2FBQ2QsQ0FBQyxDQUFDO1lBRUgsb0JBQW9CO1lBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUEsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILElBQUksQ0FBQyxLQUFtQyxFQUFFLElBQVk7UUFDbEQsUUFBUSxJQUFBLGdCQUFXLEVBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsS0FBSyxLQUFLLENBQUM7WUFDWDtnQkFDSSxJQUFJLE1BQU0sR0FBYTtvQkFDbkIsd0NBQXdDO29CQUN4Qyw4REFBOEQ7b0JBQzlELFVBQVU7b0JBQ1YscUJBQXFCO29CQUNyQixXQUFXO2lCQUNkLENBQUM7Z0JBQ0YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNuQixNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7b0JBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3FCQUM3QztvQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsYUFBYTtnQkFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUV6QixjQUFjO2dCQUNkLElBQUEsb0JBQWUsRUFBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUV6QyxNQUFNO1NBQ2I7SUFDTCxDQUFDO0NBQ0o7QUF0TEQsa0NBc0xDIn0=