"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const object_1 = require("@coffeekraken/sugar/object");
const SMedia_js_1 = __importDefault(require("../shared/SMedia.js"));
/**
 * @name                SMedia
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status             beta
 *
 * A simple class to handle the media (queries) like methods like buildQuery, layoutCss, etc... All of this on top of the @specim3n/types ISMedia type and the @coffeekraken/s-frontspec package
 *
 * @param       {String|Object}             [media='frontspec']                      Either an ISMedia object, or 'frontspec' if you want them to be loaded from your frontspec.json file
 * @param       {Object|Array}              [settings=[]]              Some settings to configure your SMedia instance
 *
 * @example         php
 * const media = new SMedia();
 * const query = media.buildQuery('desktop');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMedia extends SMedia_js_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(media = 'frontspec', settings = {}) {
        super((0, object_1.__deepMerge)({}, settings));
        // init media
        if (media === 'frontspec') {
            this._media = s_frontspec_1.default.get('media');
        }
        else if (media) {
            this._media = media;
        }
        if (!this._media) {
            this._media = {
                defaultAction: '<=',
                defaultMedia: 'desktop',
                method: 'media',
                containerName: 'viewport',
                queries: {
                    mobile: {
                        minWidth: 0,
                        maxWidth: 639,
                    },
                    tablet: {
                        minWidth: 640,
                        maxWidth: 1279,
                    },
                    desktop: {
                        minWidth: 1280,
                        maxWidth: 2047,
                    },
                    wide: {
                        minWidth: 2048,
                        maxWidth: null,
                    },
                },
            };
        }
        // sort media
        this._media = this.sortQueries(this._media);
    }
}
exports.default = SMedia;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCx1REFBeUQ7QUFDekQsb0VBQTJDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBcUIsTUFBTyxTQUFRLG1CQUFRO0lBQ3hDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBSyxHQUFHLFdBQVcsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMxQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRWpDLGFBQWE7UUFDYixJQUFJLEtBQUssS0FBSyxXQUFXLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzQzthQUFNLElBQUksS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUc7Z0JBQ1YsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFlBQVksRUFBRSxTQUFTO2dCQUN2QixNQUFNLEVBQUUsT0FBTztnQkFDZixhQUFhLEVBQUUsVUFBVTtnQkFDekIsT0FBTyxFQUFFO29CQUNMLE1BQU0sRUFBRTt3QkFDSixRQUFRLEVBQUUsQ0FBQzt3QkFDWCxRQUFRLEVBQUUsR0FBRztxQkFDaEI7b0JBQ0QsTUFBTSxFQUFFO3dCQUNKLFFBQVEsRUFBRSxHQUFHO3dCQUNiLFFBQVEsRUFBRSxJQUFJO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUk7d0JBQ2QsUUFBUSxFQUFFLElBQUk7cUJBQ2pCO29CQUNELElBQUksRUFBRTt3QkFDRixRQUFRLEVBQUUsSUFBSTt3QkFDZCxRQUFRLEVBQUUsSUFBSTtxQkFDakI7aUJBQ0o7YUFDSixDQUFDO1NBQ0w7UUFFRCxhQUFhO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0o7QUFuREQseUJBbURDIn0=