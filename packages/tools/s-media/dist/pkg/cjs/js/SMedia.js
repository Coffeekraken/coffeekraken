"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const object_1 = require("@coffeekraken/sugar/object");
const SMedia_1 = __importDefault(require("../shared/SMedia"));
/**
 * @name                SMedia
 * @namespace           js
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status             beta
 *
 * A simple class to handle the media (queries) like methods like buildQuery, layoutCss, etc... All of this on top of the @specimen/types ISMedia type and the @coffeekraken/s-frontspec package
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
class SMedia extends SMedia_1.default {
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
        if (media === 'frontspec') {
            this._media = s_frontspec_1.default.get('media');
        }
        else if (media) {
            this._media = media;
        }
        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCx1REFBeUQ7QUFDekQsOERBQXdDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBcUIsTUFBTyxTQUFRLGdCQUFRO0lBQ3hDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBSyxHQUFHLFdBQVcsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMxQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRWpDLElBQUksS0FBSyxLQUFLLFdBQVcsRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN2QjthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRztnQkFDVixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsWUFBWSxFQUFFLFNBQVM7Z0JBQ3ZCLE1BQU0sRUFBRSxPQUFPO2dCQUNmLGFBQWEsRUFBRSxVQUFVO2dCQUN6QixPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFO3dCQUNKLFFBQVEsRUFBRSxDQUFDO3dCQUNYLFFBQVEsRUFBRSxHQUFHO3FCQUNoQjtvQkFDRCxNQUFNLEVBQUU7d0JBQ0osUUFBUSxFQUFFLEdBQUc7d0JBQ2IsUUFBUSxFQUFFLElBQUk7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSTt3QkFDZCxRQUFRLEVBQUUsSUFBSTtxQkFDakI7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFFBQVEsRUFBRSxJQUFJO3FCQUNqQjtpQkFDSjthQUNKLENBQUM7U0FDTDtRQUVELGFBQWE7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDSjtBQWhERCx5QkFnREMifQ==