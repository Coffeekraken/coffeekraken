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
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const fs_1 = require("@coffeekraken/sugar/fs");
const number_1 = require("@coffeekraken/sugar/number");
const object_1 = require("@coffeekraken/sugar/object");
const fs_2 = __importDefault(require("fs"));
const SSitemapBuilderSource_1 = __importDefault(require("../SSitemapBuilderSource"));
class SSitemapBuilderDocmapSource extends SSitemapBuilderSource_1.default {
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
            var _a;
            const docmapInstance = new s_docmap_1.default();
            const docmap = yield docmapInstance.read();
            const items = [];
            const logs = [];
            const date = new Date();
            const lastmod = `${date.getFullYear()}-${(0, number_1.__pad)(date.getMonth(), 2)}-${(0, number_1.__pad)(date.getDate(), 2)}`;
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[docmap]</yellow> Start generating sitemap from the project "<cyan>docmap.json</cyan>"`);
            // @ts-ignore
            for (let [slug, docmapObj] of Object.entries(docmap.menu.slug)) {
                // @ts-ignore
                if (!fs_2.default.existsSync(docmapObj.docmap.path)) {
                    console.warn(`<yellow>[build]</yellow> Docmap referenced file "<cyan>${docmapObj.docmap.path}</cyan>" does not exist. Skipping it...`);
                }
                else {
                    // @ts-ignore
                    const hash = (0, fs_1.__fileHash)(docmapObj.docmap.path);
                    items.push({
                        loc: slug,
                        lastmod,
                        integrity: hash,
                    });
                }
            }
            // @ts-ignore
            for (let [packageName, packageObj] of Object.entries(docmap.menu.packages)) {
                for (let [slug, docmapObj] of Object.entries(
                // @ts-ignore
                packageObj.slug)) {
                    // @ts-ignore
                    if (!fs_2.default.existsSync(docmapObj.docmap.path)) {
                        console.warn(`<yellow>[build]</yellow> Docmap referenced file "<cyan>${docmapObj.docmap.path}</cyan>" does not exist. Skipping it...`);
                    }
                    else {
                        // @ts-ignore
                        const hash = (0, fs_1.__fileHash)(docmapObj.docmap.path);
                        items.push({
                            loc: slug,
                            lastmod,
                            integrity: hash,
                        });
                    }
                }
            }
            logs.push(`<green>[docmap]</green> <magenta>${items.length}</magenta> sitemap entrie(s) gathered from the "<cyan>docmap.json</cyan>" file`);
            resolve({
                items,
                logs,
            });
        }));
    }
}
exports.default = SSitemapBuilderDocmapSource;
/**
 * @name            settingsId
 * @type            String
 * @static
 *
 * Store the source settings id
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SSitemapBuilderDocmapSource.settingsId = 'sitemapDocmapSource';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLCtDQUFvRDtBQUNwRCx1REFBbUQ7QUFDbkQsdURBQXlEO0FBQ3pELDRDQUFzQjtBQUd0QixxRkFFa0M7QUFrQmxDLE1BQXFCLDJCQUE0QixTQUFRLCtCQUF1QjtJQWE1RTs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXdEO1FBQ2hFLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEtBQUssQ0FDRCxTQUErQyxFQUFFO1FBRWpELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1lBQ3pDLE1BQU0sY0FBYyxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sTUFBTSxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRTNDLE1BQU0sS0FBSyxHQUFpQyxFQUFFLENBQUM7WUFFL0MsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO1lBRTFCLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDeEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksSUFBQSxjQUFLLEVBQzFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDZixDQUFDLENBQ0osSUFBSSxJQUFBLGNBQUssRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVoQyxNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLGdHQUFnRyxDQUNuRyxDQUFDO1lBRUYsYUFBYTtZQUNiLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVELGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDekMsT0FBTyxDQUFDLElBQUksQ0FDUiwwREFBMEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLHlDQUF5QyxDQUMzSCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILGFBQWE7b0JBQ2IsTUFBTSxJQUFJLEdBQUcsSUFBQSxlQUFVLEVBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDUCxHQUFHLEVBQUUsSUFBSTt3QkFDVCxPQUFPO3dCQUNQLFNBQVMsRUFBRSxJQUFJO3FCQUNsQixDQUFDLENBQUM7aUJBQ047YUFDSjtZQUVELGFBQWE7WUFDYixLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQ3ZCLEVBQUU7Z0JBQ0MsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPO2dCQUN4QyxhQUFhO2dCQUNiLFVBQVUsQ0FBQyxJQUFJLENBQ2xCLEVBQUU7b0JBQ0MsYUFBYTtvQkFDYixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN6QyxPQUFPLENBQUMsSUFBSSxDQUNSLDBEQUEwRCxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUkseUNBQXlDLENBQzNILENBQUM7cUJBQ0w7eUJBQU07d0JBQ0gsYUFBYTt3QkFDYixNQUFNLElBQUksR0FBRyxJQUFBLGVBQVUsRUFBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUNQLEdBQUcsRUFBRSxJQUFJOzRCQUNULE9BQU87NEJBQ1AsU0FBUyxFQUFFLElBQUk7eUJBQ2xCLENBQUMsQ0FBQztxQkFDTjtpQkFDSjthQUNKO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FDTCxvQ0FBb0MsS0FBSyxDQUFDLE1BQU0sZ0ZBQWdGLENBQ25JLENBQUM7WUFFRixPQUFPLENBQUM7Z0JBQ0osS0FBSztnQkFDTCxJQUFJO2FBQ1AsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBakhMLDhDQWtIQztBQWpIRzs7Ozs7Ozs7O0dBU0c7QUFDSSxzQ0FBVSxHQUFHLHFCQUFxQixDQUFDIn0=