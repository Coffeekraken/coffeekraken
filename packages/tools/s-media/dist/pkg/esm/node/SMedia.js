// @ts-nocheck
import __SFrontspec from '@coffeekraken/s-frontspec';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SMedia from '../shared/SMedia';
/**
 * @name                SMedia
 * @namespace           node
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
export default class SMedia extends __SMedia {
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
        super(__deepMerge({}, settings));
        // init media
        if (media === 'frontspec') {
            this._media = __SFrontspec.get('media');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxRQUFRLE1BQU0sa0JBQWtCLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBQ3hDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBSyxHQUFHLFdBQVcsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMxQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRWpDLGFBQWE7UUFDYixJQUFJLEtBQUssS0FBSyxXQUFXLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN2QjthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRztnQkFDVixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsWUFBWSxFQUFFLFNBQVM7Z0JBQ3ZCLE1BQU0sRUFBRSxPQUFPO2dCQUNmLGFBQWEsRUFBRSxVQUFVO2dCQUN6QixPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFO3dCQUNKLFFBQVEsRUFBRSxDQUFDO3dCQUNYLFFBQVEsRUFBRSxHQUFHO3FCQUNoQjtvQkFDRCxNQUFNLEVBQUU7d0JBQ0osUUFBUSxFQUFFLEdBQUc7d0JBQ2IsUUFBUSxFQUFFLElBQUk7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSTt3QkFDZCxRQUFRLEVBQUUsSUFBSTtxQkFDakI7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFFBQVEsRUFBRSxJQUFJO3FCQUNqQjtpQkFDSjthQUNKLENBQUM7U0FDTDtRQUVELGFBQWE7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDSiJ9