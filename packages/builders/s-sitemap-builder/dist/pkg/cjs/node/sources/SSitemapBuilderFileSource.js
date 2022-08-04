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
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
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
            const files = s_glob_1.default.resolve(this.settings.glob, {
                cwd: this.settings.inDir,
            });
            let items = [];
            for (let [key, file] of Object.entries(files)) {
                // @ts-ignore
                const fn = (yield Promise.resolve().then(() => __importStar(require(file.path)))).default;
                if (typeof fn === 'function') {
                    const fileItems = yield fn(params);
                    items = [...items, ...fileItems];
                }
                else if (Array.isArray(fn)) {
                    items = [...items, ...fn];
                }
                else {
                    throw new Error(
                    // @ts-ignore
                    `Your sitemap file "<cyan>${file.relPath}</cyan>" MUST return either a function that returns an <yellow>ISSitemapBuilderResultItem</yellow> array, or just an <yellow>ISSitemapBuilderResultItem</yellow> array...`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBMkM7QUFDM0Msd0VBQWlEO0FBQ2pELDRGQUFzRTtBQUd0RSxxRkFBK0Q7QUFxQi9ELE1BQXFCLHlCQUEwQixTQUFRLCtCQUF1QjtJQWExRTs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXNEO1FBQzlELEtBQUssQ0FBQyxJQUFBLG1CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEtBQUssQ0FDRCxTQUErQyxFQUFFO1FBRWpELE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0QyxNQUFNLEtBQUssR0FBRyxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDOUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSzthQUMzQixDQUFDLENBQUM7WUFFSCxJQUFJLEtBQUssR0FBaUMsRUFBRSxDQUFDO1lBRTdDLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQyxhQUFhO2dCQUNiLE1BQU0sRUFBRSxHQUFHLENBQUMsd0RBQWEsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUM3QyxJQUFJLE9BQU8sRUFBRSxLQUFLLFVBQVUsRUFBRTtvQkFDMUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ25DLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUM7aUJBQ3BDO3FCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDMUIsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDN0I7cUJBQU07b0JBQ0gsTUFBTSxJQUFJLEtBQUs7b0JBQ1gsYUFBYTtvQkFDYiw0QkFBNEIsSUFBSSxDQUFDLE9BQU8sMktBQTJLLENBQ3ROLENBQUM7aUJBQ0w7YUFDSjtZQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUEsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQzs7QUEzRUwsNENBNEVDO0FBM0VHOzs7Ozs7Ozs7R0FTRztBQUNJLG9DQUFVLEdBQUcsbUJBQW1CLENBQUMifQ==