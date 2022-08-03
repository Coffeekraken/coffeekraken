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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fileHash_1 = __importDefault(require("@coffeekraken/sugar/node/fs/fileHash"));
const pad_1 = __importDefault(require("@coffeekraken/sugar/shared/number/pad"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
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
        super((0, deepMerge_1.default)({}, settings !== null && settings !== void 0 ? settings : {}));
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const docmapInstance = new s_docmap_1.default();
            const docmap = yield docmapInstance.read();
            const items = [];
            const date = new Date();
            const lastmod = `${date.getFullYear()}-${(0, pad_1.default)(date.getMonth(), 2)}-${(0, pad_1.default)(date.getDate(), 2)}`;
            // @ts-ignore
            for (let [slug, docmapObj] of Object.entries(docmap.menu.slug)) {
                // @ts-ignore
                if (!fs_1.default.existsSync(docmapObj.docmap.path)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_WARNING,
                        // @ts-ignore
                        value: `<yellow>[build]</yellow> Docmap referenced file "<cyan>${docmapObj.docmap.path}</cyan>" does not exist. Skipping it...`,
                    });
                }
                else {
                    // @ts-ignore
                    const hash = (0, fileHash_1.default)(docmapObj.docmap.path);
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
                    if (!fs_1.default.existsSync(docmapObj.docmap.path)) {
                        emit('log', {
                            type: s_log_1.default.TYPE_WARNING,
                            // @ts-ignore
                            value: `<yellow>[build]</yellow> Docmap referenced file "<cyan>${docmapObj.docmap.path}</cyan>" does not exist. Skipping it...`,
                        });
                    }
                    else {
                        // @ts-ignore
                        const hash = (0, fileHash_1.default)(docmapObj.docmap.path);
                        items.push({
                            loc: slug,
                            lastmod,
                            integrity: hash,
                        });
                    }
                }
            }
            resolve(items);
        }), {
            eventEmitter: {
                bind: this,
            },
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsb0ZBQThEO0FBQzlELGdGQUEwRDtBQUMxRCw0RkFBc0U7QUFDdEUsNENBQXNCO0FBR3RCLHFGQUErRDtBQWtCL0QsTUFBcUIsMkJBQTRCLFNBQVEsK0JBQXVCO0lBYTVFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0Q7UUFDaEUsS0FBSyxDQUFDLElBQUEsbUJBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUNELFNBQStDLEVBQUU7UUFFakQsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sY0FBYyxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sTUFBTSxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRTNDLE1BQU0sS0FBSyxHQUFpQyxFQUFFLENBQUM7WUFFL0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN4QixNQUFNLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFBLGFBQUssRUFDMUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLENBQUMsQ0FDSixJQUFJLElBQUEsYUFBSyxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRWhDLGFBQWE7WUFDYixLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ25CLEVBQUU7Z0JBQ0MsYUFBYTtnQkFDYixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN6QyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxlQUFNLENBQUMsWUFBWTt3QkFDekIsYUFBYTt3QkFDYixLQUFLLEVBQUUsMERBQTBELFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSx5Q0FBeUM7cUJBQ2xJLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDSCxhQUFhO29CQUNiLE1BQU0sSUFBSSxHQUFHLElBQUEsa0JBQVUsRUFBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNQLEdBQUcsRUFBRSxJQUFJO3dCQUNULE9BQU87d0JBQ1AsU0FBUyxFQUFFLElBQUk7cUJBQ2xCLENBQUMsQ0FBQztpQkFDTjthQUNKO1lBRUQsYUFBYTtZQUNiLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FDdkIsRUFBRTtnQkFDQyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU87Z0JBQ3hDLGFBQWE7Z0JBQ2IsVUFBVSxDQUFDLElBQUksQ0FDbEIsRUFBRTtvQkFDQyxhQUFhO29CQUNiLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3pDLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxZQUFZOzRCQUN6QixhQUFhOzRCQUNiLEtBQUssRUFBRSwwREFBMEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLHlDQUF5Qzt5QkFDbEksQ0FBQyxDQUFDO3FCQUNOO3lCQUFNO3dCQUNILGFBQWE7d0JBQ2IsTUFBTSxJQUFJLEdBQUcsSUFBQSxrQkFBVSxFQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUM7NEJBQ1AsR0FBRyxFQUFFLElBQUk7NEJBQ1QsT0FBTzs0QkFDUCxTQUFTLEVBQUUsSUFBSTt5QkFDbEIsQ0FBQyxDQUFDO3FCQUNOO2lCQUNKO2FBQ0o7WUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7O0FBakhMLDhDQWtIQztBQWpIRzs7Ozs7Ozs7O0dBU0c7QUFDSSxzQ0FBVSxHQUFHLHFCQUFxQixDQUFDIn0=