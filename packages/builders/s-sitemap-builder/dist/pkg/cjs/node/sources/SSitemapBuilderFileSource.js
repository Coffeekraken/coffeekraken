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
const SSitemapBuilderSource_js_1 = __importDefault(require("../SSitemapBuilderSource.js"));
class SSitemapBuilderFileSource extends SSitemapBuilderSource_js_1.default {
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
                let filePath = file.path, itemsCount = 0, buildedFile;
                if (filePath.match(/\.ts$/)) {
                    buildedFile = yield s_typescript_builder_1.default.buildTemporary(filePath);
                    filePath = buildedFile.path;
                }
                // @ts-ignore
                const fn = (yield import(filePath)).default;
                // remove the temp file
                buildedFile.remove();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLDhGQUFzRTtBQUN0RSx1REFBeUQ7QUFFekQsMkZBRXFDO0FBc0JyQyxNQUFxQix5QkFBMEIsU0FBUSxrQ0FBdUI7SUFhMUU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFzRDtRQUM5RCxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLLENBQ0QsU0FBK0MsRUFBRTtRQUVqRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsaUVBQWlFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDcEYsSUFBSSxDQUNQLGtCQUFrQixDQUN0QixDQUFDO1lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO1lBRTFCLE1BQU0sS0FBSyxHQUFHLGdCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUNsRCxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO2FBQzNCLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQ1AseUNBQXlDLEtBQUssQ0FBQyxNQUFNLG1CQUFtQixDQUMzRSxDQUFDO1lBQ0YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUNQLG1DQUFtQyxJQUFJLENBQUMsT0FBTyxTQUFTLENBQzNELENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksS0FBSyxHQUFpQyxFQUFFLENBQUM7WUFFN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzNDLGFBQWE7Z0JBQ2IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksRUFDcEIsVUFBVSxHQUFHLENBQUMsRUFDZCxXQUFXLENBQUM7Z0JBRWhCLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDekIsV0FBVyxHQUFHLE1BQU0sOEJBQW9CLENBQUMsY0FBYyxDQUNuRCxRQUFRLENBQ1gsQ0FBQztvQkFDRixRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztpQkFDL0I7Z0JBRUQsYUFBYTtnQkFDYixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUU1Qyx1QkFBdUI7Z0JBQ3ZCLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFckIsSUFBSSxPQUFPLEVBQUUsS0FBSyxVQUFVLEVBQUU7b0JBQzFCLE1BQU0sU0FBUyxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuQyxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFDOUIsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztpQkFDcEM7cUJBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUMxQixLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUMxQixVQUFVLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDMUI7cUJBQU07b0JBQ0gsTUFBTSxJQUFJLEtBQUs7b0JBQ1gsYUFBYTtvQkFDYiw0QkFBNEIsSUFBSSxDQUFDLE9BQU8sMktBQTJLLENBQ3ROLENBQUM7aUJBQ0w7Z0JBRUQsSUFBSSxDQUFDLElBQUksQ0FDTCxrQ0FBa0MsVUFBVSxvREFBb0QsSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUN6SCxDQUFDO2FBQ0w7WUFFRCxPQUFPLENBQUM7Z0JBQ0osS0FBSztnQkFDTCxJQUFJO2FBQ1AsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBOUdMLDRDQStHQztBQTlHRzs7Ozs7Ozs7O0dBU0c7QUFDSSxvQ0FBVSxHQUFHLG1CQUFtQixDQUFDIn0=