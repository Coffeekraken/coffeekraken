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
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_typescript_builder_1 = __importDefault(require("@coffeekraken/s-typescript-builder"));
const object_1 = require("@coffeekraken/sugar/object");
const SSitemapBuilderSource_1 = __importDefault(require("../SSitemapBuilderSource"));
class SSitemapBuilderFileSource extends SSitemapBuilderSource_1.default {
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
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name            build
     * @type            Function
     * @async
     *
     * This method allows you to build the sitemap from the docmap source.
     *
     * @param           {ISSitemapBuilderBuildParams}          [params={}]         Some params passed to the build method
     * @return          {Promise<ISSitemapSourceBuildResult>}               A promise resolved when the sitemap has been successfully generated
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params = {}) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            console.log(`<yellow>[file]</yellow> Search for sitemap files using "<cyan>${this.settings.glob.join(', ')}</cyan>" glob...`);
            const logs = [];
            const files = s_glob_1.default.resolveSync(this.settings.glob, {
                cwd: this.settings.inDir,
            });
            console.log(`<yellow>[file]</yellow> Found <yellow>${files.length}</yellow> file(s)`);
            files.forEach((file) => {
                console.log(`<yellow>[file]</yellow> - <cyan>${file.relPath}</cyan>`);
            });
            let items = [];
            for (let [key, file] of Object.entries(files)) {
                // @ts-ignore
                let filePath = file.path, itemsCount = 0;
                if (filePath.match(/\.ts$/)) {
                    const buildedFile = yield s_typescript_builder_1.default.buildTemporary(filePath);
                    filePath = buildedFile.path;
                    setTimeout(() => {
                        buildedFile.remove();
                    }, 500);
                }
                // @ts-ignore
                const fn = (yield import(filePath)).default;
                if (typeof fn === 'function') {
                    const fileItems = yield fn(params);
                    itemsCount = fileItems.length;
                    items = [...items, ...fileItems];
                }
                else if (Array.isArray(fn)) {
                    items = [...items, ...fn];
                    itemsCount = fn.length;
                }
                else {
                    throw new Error(
                    // @ts-ignore
                    `Your sitemap file "<cyan>${file.relPath}</cyan>" MUST return either a function that returns an <yellow>ISSitemapBuilderResultItem</yellow> array, or just an <yellow>ISSitemapBuilderResultItem</yellow> array...`);
                }
                logs.push(`<green>[file]</green> <magenta>${itemsCount}</magenta> sitemap entrie(s) for the file "<cyan>${file.relPath}</cyan>"`);
            }
            resolve({
                items,
                logs,
            });
        }));
    }
}
exports.default = SSitemapBuilderFileSource;
/**
 * @name            id
 * @type            String
 * @static
 *
 * Store the source settings id
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SSitemapBuilderFileSource.settingsId = 'sitemapFileSource';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLDhGQUFzRTtBQUN0RSx1REFBeUQ7QUFHekQscUZBRWtDO0FBcUJsQyxNQUFxQix5QkFBMEIsU0FBUSwrQkFBdUI7SUFhMUU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFzRDtRQUM5RCxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLLENBQ0QsU0FBK0MsRUFBRTtRQUVqRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsaUVBQWlFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDcEYsSUFBSSxDQUNQLGtCQUFrQixDQUN0QixDQUFDO1lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO1lBRTFCLE1BQU0sS0FBSyxHQUFHLGdCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUNsRCxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO2FBQzNCLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQ1AseUNBQXlDLEtBQUssQ0FBQyxNQUFNLG1CQUFtQixDQUMzRSxDQUFDO1lBQ0YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUNQLG1DQUFtQyxJQUFJLENBQUMsT0FBTyxTQUFTLENBQzNELENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksS0FBSyxHQUFpQyxFQUFFLENBQUM7WUFFN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzNDLGFBQWE7Z0JBQ2IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksRUFDcEIsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFFbkIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN6QixNQUFNLFdBQVcsR0FDYixNQUFNLDhCQUFvQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDeEQsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQzVCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ1osV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN6QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQ1g7Z0JBRUQsYUFBYTtnQkFDYixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUM1QyxJQUFJLE9BQU8sRUFBRSxLQUFLLFVBQVUsRUFBRTtvQkFDMUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ25DLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO29CQUM5QixLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDO2lCQUNwQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQzFCLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzFCLFVBQVUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO2lCQUMxQjtxQkFBTTtvQkFDSCxNQUFNLElBQUksS0FBSztvQkFDWCxhQUFhO29CQUNiLDRCQUE0QixJQUFJLENBQUMsT0FBTywyS0FBMkssQ0FDdE4sQ0FBQztpQkFDTDtnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUNMLGtDQUFrQyxVQUFVLG9EQUFvRCxJQUFJLENBQUMsT0FBTyxVQUFVLENBQ3pILENBQUM7YUFDTDtZQUVELE9BQU8sQ0FBQztnQkFDSixLQUFLO2dCQUNMLElBQUk7YUFDUCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUEzR0wsNENBNEdDO0FBM0dHOzs7Ozs7Ozs7R0FTRztBQUNJLG9DQUFVLEdBQUcsbUJBQW1CLENBQUMifQ==